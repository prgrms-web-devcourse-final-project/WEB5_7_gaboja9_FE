import { useSetAtom } from 'jotai';

import { modalStateAtom } from '@/store/atoms';

const useModal = () => {
  const setModalState = useSetAtom(modalStateAtom);

  const openAlert = (message, onConfirm) => {
    setModalState({
      isOpen: true,
      type: 'alert',
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setModalState((prev) => ({ ...prev, isOpen: false }));
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
        if (onConfirm) onConfirm();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return { openAlert, openConfirm };
};

export default useModal;
