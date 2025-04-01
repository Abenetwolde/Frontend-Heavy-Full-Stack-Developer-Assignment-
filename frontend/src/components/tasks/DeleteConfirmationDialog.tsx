interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-theme-card rounded-lg p-6 w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-theme-text text-lg font-semibold">Delete Task</h2>
          <p className="text-theme-text">Are you sure you want to delete this task? This will also delete all subtasks.</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-theme-bg text-theme-text px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };