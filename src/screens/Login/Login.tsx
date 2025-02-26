import { useState } from "react";
import { User, Lock, LogIn } from "lucide-react";
import { Input } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/url";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);

      localStorage.setItem("token", response.data.access_token);

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Error en el login:",
          error.response?.data || error.message
        );
        alert(error.response?.data?.message || "Error al iniciar sesión.");
      } else {
        console.error("❌ Error desconocido en el login:", error);
        alert("Error inesperado. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          title="Usuario"
          icon={User}
          name="username"
          value={formData.username}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          handleInputChange={handleInputChange}
          required
          placeholder="Usuario"
        />
        <Input
          title="Contraseña"
          icon={Lock}
          name="password"
          type="password"
          value={formData.password}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          handleInputChange={handleInputChange}
          required
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
