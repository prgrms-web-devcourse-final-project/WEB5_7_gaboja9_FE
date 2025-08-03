import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';

import { modalStateAtom } from '@/store/atoms';

const Modal = () => {
  const [modalState, setModalState] = useAtom(modalStateAtom);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (modalState.isOpen) {
      setInputValue('');
    }
  }, [modalState.isOpen]);

  const handleClose = () => {
    if (modalState.onCancel) {
      modalState.onCancel();
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modalState.type === 'prompt') {
      modalState.onConfirm(inputValue);
    } else {
      modalState.onConfirm();
    }
  };

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{modalState.message}</p>
        {modalState.type === 'prompt' && (
          <div className="modal-input-wrapper">
            <input
              className="modal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="금액을 입력하세요"
              autoFocus
            />
          </div>
        )}
        <div className="modal-actions">
          {modalState.type !== 'alert' && (
            <button className="btn-cancel" onClick={handleClose}>
              취소
            </button>
          )}
          <button
            className={classNames('btn-confirm', {
              'full-width': modalState.type === 'alert',
            })}
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
