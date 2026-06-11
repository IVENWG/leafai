import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    try {
      setError(null);

      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }

      console.log('[useCamera] Requesting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });
      streamRef.current = stream;
      console.log('[useCamera] Stream obtained, tracks:', stream.getTracks().map(t => `${t.kind}:${t.readyState}`).join(', '));

      const video = videoRef.current;
      if (!video) {
        console.error('[useCamera] videoRef.current is NULL — <video> not mounted');
        setError('视频元素未就绪，请刷新页面重试');
        return;
      }

      video.srcObject = stream;
      console.log('[useCamera] srcObject set, calling play()...');

      // Race play() against a timeout so we don't hang forever
      await Promise.race([
        video.play(),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error('播放超时，请检查浏览器是否允许自动播放')), 8000)
        ),
      ]);

      console.log('[useCamera] play() resolved, marking ready');
      setIsReady(true);
    } catch (err: any) {
      console.error('[useCamera] start() failed:', err);
      setError(`摄像头启动失败: ${err?.name || ''} ${err?.message || '未知错误'}`);
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsReady(false);
  }, []);

  // Safari auto-pauses muted videos that scroll out of viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && video.srcObject && video.paused) {
        video.play().catch(() => {});
      }
    }, { threshold: 0.1 });

    observer.observe(video);
    return () => observer.disconnect();
  }, [isReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return { videoRef, isReady, error, start, stop };
}
