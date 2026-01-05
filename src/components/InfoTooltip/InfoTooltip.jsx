export default function InfoTooltip({ isOpen, onClose, success, message }) {
  if (!isOpen) return null;

  return (
    <div className="info-tooltip">
      <div className={`info-tooltip__content ${success ? "success" : "error"}`}>
        <img
          src={
            success
              ? "https://img.icons8.com/ios/100/checked--v1.png"  
              : "https://img.icons8.com/ios/100/circled-x.png" 
          }
          alt={success ? "Correcto" : "Error"}
          className="info-tooltip__icon"
        />
        <p className="info-tooltip__message">{message}</p>
        <button onClick={onClose} className="info-tooltip__close">×</button>
      </div>
    </div>
  );
}