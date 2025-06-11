import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './paginas/Login';
import Calendario from './paginas/Calendario';
import DetalheFilme from './paginas/DetalheFilme';
import Logo from './components/Logo';
import Cabecalho from './components/Cabecalho';
import CarregadorFonte from './components/CarregadorFonte';
import { ProvedorUsuario } from './contexts/UsuarioContexto';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #000000;
    color: #bfff00;
    font-family: 'Exile', cursive, sans-serif;
  }

  a {
    color: #bfff00;
    text-decoration: none;
  }

  button {
    background-color: #bfff00;
    color: #000000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: #99cc00;
  }
`;

function App() {
  return (
    <>
    <CarregadorFonte />
    <GlobalStyle />
    <ProvedorUsuario>
      <Router>
        <Logo />
        <Cabecalho />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </Router>
    </ProvedorUsuario>
    </>
  );
}

export default App;