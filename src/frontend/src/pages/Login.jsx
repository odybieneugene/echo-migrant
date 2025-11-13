import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Formulaire Login
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Formulaire Register
  const [registerForm, setRegisterForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "lecteur",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await login(loginForm.email, loginForm.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await register(
      registerForm.nom,
      registerForm.prenom,
      registerForm.email,
      registerForm.password,
      registerForm.role
    );

    if (result.success) {
      navigate("/dashboard");
    } else {
      setMessage(`❌ ${result.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2
                className="text-center mb-4"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {isLogin ? "🔐 Connexion" : "📝 Inscription"}
              </h2>

              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              {isLogin ? (
                // Formulaire de connexion
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn text-white w-100"
                    style={{ backgroundColor: "#E6007E" }}
                    disabled={loading}
                  >
                    {loading ? "Connexion..." : "Se connecter"}
                  </button>
                </form>
              ) : (
                // Formulaire d'inscription
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={registerForm.nom}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          nom: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={registerForm.prenom}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          prenom: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rôle</label>
                    <select
                      className="form-select"
                      value={registerForm.role}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="lecteur">Lecteur</option>
                      <option value="redacteur">Rédacteur</option>
                      <option value="journaliste">Journaliste</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn text-white w-100"
                    style={{ backgroundColor: "#E6007E" }}
                    disabled={loading}
                  >
                    {loading ? "Inscription..." : "S'inscrire"}
                  </button>
                </form>
              )}

              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }}
                  style={{ color: "#E6007E" }}
                >
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : "Déjà inscrit ? Se connecter"}
                </button>
              </div>

              <div className="text-center mt-2">
                <Link to="/" className="btn btn-link text-muted">
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
