import {delay} from './Helpers';

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

      const num1 = parseInt(col1.getAttribute('data-number'));
      const num2 = parseInt(col2.getAttribute('data-number'));

      await delay(speed);

      if (num1 > num2) {
        col1.classList.add(redColor);
        col2.classList.add(redColor);
        swapColumns(col1, col2);
      }

      await delay(speed);
      col1.classList.remove(redColor);
      col2.classList.remove(redColor);
      col1.classList.remove(greenColor);
      col2.classList.remove(greenColor);
    }
  }
};
