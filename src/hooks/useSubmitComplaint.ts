import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useNavigate } from "react-router-dom";

export const useSubmitComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    colony: "",
    type: "",
    accountNumber: "",
    comments: "",
  });

  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);

      const response = await axios.post(`${API_URL}/complaints/`, formData);
      console.log("✅ Queja enviada correctamente:", response.data);

      navigate(`/success?consecutiveId=${response.data.consecutiveId}`);
      setFormData({
        name: "",
        phone: "",
        address: "",
        colony: "",
        type: "",
        accountNumber: "",
        comments: "",
      });
    } catch (error) {
      console.error("❌ Error al enviar la queja:", error);
      alert(`Error al enviar la queja: ${error}`);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const encodedSearchId = encodeURIComponent(searchId.trim());

      const response = await axios.get(
        `${API_URL}/complaints/search/${encodedSearchId}`
      );

      console.log("🔍 Resultado de búsqueda:", response.data);
      setSearchError(null);
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      setSearchError("No se encontró la queja con el ID ingresado.");
    }
  };

  return {
    handleSubmit,
    formData,
    handleInputChange,
    handleSearch,
    searchId,
    setSearchId,
    searchError,
  };
};
