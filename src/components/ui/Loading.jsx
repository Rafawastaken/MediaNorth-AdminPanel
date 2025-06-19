import {Loader2} from 'lucide-react';

const Loading = ({
  full = false,
  blue = false,
  size = 32,
  className = '',
  message = 'A carregar...',
}) => {
  const spinner = (
      <div className={'flex flex-col items-center justify-center gap-2'}>
        <Loader2
            size={size}
            className={`animate-spin text-[var(--light-blue)] ${className}`.trim()}
        />
        <p className={'text-slate-800'}>{message}</p>
      </div>
  );

  const spinnerWhite = (
      <div className={'flex flex-col items-center justify-center gap-2'}>
        <Loader2
            size={size}
            className={`animate-spin text-[var(--light-blue)] ${className}`.trim()}
        />
        <p className={'text-white'}>{message}</p>
      </div>
  );

  if (full) {
    return (
        <div
            className="flex h-screen w-auto items-center justify-center bg-[var(--dark-blue)]/40">
          {spinner}
        </div>
    );
  }

  if (blue) {
    return (
        <div
            className="flex h-screen w-auto items-center justify-center bg-gradient-to-br from-[var(--dark-blue)] via-[#1B2435] to-[var(--light-blue)] text-white">
          {spinnerWhite}
        </div>
    );
  }

  return <div className="flex items-center justify-center">{spinner}</div>;
};

export default Loading;