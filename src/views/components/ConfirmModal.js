import React from "react";
import '../../styles/main.scss';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Confirmar</button>
          <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
