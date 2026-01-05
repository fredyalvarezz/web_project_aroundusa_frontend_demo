import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default function Header({ linkText, linkTo, email, onLogout }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Title Picture"
        className="header__img"
      />

      <nav className="header__nav">
        {email ? (
          // Si está logueado: muestra email y logout
          <div className="header__user-info">
            <span className="header__email">{email}</span>
            <button className="header__logout" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          // Si no está logueado: muestra link (login/register)
          <Link to={linkTo} className="header__link">
            {linkText}
          </Link>
        )}
      </nav>
    </header>
  );
}