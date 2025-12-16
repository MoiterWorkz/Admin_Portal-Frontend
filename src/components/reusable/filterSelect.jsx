const FilterSelect = ({
  value,
  onChange,
  width,
  label,
  options,
  ariaLabel,
}) => (
  <div className={width}>
    <label className="sr-only">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-input h-[34px]"
      aria-label={ariaLabel}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
