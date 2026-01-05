import { useEffect } from "react";
export default function ImagePopup({ card, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup")) onClose();
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={handleOverlayClick}>
      <div className="popup__container popup__container-image">
        <button
          type="button"
          className="popup__button-closed"
          onClick={onClose}
          aria-label="Cerrar"
        >
          X
        </button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}