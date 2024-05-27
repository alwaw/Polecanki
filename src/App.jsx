
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
import About from './pages/About/About';

export const TitlesContext = React.createContext();

//todo:
//1 - czyszczenie oceny usera po dodaniu serialu to TitleDisplay
//2 - walidacja (powtarzanie się tytułów serialu)
//3 - wyczyszczenie z console.logów
//4 - wyczyszczenie komponentu AddNew z niepotrzebnych danych
//5 - wyświetlanie się oceny usera obok gwiazdek? 
//6 - pole do komentarza usera
//7 - ładniejszy przycisk Dodaje serial
//8 - usunięcie przycisku Powrót z AddNew

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
