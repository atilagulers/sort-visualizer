import {createContext, useContext, useReducer} from 'react';

const initialState = {
  colWidth: 40,
  speed: 0.5,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLUMN_WIDTH':
      return {...state, colWidth: parseInt(action.payload.colWidth)};
    case 'CHANGE_SPEED':
      return {...state, speed: parseInt(action.payload.speed)};
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
