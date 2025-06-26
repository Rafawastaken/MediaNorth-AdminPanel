import clsx from "clsx";

const StatisticCard = ({
  title,
  subtitle,
  value,
  resume,
  color = "#22c55e",
  icon = null,
  loading = false,
}) => {
  const isPositive =
    typeof resume === "string" && resume.trim().startsWith("+");
  const resumeColor = isPositive ? "text-emerald-600" : "text-red-600";

  return (
    <div className="relative flex min-w-[16rem] flex-col gap-2 overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 hover:scale-105 transition-all duration-200 hover:shadow-md">
      {/* Barra colorida no lado esquerdo */}
      <span
        className="absolute left-0 top-0 h-full w-[4px] rounded-tr-sm rounded-br-sm"
        style={{ backgroundColor: color }}
      />

      {/* Cabeçalho */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {icon && <div className="text-slate-500">{icon}</div>}
      </div>

      {/* Valor principal */}
      <p className="text-3xl font-semibold text-slate-900">
        {loading ? "…" : value}
      </p>

      {/* Subtítulo */}
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}

      {/* Resumo (variação) */}
      {resume && (
        <p className={clsx("text-xs font-medium", resumeColor)}>{resume}</p>
      )}
    </div>
  );
};

export default StatisticCard;
