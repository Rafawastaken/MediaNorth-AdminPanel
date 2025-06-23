const NoResults = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-slate-500">{message}</p>
    </div>
  );
};

export default NoResults;
