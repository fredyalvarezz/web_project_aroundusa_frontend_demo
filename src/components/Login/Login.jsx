import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <>
      <Header linkText="Regístrate" linkTo="/signup" />
      <div className="popup__log ">
        <div className="popup__container-all-log">
          <form className="popup__container-log" onSubmit={handleSubmit}>
            <h2 className="popup__container-text-log">Inicia sesión</h2>

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

            <div className="popup__container-button">
              <button type="submit" className="popup__container-save-log">
                Iniciar sesión
              </button>
            </div>

            <p className="popup__redirect">
              ¿Aún no eres miembro?{" "}
              <Link to="/signup" className="popup__redirect-link">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}