import React, {useEffect, useRef, useState} from 'react';
import './Main.style.css';

function Main() {
  const chartContainerRef = useRef(null);
  const [colWidth, setColWidth] = useState(50);

  // 1000px
  useEffect(() => {
    function updateColumns(arr) {
      const container = chartContainerRef.current;
      container.innerHTML = '';
      for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const column = document.createElement('div');
        column.className = 'column bg-white flex flex-col justify-end mx-[2px]';
        column.style.width = colWidth + 'px'; // 30px - 100px
        column.style.height = num + '%';

        column.dataset.number = num;
        column.dataset.index = i;

        const numText = document.createElement('div');
        numText.className = `text-center -rotate-90 mb-1 ${getTextSize(
          colWidth
        )}`;
        numText.textContent = num;

        column.appendChild(numText);
        container.appendChild(column);
      }
    }

    const arr = new Array(Math.round(1200 / colWidth)); // 100 10  - 80 12
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.round(Math.random() * 100) + 1;
    }
    updateColumns(arr);
  }, [colWidth]);

  return (
    <div className="main">
      <div className="chart flex" ref={chartContainerRef}></div>
    </div>
  );
}

const getTextSize = (colWidth) => {
  let textSize = 'text-base';
  if (colWidth < 30) {
    textSize = 'text-xs';
  } else if (colWidth >= 30 && colWidth < 40) {
    textSize = 'text-base';
  } else if (colWidth >= 40 && colWidth < 50) {
    textSize = 'text-lg';
  } else if (colWidth >= 50) {
    textSize = 'text-2xl';
  }
  return textSize;
};

export default Main;
