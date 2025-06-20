// src/components/ui/WarningCard.jsx
// -------------------------------------------------------------------
// Cartão de alertas/listas – inspirado no mockup (TVs Inativas, etc.)
// Props
//   • title           – título principal
//   • content         – array de objetos { text, label, labelBgColor?, labelTextColor? }
//   • borderColor     – qualquer cor CSS (ex. "#d32f2f" ou "red")
//   • icon            – React node (ex. <AlertTriangle className="..." />)
// Se `labelBgColor`/`labelTextColor` não forem passados para um item,
// usa‑se uma paleta suave baseada em Tailwind.
// -------------------------------------------------------------------
import clsx from 'clsx';

const softBg = {
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
};

const WarningCard = ({
  title,
  content = [],
  borderColor = 'red',
  icon = null,
}) => {
  return (
      <div
          className="relative rounded-lg border border-slate-200 bg-white shadow-sm hover:scale-105 transition-all duration-200 hover:shadow-md">
        {/* faixa vertical colorida */}
        <div
            className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
            style={{background: borderColor}}
        />

        <div className="space-y-4 p-5 pl-6">
          {/* Header -------------------------------------------------- */}
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>

          {/* Itens --------------------------------------------------- */}
          <ul className="space-y-2 text-sm text-slate-800">
            {content.map(({text, label, labelBgColor, labelTextColor}, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{text}</span>
                  {label && (
                      <span
                          className={clsx(
                              'rounded-full px-3 py-0.5 text-xs font-medium min-w-20 text-center border-1 border-gray-200',
                              !labelBgColor && softBg[borderColor],  // fallback suave
                          )}
                          style={{
                            background: labelBgColor,
                            color: labelTextColor,
                          }}
                      >
                  {label}
                </span>
                  )}
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default WarningCard;
