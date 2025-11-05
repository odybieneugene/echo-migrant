import { Link } from "react-router-dom";
import logoBlack from "../assets/images/logo_Echomigrantblack.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2 py-lg-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center p-0" to="/">
          <img src={logoBlack} alt="Echo Migrant" className="navbar-logo" />
        </Link>

        {/* Burger button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/actualites">Actualités</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reportages">Reportages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dossiers">Dossiers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Bouton Connexion */}
          <Link
            to="/login"
            className="btn btn-sm ms-3 text-white"
            style={{ backgroundColor: "#E6007E", fontFamily: "Poppins, sans-serif" }}
          >
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
