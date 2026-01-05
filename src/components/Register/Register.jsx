import { useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "../Header/Header";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      await onRegister(email, password);
    } catch (err) {
      if (err.message.includes("400")) {
        setErrorMessage("Correo inválido o contraseña demasiado corta.");
      } else if (err.message.includes("409")) {
        setErrorMessage("Este correo ya está registrado.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Intenta de nuevo.");
      }
    }
  }

  return (
    <>
      <Header linkText="Inicia sesión" linkTo="/signin" />
      <div className="popup__log">
        <div className="popup__container-all-log">
          <form className="popup__container-log" onSubmit={handleSubmit}>
            <h2 className="popup__container-text-log">Regístrate</h2>

            <input
              type="email"
              className="popup__input-log"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="popup__input-log"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {errorMessage && (
              <span className="popup__error-message">{errorMessage}</span>
            )}

            <div className="popup__container-button">
              <button type="submit" className="popup__container-save-log">
                Regístrate
              </button>
            </div>

            <p className="popup__redirect">
              ¿Ya eres miembro?{" "}
              <Link to="/signin" className="popup__redirect-link">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
