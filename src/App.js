import Loginpage from './page/Loginpage';
import Singup from './page/Singup';
import Dashboard from './page/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter >

      <Routes>

        <Route exact path="/" element={<Loginpage />} />
        <Route exact path="/Singup" element={<Singup />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />

        
       



      </Routes>

    </BrowserRouter>
  );
}

export default App;
