import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Icon from "../../components/atoms/Icon";
import { useSubmitComplaint } from "../../hooks/useSubmitComplaint";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const { submittedId } = useSubmitComplaint();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <Icon
        icon={CheckCircle2}
        className="h-16 w-16 text-green-500 mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold mb-4">
        ¡Queja Enviada Exitosamente!
      </h2>
      <p className="text-gray-600 mb-6">
        Su queja ha sido registrada con el siguiente ID:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <p className="text-lg font-mono font-semibold">{submittedId}</p>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        Guarde este ID para dar seguimiento al estado de su queja.
      </p>
      <button
        onClick={handleNavigate}
        className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto cursor-pointer"
      >
        <Icon icon={ArrowLeft} className="h-5 w-5 mr-2" />
        Volver al Inicio
      </button>
    </div>
  );
};
