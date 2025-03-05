import { useEffect, useState } from "react";
import { HeaderLogo } from "../molecules/Header/HeaderLogo";
import { HeaderButton } from "../molecules";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-white py-6 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <HeaderLogo />
        <div className="flex gap-4">
          <HeaderButton />
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform cursor-pointer"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
