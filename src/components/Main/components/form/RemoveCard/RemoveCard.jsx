import React from "react";

export default function PopupWithConfirmation({ isOpen, onClose, onConfirm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <div className={`popup popup_type_confirm ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >X</button>
        <h2 className="popup__title">¿Estás seguro?</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <button type="submit" className="popup__save-button">
            {isLoading ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </form>
      </div>
    </div>
  );
}