interface ChipSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const ChipSelect = ({ options, selected, onChange }: ChipSelectProps) => {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            selected.includes(opt)
              ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
              : "bg-zinc-800/30 border-zinc-700/30 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default ChipSelect;
