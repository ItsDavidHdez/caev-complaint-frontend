import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { formatDate } from "../../utils/date";

export const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState<"Pendiente" | "Completado">(
    "Pendiente"
  );

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/complaints`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error(
          "❌ Error al obtener las quejas:",
          error.response?.data || error
        );
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(
    (complaint) => complaint.status === activeTab
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📋 Lista de Quejas</h2>
      <div className="flex border-b mb-4">
        {["Pendiente", "Completado"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as "Pendiente" | "Completado")}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tabla de Quejas */}
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
                  {complaint.account}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.colony}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.comments}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
