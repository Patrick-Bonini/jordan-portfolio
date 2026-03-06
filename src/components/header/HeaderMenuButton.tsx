interface HeaderMenuButtonProps {
  onClick: () => void;
  className?: string;
}

export default function HeaderMenuButton({ onClick, className = '' }: HeaderMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-[6px] cursor-pointer hover:opacity-60 transition-opacity p-2 flex-shrink-0 ${className}`.trim()}
    >
      <div className="w-8 h-[2px] bg-[var(--site-fg)]"></div>
      <div className="w-8 h-[2px] bg-[var(--site-fg)]"></div>
    </button>
  );
}