import { useSetAtom } from 'jotai';

import { modalStateAtom } from '@/store/atoms';

const useModal = () => {
  const setModalState = useSetAtom(modalStateAtom);

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const openAlert = (message, onConfirm) => {
    setModalState({
      isOpen: true,
      type: 'alert',
      message,
      onConfirm: () => {
        closeModal();
        if (onConfirm) {
          setTimeout(onConfirm, 0);
        }
      },
      onCancel: null,
    });
  };

  const openConfirm = (message, onConfirm, onCancel) => {
    setModalState({
      isOpen: true,
      type: 'confirm',
      message,
      onConfirm: () => {
        closeModal();
        if (onConfirm) {
          setTimeout(onConfirm, 0);
        }
      },
      onCancel: () => {
        closeModal();
        if (onCancel) {
          setTimeout(onCancel, 0);
        }
      },
    });
  };

  const openPrompt = (message, onConfirm, onCancel) => {
    setModalState({
      isOpen: true,
      type: 'prompt',
      message,
      onConfirm: (inputValue) => {
        closeModal();
        if (onConfirm) {
          setTimeout(() => onConfirm(inputValue), 0);
        }
      },
      onCancel: () => {
        closeModal();
        if (onCancel) {
          setTimeout(onCancel, 0);
        }
      },
    });
  };

  return { openAlert, openConfirm, openPrompt };
};

export default useModal;
