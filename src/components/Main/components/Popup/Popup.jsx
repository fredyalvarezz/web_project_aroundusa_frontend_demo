export default function Popup({ isOpen, onClose, title, children }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-all">
        <button
            aria-label="Close modal"
            className="popup__button-closed"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        <div className="popup__container">
          
          {title && <h3 className="popup__container-text">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}