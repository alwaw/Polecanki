
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

// export const TitlesContext = React.createContext();

//todo:


//1 - czyszczenie oceny usera po dodaniu serialu to TitleDisplay - OK
//2 - walidacja (powtarzanie się tytułów serialu) - generalnie OK, dodać CSS
//3 - wyczyszczenie z console.logów - OK
//4 - wyczyszczenie komponentu AddNew z niepotrzebnych danych - OK
//5 - wyświetlanie się oceny usera obok gwiazdek? 
//6 - pole do komentarza usera
//7 - ładniejszy przycisk Dodaj serial
//8 - usunięcie przycisku Powrót z AddNew - OK
//9 - textarea - po dodaniu opinii znika textarea, pojawia się po
// po prostu paragraf z opinią. niżej przycisk Edytuj

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

 

  // const [title, setTitle] = React.useState([]);
  // const value = { title, setTitle };


  return (
    
    // <TitlesContext.Provider value = { value }>
      <RouterProvider router={router}>
      <AddNew />
      <TitlesDisplay />
      </RouterProvider>
    // </TitlesContext.Provider>
   
  )
}

export default App
