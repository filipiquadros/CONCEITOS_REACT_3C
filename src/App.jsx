import { useState } from 'react'
import './App.css'

function App() {
  const [carro, setCarro] = useState('BMW')
  function trocarDeCarro() {
    if (carro === 'Mustang') {
      setCarro('BMW')
    }else {
      setCarro('Mustang')
    }
  }
  return (
    <>
      <h1>{carro}</h1>
      <button onClick={trocarDeCarro}>Trocar de Carro</button>
    </>
  )
}

export default App
