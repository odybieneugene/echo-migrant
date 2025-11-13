import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si des rôles spécifiques sont requis, vérifier
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">❌ Accès refusé</h4>
          <p>
            Vous n'avez pas les permissions nécessaires pour accéder à cette
            page.
          </p>
          <p className="mb-0">
            Rôles requis : <strong>{requiredRoles.join(", ")}</strong>
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
