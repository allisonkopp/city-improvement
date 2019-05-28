import React from 'react';
import { Portal } from 'react-portal';

const Modal = ({ isOpen, content, toggleModal, iconClass, iconContent, buttonContent }) =>
  isOpen && (
    <Portal>
      <aside className="c-modal-cover fadeIn">
        <div className="c-modal slideIn">
          <div className="modalWrapper">
            <div className="modalHeader">
              <i className={iconClass}>{iconContent}</i>
            </div>
            <div className="c-modal_body">{content}</div>
            <button className="btn btn-info" onClick={toggleModal}>
              {buttonContent}
            </button>
          </div>
        </div>
      </aside>
    </Portal>
  );

export default Modal;
