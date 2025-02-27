import { MapPin, Phone, Send, User, Contact2 } from "lucide-react";
import { useSubmitComplaint } from "../../hooks/useSubmitComplaint";
import Icon from "../atoms/Icon";
import { Input } from "../molecules";
import { Colony } from "../../constants/colony";

export const Form = () => {
  const { handleSubmit, formData, handleInputChange } = useSubmitComplaint();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">Presentar Nueva Queja</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            title="Nombre Completo"
            icon={User}
            name="name"
            value={formData.name}
            handleInputChange={handleInputChange}
            required
            placeholder="Nombre, apellidos"
            typeInput="text"
          />
          <Input
            title="Teléfono"
            icon={Phone}
            name="phone"
            value={formData.phone}
            handleInputChange={handleInputChange}
            required
            placeholder="7831234567"
            regex="^\d+$"
            typeInput="number"
          />
          <Input
            title="Dirección"
            icon={MapPin}
            name="address"
            value={formData.address}
            handleInputChange={handleInputChange}
            required
            placeholder="Calle, número, CP..."
            typeInput="text"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colonia
            </label>
            <select
              name="colony"
              value={formData.colony}
              onChange={handleInputChange}
              className="pl-6 w-full block border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer py-2 h-12"
              required
            >
              <option value="">Selecciona tu colonia</option>
              {Colony.map((colony, index) => (
                <option key={index} value={colony.name}>
                  {colony.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Reporte
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            required
          >
            <option value="">Seleccione el tipo de reporte</option>
            <option value="falta-servicio">Falta de Servicio</option>
            <option value="drenajes">Drenajes</option>
            <option value="varios">Varios</option>
          </select>
        </div>

        {formData.type === "falta-servicio" && (
          <Input
            title="Número de Cuenta"
            icon={Contact2}
            name="accountNumber"
            value={formData.accountNumber}
            handleInputChange={handleInputChange}
            required
            placeholder="Número de cuenta"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Describe aquí en que te podemos ayudar"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onClick={handleSubmit}
        >
          <Icon className="h-5 w-5 mr-2" icon={Send} />
          Enviar Queja
        </button>
      </form>
    </div>
  );
};
