import {createContext, useContext, useReducer} from 'react';

const initialState = {
  colWidth: 20,
  speed: 0.9,
  selectedAlgorithm: 'selection',
  chartContainerRef: null,
  isSorting: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLUMN_WIDTH':
      return {...state, colWidth: parseInt(action.payload.colWidth)};
    case 'CHANGE_SPEED':
      return {...state, speed: parseInt(action.payload.speed)};
    case 'SET_CHART_CONTAINER':
      return {...state, chartContainerRef: action.payload.chartContainerRef};
    case 'CHANGE_ALGORITHM':
      return {...state, selectedAlgorithm: action.payload.selectedAlgorithm};
    case 'SET_IS_SORTING':
      return {...state, isSorting: action.payload.isSorting};
    default:
      return;
  }
};

const StateContext = createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};
