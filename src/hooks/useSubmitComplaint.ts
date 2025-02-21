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
    description: "",
  });

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
        description: "",
      });
    } catch (error) {
      console.log(formData);
      console.error("❌ Error al enviar la queja:", error);
      alert("Hubo un error al enviar la queja. Inténtalo de nuevo.");
    }
  };

  return { handleSubmit, formData, handleInputChange };
};
