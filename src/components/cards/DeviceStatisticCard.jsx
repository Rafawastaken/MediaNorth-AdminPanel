// src/components/cards/DeviceStatisticCard.jsx
import React from "react";

export default function DeviceStatisticCard({
  title,
  value,
  color = "#0f62fe", // cor de fallback
}) {
  return (
    <div className="rounded-lg border border-slate-200 py-4 ps-6 text-start shadow-sm">
      <h2 className="text-2xl font-bold" style={{ color }}>
        {value}
      </h2>
      <p className="mt-1 text-sm text-slate-600">{title}</p>
    </div>
  );
}
