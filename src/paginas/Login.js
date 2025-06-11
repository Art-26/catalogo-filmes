import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UsuarioContexto } from '../contexts/UsuarioContexto';
import PainelUsuario from '../components/PainelUsuario';

const Container = styled.main`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 2px solid #bfff00;
  border-radius: 8px;
  background-color: #000000;
`;

const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
`;

const Rotulo = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Entrada = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Botao = styled.button`
  padding: 0.75rem;
  background-color: #bfff00;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #99cc00;
  }
`;

const MensagemErro = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const Login = () => {
  const { usuario, entrar } = useContext(UsuarioContexto);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const aoEnviar = (e) => {
    e.preventDefault();
    if (!nomeUsuario.trim()) {
      setErro('Por favor, insira seu nome de usuário.');
      return;
    }
    if (!senha.trim()) {
      setErro('Por favor, insira sua senha.');
      return;
    }
    setErro('');

    localStorage.setItem('dadosUsuario', JSON.stringify({ username: nomeUsuario, password: senha }));
    entrar({ username: nomeUsuario, password: senha });
    alert('Dados salvos com sucesso!');
  };

  if (usuario) {
    return <PainelUsuario />;
  }

  return (
    <Container>
      <Titulo>Login</Titulo>
      <Formulario onSubmit={aoEnviar} noValidate>
        <Rotulo htmlFor="nomeUsuario">Nome de usuário</Rotulo>
        <Entrada
          id="nomeUsuario"
          type="text"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
        />
        <Rotulo htmlFor="senha">Senha</Rotulo>
        <Entrada
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <MensagemErro>{erro}</MensagemErro>}

        <Botao type="submit">Salvar</Botao>
      </Formulario>
    </Container>
  );
};

export default Login;
