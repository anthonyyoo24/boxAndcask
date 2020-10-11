import './Modal.scss';
import React from 'react';
import ReactDOM from 'react-dom';

// ui standard modal visible active
// ui dimmer modals visible active

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="modal-dimmer">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <div className="modal__div">
          <p className="modal__title">{props.title}</p>
          <p className="modal__content">{props.content}</p>
        </div>
        <div className="modal__actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
