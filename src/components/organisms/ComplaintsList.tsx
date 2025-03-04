import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { formatDate } from "../../utils/date";
import { Complaint } from "../../types/complaint.types";

export const ComplaintsList = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<
    "Todas" | "Pendiente" | "Completado"
  >("Todas");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/complaints`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "❌ Error al obtener las quejas:",
            error.response?.data || error.message
          );
        } else {
          console.error("❌ Error desconocido:", error);
        }
      }
    };

    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/complaints/${id}`,
        { status: "Completado" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: "Completado" }
            : complaint
        )
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Error al actualizar el estado:",
          error.response?.data || error.message
        );
      } else {
        console.error("❌ Error desconocido:", error);
      }
    }
  };

  const filteredComplaints = [...complaints]
    .filter(
      (complaint) => activeTab === "Todas" || complaint.status === activeTab
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📋 Lista de Quejas</h2>

      <div className="flex border-b mb-4">
        {["Todas", "Pendiente", "Completado"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() =>
              setActiveTab(tab as "Todas" | "Pendiente" | "Completado")
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-yellow-400 text-left">
            <tr>
              <th className="border border-gray-300 px-4 py-2">CONSECUTIVO</th>
              <th className="border border-gray-300 px-4 py-2">FECHA</th>
              <th className="border border-gray-300 px-4 py-2">CUENTA</th>
              <th className="border border-gray-300 px-4 py-2">NOMBRE</th>
              <th className="border border-gray-300 px-4 py-2">DOMICILIO</th>
              <th className="border border-gray-300 px-4 py-2">COLONIA</th>
              <th className="border border-gray-300 px-4 py-2">
                OBSERVACIONES
              </th>
              <th className="border border-gray-300 px-4 py-2">STATUS</th>
              <th className="border border-gray-300 px-4 py-2">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.consecutiveId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(complaint.date)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.account || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.name} - {complaint.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.colony}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.comments || "Sin observaciones"}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    complaint.status === "Pendiente"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {complaint.status === "Pendiente"
                    ? "🟡 Pendiente"
                    : "🟢 Completado"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.status === "Pendiente" && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleUpdateStatus(complaint._id)}
                    >
                      Marcar como Completado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
