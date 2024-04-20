
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
import Layout from './components/Layout/Layout';
import AddNew from './components/AddNew/AddNew';
import Home from './pages/Home/Home';
import About from './pages/About/About';

export const TitlesContext = React.createContext();

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

 

  const [title, setTitle] = React.useState([]);
  const value = { title, setTitle };


  return (
    
    <TitlesContext.Provider value = { value }>
      <RouterProvider router={router}>
      <AddNew />
      <TitlesDisplay />
      </RouterProvider>
    </TitlesContext.Provider>
   
  )
}

export default App
