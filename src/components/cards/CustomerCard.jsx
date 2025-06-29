import { Eye, User2, Mail, Pencil, Trash2 } from "lucide-react";

const CustomerCard = ({ customer }) => {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <User2 size={22} className="text-blue-600" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{customer.company_name}</h3>
            <span className="text-sm text-slate-500 capitalize">
              {customer.company_activity}
            </span>
          </div>
        </div>
      </div>

      {/* Morada + contacto */}
      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        <li className="flex items-start gap-2">
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5a2.25 2.25 0 10-2.25-2.25A2.25 2.25 0 0012 10.5z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.665-7.5 11.25-7.5 11.25S4.5 18.165 4.5 10.5a7.5 7.5 0 1115 0z"
            ></path>
          </svg>
          {customer.company_address}
        </li>
        <li className="flex items-start gap-2">
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75 12 13.5l9.75-6.75"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 17.25l9.75-6.75 9.75 6.75"
            ></path>
          </svg>
          {customer.contact_name}
        </li>
        <li className="flex items-start gap-2">
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25 11.999 13.5l9.75-5.25M2.25 8.25v7.5L12 21.75l9.75-5.25v-7.5"
            ></path>
          </svg>
          {customer.contact_phone}
        </li>
        <li className="flex items-start gap-2">
          <Mail size={16} />
          {customer.contact_email}
        </li>
      </ul>
    </div>
  );
};

export default CustomerCard;
