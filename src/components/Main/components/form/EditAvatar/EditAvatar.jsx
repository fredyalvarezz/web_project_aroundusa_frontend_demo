import { useRef, useEffect, useContext } from "react";
import Popup from "../../Popup/Popup";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ isOpen, onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen && avatarRef.current) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Cambiar foto de perfil">
      <form className="popup__container" name="avatar-form" onSubmit={handleSubmit}>
        <input
          type="url"
          className="popup__input"
          placeholder="URL de tu avatar"
          name="avatar"
          ref={avatarRef}
          required
        />
        <fieldset className="popup__container-button">
          <button type="submit" className="popup__container-save popup__button">
            Guardar
          </button>
        </fieldset>
      </form>
    </Popup>
  );
}
