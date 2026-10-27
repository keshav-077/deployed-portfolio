type CategoryFilterProps = {
  filters: Array<string | 'all'>;
  selected: string | 'all';
  onSelect: (value: string | 'all') => void;
  className?: string;
};

const CategoryFilter = ({
  filters,
  selected,
  onSelect,
  className = '',
}: CategoryFilterProps) => (
  <div
    className={`flex flex-wrap gap-2 ${className}`}
    role="group"
    aria-label="Filter projects by category"
  >
    {filters.map((filter) => {
      const isActive = filter === selected;
      const label = filter === 'all' ? 'All Projects' : filter;
      return (
        <button
          key={filter}
          type="button"
          onClick={() => onSelect(filter)}
          aria-pressed={isActive}
          className={`inline-flex min-h-[40px] max-w-full items-center font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1 ${
            isActive
              ? 'bg-[#1C2B36] text-[#F6F2EE] border-[#1C2B36]'
              : 'bg-transparent text-[#1C2B36] border-[#1C2B36]/20 hover:border-accent-1 hover:text-accent-1'
          }`}
        >
          <span className="truncate">{label}</span>
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
