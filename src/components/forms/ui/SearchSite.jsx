import { useCallback } from "react";

export default function SearchSite({
  term,
  onTermChange,
  status,
  onStatusChange,
}) {
  const handleInput = useCallback(
    (e) => onTermChange(e.target.value),
    [onTermChange]
  );

  const baseBtn =
    "border border-gray-300 rounded-md py-1.5 px-3 text-sm transition";
  const activeBtn = "bg-blue-600 text-white border-blue-600";

  return (
    <div className="flex items-center justify-between gap-5 bg-white shadow-sm py-5 px-2 rounded-md">
      <input
        type="text"
        id="searchSite"
        placeholder="Pesquisar locais…"
        value={term}
        onChange={handleInput}
        className="flex-1 rounded-md border border-gray-200 py-2 px-4 focus:outline-blue-200"
      />

      <div className="flex items-center gap-3 mr-3">
        {[
          { key: "all", label: "Todos" },
          { key: "active", label: "Ativos" },
          { key: "inactive", label: "Inativos" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onStatusChange(key)}
            className={`${baseBtn} ${status === key ? activeBtn : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
