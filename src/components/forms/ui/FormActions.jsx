import { Save } from "lucide-react";
import { Link } from "react-router-dom";

// FormActions.jsx
import { useNavigate } from "react-router-dom";

const FormActions = ({ cancelPath, cancelLabel = "Cancelar", submitLabel }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => navigate(cancelPath, { replace: true })}
        className="rounded-md bg-gray-200 px-4 py-3 font-semibold text-slate-600 hover:bg-gray-300"
      >
        {cancelLabel}
      </button>

      <button
        type="submit"
        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
      >
        <Save size={16} /> {submitLabel}
      </button>
    </div>
  );
};

export default FormActions;
