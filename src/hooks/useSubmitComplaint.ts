import { useState } from "react";
import { ScreenType } from "../types/header.types";
import { useNavigate } from "react-router-dom";

interface FormData {
  subject: string;
  description: string;
  department: string;
  name: string;
  phone: string;
  address: string;
  colony: string;
  accountNumber: string;
}

export const useSubmitComplaint = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("new");
  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    description: "",
    department: "",
    name: "",
    phone: "",
    address: "",
    colony: "",
    accountNumber: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = Math.random().toString(36).substring(2, 15);
    setSubmittedId(randomId);
    setFormData({
      subject: "",
      description: "",
      department: "",
      name: "",
      phone: "",
      address: "",
      colony: "",
      accountNumber: "",
    });
    navigate("/success");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("No se encontró ninguna queja con ese ID");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    activeScreen,
    setActiveScreen,
    searchId,
    setSearchId,
    searchError,
    setSearchError,
    submittedId,
    formData,
    handleSubmit,
    handleSearch,
    handleInputChange,
  };
};
