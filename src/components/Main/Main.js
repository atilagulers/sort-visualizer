import React, {useEffect, useRef, useState} from 'react';
import './Main.style.css';
import {getTextSize} from '../../Utils/Helpers';
import {useStateContext} from '../../contexts/StateContext';
import {delay} from '../../Utils/Helpers';

function Main() {
  const chartContainerRef = useRef(null);
  const {state} = useStateContext();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    function updateColumns(arr) {
      const container = chartContainerRef.current;
      container.innerHTML = '';
      for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const column = document.createElement('div');
        column.className = 'column flex flex-col justify-end mx-[1px] bg-light';
        column.style.width = state.colWidth + 'px'; // 30px - 100px
        column.style.height = num + '%';

        column.dataset.number = num;
        column.dataset.index = i;

        const numText = document.createElement('div');
        numText.className = `text-center -rotate-90 mb-2 ${getTextSize(
          state.colWidth
        )}`;
        numText.textContent = num;

        column.appendChild(numText);
        container.appendChild(column);
      }
    }

    const newArr = new Array(Math.round(1200 / state.colWidth)); // chart width / col width
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = Math.round(Math.random() * 95) + 5;
    }
    setArr(newArr);
    updateColumns(newArr);
  }, [state.colWidth]);

  async function bubbleSort() {
    const columns = chartContainerRef.current.querySelectorAll('.column');

    for (let i = 0; i < columns.length - 1; i++) {
      for (let j = 0; j < columns.length - i - 1; j++) {
        const col1 = columns[j];
        const col2 = columns[j + 1];
        col1.classList.add('bg-blue-200');
        col2.classList.add('bg-blue-200');

        const num1 = parseInt(col1.getAttribute('data-number'));
        const num2 = parseInt(col2.getAttribute('data-number'));

        if (num1 > num2) {
          const tmpHeight = col1.style.height;
          col1.style.height = col2.style.height;
          col2.style.height = tmpHeight;

          const tmpNumber = col1.getAttribute('data-number');
          col1.setAttribute('data-number', col2.getAttribute('data-number'));
          col2.setAttribute('data-number', tmpNumber);

          const tmpNumberText = col1.firstChild.textContent;
          col1.firstChild.textContent = col2.firstChild.textContent;
          col2.firstChild.textContent = tmpNumberText;
        }

        await delay(state.speed);
        col1.classList.remove('bg-blue-200');
        col2.classList.remove('bg-blue-200');
      }
    }
  }

  return (
    <div className="main">
      <button onClick={bubbleSort} className="bg-white">
        sort
      </button>
      <div className="chart flex" ref={chartContainerRef}></div>
    </div>
  );
}

export default Main;
