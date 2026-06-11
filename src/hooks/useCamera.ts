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

      // If a stream exists but its tracks are dead (e.g. strict mode remount),
      // clear it so we get a fresh one
      if (streamRef.current) {
        const live = streamRef.current.getTracks().filter(t => t.readyState === 'live');
        if (live.length === 0) {
          streamRef.current = null;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video metadata so the browser knows dimensions
        await new Promise<void>((resolve) => {
          const v = videoRef.current!;
          if (v.readyState >= 1) {
            resolve();
            return;
          }
          v.addEventListener('loadedmetadata', () => resolve(), { once: true });
        });

        await videoRef.current.play();
        setIsReady(true);
      }
    } catch (err: any) {
      setError(err?.message || '无法访问摄像头，请确保使用 HTTPS 并允许摄像头权限。');
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsReady(false);
  }, []);

  // When the video element mounts after the stream is already obtained
  // (e.g. flushSync renders <video>, but start() hasn't attached yet),
  // attach the pending stream automatically.
  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (video && stream && !video.srcObject) {
      video.srcObject = stream;
      video.play()
        .then(() => setIsReady(true))
        .catch(() => {});
    }
  });

  // Safari auto-pauses muted videos that scroll out of viewport;
  // resume playback when they scroll back in.
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

  // Cleanup on unmount: release camera and clear refs
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
