
import './App.css'
import React from 'react'
import AddNew from './components/AddNew/AddNew'
import TitlesDisplay from './components/TitlesDisplay/TitlesDisplay'

export const TitlesContext = React.createContext();


function App() {

 

  const [title, setTitle] = React.useState([]);
  const value = { title, setTitle };


  return (
    <TitlesContext.Provider value = { value }>
      <AddNew />
      <TitlesDisplay />
    </TitlesContext.Provider>
  )
}

export default App
