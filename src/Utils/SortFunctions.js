import {delay} from './Helpers';

export const mergeSort = async (arr, chartContainerRef, speed) => {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.ceil(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  const sortedArr = await merge(
    await mergeSort(left, chartContainerRef, speed),
    await mergeSort(right, chartContainerRef, speed),
    chartContainerRef,
    speed
  );
  return sortedArr;
};

const merge = async (leftArr, rightArr, chartContainerRef, speed) => {
  const sortedArr = [];
  while (leftArr.length && rightArr.length) {
    let idx = leftArr[0].getAttribute('data-index');

    const leftCol = leftArr[0];
    const rightCol = rightArr[0];

    const greenColor = 'bg-green-400';
    const redColor = 'bg-red-400';

    leftCol.classList.remove('bg-lightPrimary');
    rightCol.classList.remove('bg-lightPrimary');

    leftCol.classList.add(greenColor);
    rightCol.classList.add(greenColor);

    const leftNum = parseInt(leftCol.getAttribute('data-number'));
    const rightNum = parseInt(rightCol.getAttribute('data-number'));

    await delay((1 - speed) / 2);

    if (leftNum <= rightNum) {
      sortedArr.push(leftArr.shift());
    } else {
      chartContainerRef.current.insertBefore(
        rightCol,
        chartContainerRef.current.children[idx]
      );
      leftCol.classList.remove(greenColor);
      rightCol.classList.remove(greenColor);
      leftCol.classList.add(redColor);
      rightCol.classList.add(redColor);
      const rightColIndex = parseInt(rightCol.getAttribute('data-index'));

      leftCol.setAttribute('data-index', rightColIndex);

      sortedArr.push(rightArr.shift());
    }
    const allCols = document.querySelectorAll('.column');

    for (let i = 0; i < allCols.length; i++) {
      allCols[i].setAttribute('data-index', i);
    }
    await delay((1 - speed) / 2);
    leftCol.classList.remove(greenColor);
    rightCol.classList.remove(greenColor);
    leftCol.classList.remove(redColor);
    rightCol.classList.remove(redColor);
    leftCol.classList.add('bg-lightPrimary');
    rightCol.classList.add('bg-lightPrimary');
  }

  return [...sortedArr, ...leftArr, ...rightArr];
};

export const swapColumns = (col1, col2) => {
  const tmpHeight = col1.style.height;
  col1.style.height = col2.style.height;
  col2.style.height = tmpHeight;

  const tmpNumber = col1.getAttribute('data-number');
  col1.setAttribute('data-number', col2.getAttribute('data-number'));
  col2.setAttribute('data-number', tmpNumber);

  const tmpNumberText = col1.firstChild.textContent;
  col1.firstChild.textContent = col2.firstChild.textContent;
  col2.firstChild.textContent = tmpNumberText;
};

export const bubbleSort = async (speed, columns) => {
  for (let i = 0; i < columns.length - 1; i++) {
    for (let j = 0; j < columns.length - i - 1; j++) {
      const col1 = columns[j];
      const col2 = columns[j + 1];

      const greenColor = 'bg-green-300';
      const redColor = 'bg-red-300';

      col1.classList.add(greenColor);
      col2.classList.add(greenColor);
      col1.classList.remove('bg-lightPrimary');
      col2.classList.remove('bg-lightPrimary');

      const num1 = parseInt(col1.getAttribute('data-number'));
      const num2 = parseInt(col2.getAttribute('data-number'));

      await delay((1 - speed) / 2);

      if (num1 > num2) {
        col1.classList.add(redColor);
        col2.classList.add(redColor);
        swapColumns(col1, col2);
      }

      await delay((1 - speed) / 2);
      col1.classList.remove(redColor);
      col2.classList.remove(redColor);
      col1.classList.remove(greenColor);
      col2.classList.remove(greenColor);

      col1.classList.add('bg-lightPrimary');
      col2.classList.add('bg-lightPrimary');
    }
  }
};
