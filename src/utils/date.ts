export const formatDate = (fechaISO: string): string => {
  const fecha = new Date(fechaISO);
  const opciones: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return fecha.toLocaleDateString("es-ES", opciones);
};
