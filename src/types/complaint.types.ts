export interface Complaint {
  _id: string;
  consecutiveId: string;
  date: string;
  account?: string;
  name: string;
  address: string;
  colony: string;
  comments?: string;
  status: "Pendiente" | "Completado";
}
