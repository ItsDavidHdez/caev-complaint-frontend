import * as XLSX from "xlsx";
import { Complaint } from "../types/complaint.types";

export const handleExportExcel = (complaints: Complaint[]) => {
  if (complaints.length === 0) {
    alert("No hay quejas para exportar.");
    return;
  }

  const groupedComplaints: Record<string, any[]> = {
    "Falta de Servicio": [],
    Fugas: [],
    "Calidad de Agua": [],
    Drenajes: [],
    Varios: [],
  };

  complaints.forEach((complaint) => {
    const typeFormatted = complaint.type.trim().toLowerCase();

    let category = "Varios";

    if (typeFormatted.includes("falta")) {
      category = "Falta de Servicio";
    } else if (typeFormatted.includes("fuga")) {
      category = "Fugas";
    } else if (typeFormatted.includes("calidad")) {
      category = "Calidad de Agua";
    } else if (typeFormatted.includes("drenaje")) {
      category = "Drenajes";
    }

    groupedComplaints[category].push({
      "ID Consecutivo": complaint.consecutiveId,
      "Fecha de Reporte": complaint.date,
      Cuenta: complaint.account || "N/A",
      Nombre: complaint.name,
      Dirección: complaint.address,
      Colonia: complaint.colony,
      Teléfono: complaint.phone,
      Observaciones: complaint.comments || "Sin observaciones",
    });
  });

  const wb = XLSX.utils.book_new();
  let hasData = false;

  Object.entries(groupedComplaints).forEach(([type, data]) => {
    if (data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);

      const headerRange = XLSX.utils.decode_range(ws["!ref"] || "A1:A1");
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = XLSX.utils.encode_col(col) + "1";
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
      }

      ws["!cols"] = [
        { wch: 20 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
        { wch: 30 },
        { wch: 20 },
        { wch: 15 },
        { wch: 30 },
      ];

      XLSX.utils.book_append_sheet(wb, ws, type);
      hasData = true;
    }
  });

  if (!hasData) {
    alert("No hay datos para exportar.");
    return;
  }

  XLSX.writeFile(wb, "Quejas.xlsx");
};
