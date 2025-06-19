import {AlertTriangle, X} from 'lucide-react';

const ErrorAlert = ({message, onClose}) => (
    <div
        className="flex items-start gap-2 rounded-lg bg-red-600/10 p-3 text-sm text-red-300">
      <AlertTriangle size={18} className="mt-[3px] shrink-0"/>
      <span className="flex-1 leading-tight">{message}</span>
      {onClose && (
          <button
              onClick={onClose}
              className="rounded p-1 text-red-200 hover:bg-red-600/20"
          >
            <X size={14}/>
          </button>
      )}
    </div>
);

export default ErrorAlert;