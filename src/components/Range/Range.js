import './Range.style.css';

function Range({handleChange, defaultValue, step, min, max, label}) {
  return (
    <div className="flex">
      <label className="me-2" htmlFor="range">
        {label}
      </label>
      <input
        className="range "
        onChange={handleChange}
        type="range"
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
}

export default Range;
