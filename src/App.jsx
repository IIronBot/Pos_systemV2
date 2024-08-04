import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { MenuContextProvider } from './context/menu-context.jsx';
import { OrderContextProvider } from './context/orders-context';
import Buser from './pages/Buser';
import { Cashier } from './pages/Cashier';
import Cook from './pages/Cook';
import { CreateOrder } from './pages/CreateOrder';
import { JobChoice } from './pages/Jobchoice';

function App() {

  return (
    <>
      <MenuContextProvider>
        <OrderContextProvider>
          <Router>
            <Routes>
              <Route path='/' element = {<JobChoice />} />
              <Route path='/cashier' element = {<Cashier />} /> 
              <Route path ='/order' element = {<CreateOrder />}/> 
              <Route path ='/cook' element = {<Cook />}/>
              <Route path ='/buser' element = {<Buser />}/>


            </Routes>
          </Router>
        </OrderContextProvider>
      </MenuContextProvider>
    </>
  )
}

export default App
