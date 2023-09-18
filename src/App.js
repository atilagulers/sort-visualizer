// components
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';

import {ThemeProvider} from './contexts/ThemeContext';

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <Navbar />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
