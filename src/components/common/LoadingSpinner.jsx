import { useAtomValue } from 'jotai';

import { loadingAtom } from '@/store/atoms';

const LoadingSpinner = () => {
  const isLoading = useAtomValue(loadingAtom);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
