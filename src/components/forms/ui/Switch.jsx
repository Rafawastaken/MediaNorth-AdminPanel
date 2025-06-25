import React from "react";

/**
 * Toggle simples.
 *
 * @param {boolean}  checked   – estado actual
 * @param {function} onChange  – callback(boolean)
 */
export default function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 rounded-full transition-colors
        ${checked ? "bg-green-500" : "bg-slate-300"}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow
          transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
}
