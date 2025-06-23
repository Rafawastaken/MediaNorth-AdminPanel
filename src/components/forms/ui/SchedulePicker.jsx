// src/components/forms/ui/SchedulePicker.jsx
import { useState, useEffect, Fragment } from "react";
import { Clock } from "lucide-react";

const days = [
  ["mon", "Seg"],
  ["tue", "Ter"],
  ["wed", "Qua"],
  ["thu", "Qui"],
  ["fri", "Sex"],
  ["sat", "Sáb"],
  ["sun", "Dom"],
];

const defaultSchedule = Object.fromEntries(
  days.map(([k]) => [k, { from: "", to: "" }])
);

export default function SchedulePicker({ value = {}, onChange }) {
  const [local, setLocal] = useState({ ...defaultSchedule, ...value });

  useEffect(() => {
    setLocal({ ...defaultSchedule, ...value });
  }, [value]);

  const update = (day, field, val) => {
    const next = { ...local, [day]: { ...local[day], [field]: val } };
    setLocal(next);
    onChange(next);
  };

  return (
    <div>
      {/* Cabeçalho: vazio | Das | Até */}
      <div className="mt-2 grid grid-cols-[80px_1fr_1fr] gap-3 text-sm font-medium text-slate-500">
        <span />
        <span className="text-center">Das</span>
        <span className="text-center">Até</span>
      </div>

      {/* Linhas */}
      {days.map(([key, label]) => {
        const { from = "", to = "" } = local[key] || {};
        return (
          <div
            key={key}
            className="mt-1 grid grid-cols-[80px_1fr_1fr] items-center gap-3"
          >
            <span className="text-sm font-medium">{label}</span>

            <input
              type="time"
              value={from}
              onChange={(e) => update(key, "from", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="time"
              value={to}
              onChange={(e) => update(key, "to", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        );
      })}
    </div>
  );
}
