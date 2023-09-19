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

  async function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.ceil(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedArr = await merge(
      await mergeSort(left),
      await mergeSort(right)
    );
    return sortedArr;
  }

  async function merge(leftArr, rightArr) {
    const sortedArr = [];

    while (leftArr.length && rightArr.length) {
      let idx = leftArr[0].getAttribute('data-index');

      const leftCol = leftArr[0];
      const rightCol = rightArr[0];
      console.log('idx: ' + idx);
      //console.log('right: ' + rightArr[0].getAttribute('data-index'));
      //idx = leftCol.getAttribute('data-index');
      leftCol.classList.add('bg-green-400');
      rightCol.classList.add('bg-green-400');
      const leftNum = parseInt(leftCol.getAttribute('data-number'));
      const rightNum = parseInt(rightCol.getAttribute('data-number'));

      await delay(0);
      if (leftNum <= rightNum) {
        sortedArr.push(leftArr.shift());
      } else {
        chartContainerRef.current.insertBefore(
          rightCol,
          chartContainerRef.current.children[idx]
        );

        const leftColIndex = parseInt(leftCol.getAttribute('data-index'));
        const rightColIndex = parseInt(rightCol.getAttribute('data-index'));

        leftCol.setAttribute('data-index', rightColIndex);
        //rightCol.setAttribute('data-index', rightColIndex);
        const allCols = document.querySelectorAll('.column');
        for (let i = 0; i < allCols.length; i++) {
          allCols[i].setAttribute('data-index', i);
        }

        sortedArr.push(rightArr.shift());
      }
      leftCol.classList.remove('bg-green-400');
      rightCol.classList.remove('bg-green-400');
    }

    return [...sortedArr, ...leftArr, ...rightArr];
  }

  async function handleClickSort() {
    const myArr = arr.slice();
    const columns = chartContainerRef.current.querySelectorAll('.column');
    const columnsArray = Array.from(columns);

    const sorted = await mergeSort(columnsArray);

    for (let i = 0; i < sorted.length; i++) {
      //console.log(sorted[i].getAttribute('data-number'));
    }
  }

  return (
    <div className="main">
      <button onClick={handleClickSort} className="bg-white">
        sort
      </button>
      <div className="chart flex" ref={chartContainerRef}></div>
    </div>
  );
}

export default Main;
