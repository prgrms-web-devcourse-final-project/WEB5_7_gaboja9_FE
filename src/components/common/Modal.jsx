import classNames from 'classnames';
import { useAtom } from 'jotai';

import { modalStateAtom } from '@/store/atoms';

const Modal = () => {
  const [modalState, setModalState] = useAtom(modalStateAtom);

  const handleClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{modalState.message}</p>
        <div className="modal-actions">
          {modalState.type === 'confirm' && (
            <button className="btn-cancel" onClick={modalState.onCancel}>
              취소
            </button>
          )}
          <button
            className={classNames('btn-confirm', {
              'full-width': modalState.type === 'alert',
            })}
            onClick={modalState.onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
