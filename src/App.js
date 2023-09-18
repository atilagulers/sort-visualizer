// components
import Navbar from './components/Navbar';

import {ThemeProvider} from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Navbar />
        <h1>Hello</h1>
      </ThemeProvider>
    </div>
  );
}

export default App;
