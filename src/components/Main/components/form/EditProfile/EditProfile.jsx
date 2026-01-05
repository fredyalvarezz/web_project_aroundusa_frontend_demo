// src/components/main/components/form/EditProfile/EditProfile.jsx
import { useState, useEffect, useContext } from "react";
import Popup from "../../Popup/Popup";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({ isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Cuando el popup se abre, rellena inputs con datos actuales
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAbout(currentUser.about || "");
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name, about });
    // El cierre del popup lo hace App.jsx después de actualizar el usuario
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Editar perfil">
      <form className="popup__container" name="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="popup__input"
          placeholder="Nombre"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="popup__input"
          placeholder="Acerca de mí"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="popup__container-button">
          <button type="submit" className="popup__container-save">
            Guardar
          </button>
        </div>
      </form>
    </Popup>
  );
}
