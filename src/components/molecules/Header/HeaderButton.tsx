import { Search } from "lucide-react";
import Icon from "../../atoms/Icon";
import { useNavigate } from "react-router-dom";

export const HeaderButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/search")}
      className="bg-white text-blue-800 px-4 py-2 rounded-lg flex items-center hover:bg-blue-50 transition-colors cursor-pointer"
    >
      <Icon className="h-5 w-5 mr-2" icon={Search} />
      Buscar Queja
    </button>
  );
};
