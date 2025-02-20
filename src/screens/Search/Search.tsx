import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import Icon from "../../components/atoms/Icon";
import { useSubmitComplaint } from "../../hooks/useSubmitComplaint";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const { handleSearch, searchId, setSearchId, searchError } =
    useSubmitComplaint();

  const handleNavigateToBack = () => {
    navigate("/");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
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
    </div>
  );
};
