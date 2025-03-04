import { useState } from "react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import Icon from "../../components/atoms/Icon";
import { useSubmitComplaint } from "../../hooks/useSubmitComplaint";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { formatDate } from "../../utils/date";
import { Complaint } from "../../types/complaint.types";

export const Search = () => {
  const navigate = useNavigate();
  const { searchId, setSearchId } = useSubmitComplaint();
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleNavigateToBack = () => {
    navigate("/");
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const encodedSearchId = encodeURIComponent(searchId.trim());
      const response = await axios.get(
        `${API_URL}/complaints/search/${encodedSearchId}`
      );

      console.log("🔍 Resultado de búsqueda:", response.data);
      setSearchResult(response.data);
      setSearchError(null);
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      setSearchError("No se encontró la queja con el ID ingresado.");
      setSearchResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <button
          onClick={handleNavigateToBack}
          className="mr-4 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <Icon icon={ArrowLeft} className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold">Consultar Estado de Queja</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Ingrese el ID de la queja"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Icon icon={SearchIcon} className="h-5 w-5 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {searchError && (
        <div className="text-center py-8 text-red-600">
          <p>{searchError}</p>
        </div>
      )}

      {searchResult && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-yellow-400 text-left">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  CONSECUTIVO
                </th>
                <th className="border border-gray-300 px-4 py-2">FECHA</th>
                <th className="border border-gray-300 px-4 py-2">CUENTA</th>
                <th className="border border-gray-300 px-4 py-2">NOMBRE</th>
                <th className="border border-gray-300 px-4 py-2">DOMICILIO</th>
                <th className="border border-gray-300 px-4 py-2">COLONIA</th>
                <th className="border border-gray-300 px-4 py-2">
                  OBSERVACIONES
                </th>
                <th className="border border-gray-300 px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.consecutiveId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(searchResult.date)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.account || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.colony}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {searchResult.comments || "Sin observaciones"}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    searchResult.status === "Pendiente"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {searchResult.status === "Pendiente"
                    ? "🟡 Pendiente"
                    : "🟢 Completado"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
