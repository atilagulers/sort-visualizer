import React, {useEffect} from 'react';

function Range({handleChange, defaultValue, step, min, max, label}) {
  return (
    <div className="flex">
      <label className="me-2" htmlFor="range">
        {label}
      </label>
      <input
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
