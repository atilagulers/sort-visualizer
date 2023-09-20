import {useState} from 'react';

// components
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

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
          <Footer />
        </ThemeProvider>
      </StateProvider>
    </div>
  );
}

export default App;
