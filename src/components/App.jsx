import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import * as auth from "../utils/auth";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //Estado para infoTooltip
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [cardToDelete, setCardToDelete] = useState(null);

  const DEMO_MODE = true;

  const navigate = useNavigate();


  useEffect(() => {
    if (DEMO_MODE) {
      setLoggedIn(true);
      setUserEmail("demo@demo.com");
    }
  }, []);


  // Cargar datos de usuarios y tarjetas solo si está logueado
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error("Error al cargar datos:", err));
    }
  }, [loggedIn]);

  // Manejador de Login
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setToken(data.token);

        return api.getUserInfo();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setUserEmail(userData.email);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error al inicio de sesión: ", err);
        setIsRegisterSuccess(false);
        setTooltipMessage("Credenciales inválidas o usuario no registrado.");
        setIsTooltipOpen(true);
      });
  }

  // Manejo de Registro con InfoTooltip
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegisterSuccess(true);
        setTooltipMessage("¡Correcto! Ya estas registrado.");
        setIsTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Error al registrar: ", err);
        setIsRegisterSuccess(false);
        setTooltipMessage("Uy, algo salió mal. Por favor, inténtelo de nuevo.");
        setIsTooltipOpen(true);
      });
  }

  //Logout cerra sesion
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/signin");
  }

  //Control InfoTooltip
  function closeTooltip() {
    setIsTooltipOpen(false);
  }


  // Manejadores de Popups y tarjetas
  function handleOpenPopup(popupType, card = null) {
    if (popupType === "removeCard") {
      setCardToDelete(card);
    }
    setActivePopup(popupType);
  }

  function handleClosePopup() {
    setActivePopup(null);
    setCardToDelete(null);
  }

  // Actualiza usuario y cierra popup
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  // Actualiza avatar y cierra popup
  const handleUpdateAvatar = ({ avatar }) => {
    api.setAvatar({ avatar })
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  // Maneja nuevo lugar agregado
  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link })
      .then(newCard => {
        setCards(cards => [newCard, ...cards]);
        handleClosePopup();
      })
      .catch(err => console.error("Error al agregar tarjeta:", err));
  };

  // Maneja "like" en tarjeta usando directamente card.isLiked
  const handleCardLike = (card) => {
    const isLiked = !!card.isLiked; // true o false según API

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(updatedCard => {
        setCards(cards => cards.map(c => c._id === card._id ? updatedCard : c));
      })
      .catch(err => console.error("Error al actualizar like:", err));
  };

  // Maneja eliminación de tarjeta
  function handleCardDelete() {
    if (!cardToDelete) return;

    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id));
        handleClosePopup();
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  }

  if (!loggedIn && !DEMO_MODE) {
    return (
      <>
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeTooltip}
          success={isRegisterSuccess}
          message={tooltipMessage}
        />
      </>
    );
  }

  // Aquí solo llegamos si está logueado
  if (!currentUser) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header email={userEmail} onLogout={handleLogout} />
        <Main
          cards={cards}
          activePopup={activePopup}
          onOpenPopup={handleOpenPopup}
          handleOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>

      {/* InfoTooltip tambien sera accesible desde Main si se quiere mostrar mensajes en pagina principal*/}
      {/* <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeTooltip}
        success={isRegisterSuccess}
        message={tooltipMessage}
      /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
