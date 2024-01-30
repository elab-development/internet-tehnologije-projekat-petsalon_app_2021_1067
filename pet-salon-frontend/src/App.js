import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './komponente/Footer';
import Navbar from './komponente/Navbar';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
