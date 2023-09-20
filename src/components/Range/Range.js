import './Range.style.css';

function Range({handleChange, defaultValue, step, min, max, label, disabled}) {
  return (
    <div className="flex">
      <label className="label me-2" htmlFor="">
        {label}
      </label>
      <input
        className="range"
        onChange={handleChange}
        type="range"
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
      />
    </div>
  );
}

export default Range;
