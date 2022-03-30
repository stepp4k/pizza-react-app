
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import PizzaBuilder from './components/PizzaBuilder/PizzaBuilder';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/get-your-pizza' element={<PizzaBuilder />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
      </Routes>

    </div>
  );
}

export default App;
