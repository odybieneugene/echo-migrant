import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/footer.css";
import logo from "../assets/images/Logo_Echomigrantblanc.png";

function Footer() {
  return (
    <footer className="footer-section py-4">
      <div className="container text-center">
        {/* Logo centre - cliquable vers l'accueil */}
        <Link to="/" className="d-inline-block mb-3">
          <img src={logo} alt="Logo Echo Migrant" className="footer-logo-img" />
        </Link>

        {/* Liens */}
        <ul className="footer-links list-inline mb-3">
          <li className="list-inline-item"><a href="#">Nous ecrire</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Qui sommes-nous</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Nos chartes</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Politique de confidentialite</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Gestion des cookies</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Espace pro</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#">Espace presse</a></li>
        </ul>

        {/* Copyright */}
        <p className="footer-copy mb-0">
          (c) {new Date().getFullYear()} Echo Migrant. Tous droits reserves.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

