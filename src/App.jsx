
import './App.css';
import React from 'react';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AddNew from './components/AddNew/AddNew';
import TitlesDisplay from './components/TitlesDisplay/TitlesDisplay';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';

export const TitlesContext = React.createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/addnew" element={<AddNew />} />
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
