import {useState} from 'react';

// components
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';

// contexts
import {StateProvider} from './contexts/StateContext';
import {ThemeProvider} from './contexts/ThemeContext';

function App() {
  return (
    <div className="app">
      <StateProvider>
        <ThemeProvider>
          <Navbar />
          <Main />
        </ThemeProvider>
      </StateProvider>
    </div>
  );
}

export default App;
