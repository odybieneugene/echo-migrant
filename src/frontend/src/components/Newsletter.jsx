import React from "react";
import "../styles/components/newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter-banner py-4">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center">
        <h3 className="newsletter-text mb-3 mb-md-0 me-md-4">
          REJOINS NOTRE NEWSLETTER
        </h3>

        <form className="newsletter-form d-flex flex-column flex-md-row align-items-center">
          <input
            type="email"
            className="form-control me-md-2 mb-3 mb-md-0"
            placeholder="email@adresse.com"
            required
          />
          <button type="submit" className="btn btn-yellow">
            S’inscription
          </button>
        </form>
      </div>
      <p className="newsletter-subtext mt-3 text-center">
        Recevez nos enquêtes et reportages premium, chaque semaine.
      </p>
    </section>
  );
}

export default Newsletter;
