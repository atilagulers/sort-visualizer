export const getTextSize = (colWidth) => {
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

export const delay = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};
