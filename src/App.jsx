
import './App.css';
import React from 'react';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

//components
import TitlesDisplay from './components/TitlesDisplay/TitlesDisplay';

//pages
import Layout from './components/Layout/Layout.jsx';
import AddNew from './components/AddNew/AddNew.jsx';
import Home from './pages/Home/Home';
import About from './pages/About/About.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About/>} />
    </Route>
    <Route path="/addNew" element={<AddNew />} />
    </>
  )
  
 
)

function App() {

  return (
  
      <RouterProvider router={router}>
      <AddNew />
      <TitlesDisplay />
      </RouterProvider>
   
  )
}

export default App
