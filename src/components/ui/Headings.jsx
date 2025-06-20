export const HeadingStandard = ({title = '', subtitle = ''}) => {
  return (
      <div className="flex flex-col gap-2">
        <h1 className={'text-3xl font-bold'}>{title}</h1>
        <p className={'font-light text-md'}>{subtitle}</p>
      </div>
  );
};

