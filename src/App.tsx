import { useState, useCallback, useEffect } from 'react';
import { classifier } from './lib/classifier';
import { HomePage } from './pages/HomePage';
import { SetupPage } from './pages/SetupPage';
import { CollectPage } from './pages/CollectPage';
import { TrainingPage } from './pages/TrainingPage';
import { ChallengePage } from './pages/ChallengePage';
import { MistakePage } from './pages/MistakePage';
import { RestorePage } from './pages/RestorePage';
import { ReportPage } from './pages/ReportPage';
import { generateSessionId } from './lib/db';

type Page =
  | 'home'
  | 'setup'
  | 'collect'
  | 'training'
  | 'challenge'
  | 'mistake'
  | 'restore'
  | 'report';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [sessionId, setSessionId] = useState('');
  const [sampleCounts, setSampleCounts] = useState<Record<string, number>>({
    long_leaf: 0,
    round_leaf: 0,
    tooth_leaf: 0,
    big_leaf: 0,
  });
  const [lastPrediction, setLastPrediction] = useState<{ predictedLabel: string; confidence: number } | null>(null);

  // Load model on mount (lazy, doesn't block homepage)
  useEffect(() => {
    classifier.loadModel();
  }, []);

  // Start new session
  const handleStart = useCallback(() => {
    const sid = generateSessionId();
    setSessionId(sid);
    setPage('setup');
  }, []);

  // Restore session
  const handleRestore = useCallback(async (sid: string) => {
    setSessionId(sid);
    setPage('restore');
  }, []);

  // After restore
  const handleRestored = useCallback(async (counts: Record<string, number>) => {
    setSampleCounts(counts);
    setPage('collect');
  }, []);

  // Clear and restart
  const handleClearAndRestart = useCallback(() => {
    setSessionId('');
    setSampleCounts({ long_leaf: 0, round_leaf: 0, tooth_leaf: 0, big_leaf: 0 });
    setPage('home');
  }, []);

  // Navigate
  const goToSetup = useCallback(() => setPage('setup'), []);
  const goToCollect = useCallback(() => setPage('collect'), []);
  const goToTraining = useCallback(() => setPage('training'), []);
  const goToChallenge = useCallback(() => setPage('challenge'), []);
  const goToReport = useCallback(() => setPage('report'), []);

  // After challenge correct
  const handleCorrect = useCallback(() => {}, []);

  // After challenge mistake
  const handleMistake = useCallback((prediction: { predictedLabel: string; confidence: number }) => {
    setLastPrediction(prediction);
    setPage('mistake');
  }, []);

  // After mistake page retry
  const handleMistakeRetry = useCallback(() => {
    setPage('challenge');
  }, []);

  // After mistake page add samples
  const handleMistakeAddSamples = useCallback(() => {
    setPage('collect');
  }, []);

  switch (page) {
    case 'home':
      return (
        <HomePage
          onStartTraining={handleStart}
          onRestoreTraining={handleRestore}
        />
      );

    case 'setup':
      return (
        <SetupPage
          sampleCounts={sampleCounts}
          onContinue={goToCollect}
          onBack={() => setPage('home')}
        />
      );

    case 'collect':
      return (
        <CollectPage
          sessionId={sessionId}
          sampleCounts={sampleCounts}
          onCountsChange={setSampleCounts}
          onToTraining={goToTraining}
          onToChallenge={goToChallenge}
          onBack={goToSetup}
        />
      );

    case 'training':
      return (
        <TrainingPage
          sampleCounts={sampleCounts}
          onComplete={goToChallenge}
        />
      );

    case 'challenge':
      return (
        <ChallengePage
          sessionId={sessionId}
          onMistake={handleMistake}
          onCorrect={handleCorrect}
          onBack={goToCollect}
          onReport={goToReport}
        />
      );

    case 'mistake':
      return lastPrediction ? (
        <MistakePage
          sessionId={sessionId}
          prediction={lastPrediction}
          onRetry={handleMistakeRetry}
          onAddSamples={handleMistakeAddSamples}
        />
      ) : null;

    case 'restore':
      return (
        <RestorePage
          sessionId={sessionId}
          onRestored={handleRestored}
          onClearAndStart={handleClearAndRestart}
        />
      );

    case 'report':
      return (
        <ReportPage
          sessionId={sessionId}
          onClearAndRestart={handleClearAndRestart}
          onBack={goToChallenge}
        />
      );

    default:
      return null;
  }
}

export default App;
