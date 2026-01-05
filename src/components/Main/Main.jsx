import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import EditProfile from "./components/form/EditProfile/EditProfile";
import EditAvatar from "./components/form/EditAvatar/EditAvatar";
import NewCard from "./components/form/NewCard/NewCard";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/ImagePopup";
import PopupWithConfirmation from "./components/form/RemoveCard/RemoveCard";

export default function Main({
  cards,
  activePopup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  handleOpenPopup
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleImageClick(card) {
    setSelectedCard(card);
  }

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container" onClick={() => onOpenPopup('editAvatar')}>
            <img src={currentUser.avatar} alt="Foto de perfil" className="profile__avatar" />
            <div className="profile__avatar-edit-icon"></div>
          </div>

          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__info-edit-button" type="button" onClick={() => onOpenPopup('editProfile')}>
              <img
                src="https://img.icons8.com/ios-filled/50/FFFFFF/create-new.png"
                alt="edit button"
                className="profile__info-edit-button-img"
              />
            </button>
            <p className="profile__info-details">{currentUser.about}</p>
          </div>

          <button className="profile__info-add-button" type="button" onClick={() => onOpenPopup('addCard')}>
            <img
              src="https://img.icons8.com/ios-filled/50/FFFFFF/plus-math.png"
              alt="add button"
              className="profile__info-add-button-img"
            />
          </button>
        </section>

        <section className="gallery" id="galleryzone">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onCardLike={onCardLike}
              handleOpenPopup={handleOpenPopup}
            //onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>

      {/* Popups */}
      <EditProfile
        isOpen={activePopup === 'editProfile'}
        onClose={onClosePopup}
      />
      <EditAvatar
        isOpen={activePopup === 'editAvatar'}
        onClose={onClosePopup}
      />
      <NewCard
        isOpen={activePopup === 'addCard'}
        onClose={onClosePopup}
        onAddPlaceSubmit={onAddPlaceSubmit}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
      {activePopup === 'removeCard' && (
        <PopupWithConfirmation
          isOpen={activePopup === 'removeCard'}
          onClose={onClosePopup}
          onConfirm={onCardDelete}
        />
      )}
    </>
  );
}
