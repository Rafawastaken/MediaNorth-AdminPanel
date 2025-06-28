const FormSection = ({ icon: Icon, title, className, children }) => {
  return (
    <section
      className={`rounded-lg bg-gray-50 p-4 shadow-sm ring-1 ring-slate-200 ${className}`}
    >
      <header className="flex items-center gap-2">
        <Icon />
        <h2 className="text-xl font-semibold">{title}</h2>
      </header>
      {children}
    </section>
  );
};

export default FormSection;
