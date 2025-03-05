type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  handleUpdateStatus: (id: string) => void;
  selectedComplaintId: string | null;
};

export const Modal = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdateStatus,
  selectedComplaintId,
}: Props) => {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">¿Está seguro?</h2>
            <p className="text-gray-600 mb-6">
              Esta acción marcará la queja como completada.
            </p>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  if (selectedComplaintId) {
                    handleUpdateStatus(selectedComplaintId);
                  }
                  setIsModalOpen(false);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
