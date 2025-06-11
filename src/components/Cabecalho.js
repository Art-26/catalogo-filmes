import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UsuarioContexto } from '../contexts/UsuarioContexto';

const Navegacao = styled.nav`
  background-color: #000000;
  border-bottom: 2px solid #bfff00;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
`;

const LinkNavegacao = styled(Link)`
  color: #bfff00;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;

  &.ativo {
    text-decoration: underline;
  }

  &:hover {
    color: #99cc00;
  }
`;

const InformacaoUsuario = styled.div`
  color: #bfff00;
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BotaoSair = styled.button`
  background: none;
  border: 1px solid #bfff00;
  color: #bfff00;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #bfff00;
    color: #000000;
  }
`;

const Cabecalho = () => {
  const localizacao = useLocation();
  const navegar = useNavigate();
  const { usuario, sair } = useContext(UsuarioContexto);

  const aoSair = () => {
    sair();
    navegar('/');
  };

  return (
    <Navegacao>
      {!usuario ? (
        <LinkNavegacao to="/" className={localizacao.pathname === '/' ? 'ativo' : ''}>
          Entrar
        </LinkNavegacao>
      ) : (
        <InformacaoUsuario>
          Olá, {usuario.username}
          <BotaoSair onClick={aoSair}>Sair</BotaoSair>
        </InformacaoUsuario>
      )}
      <LinkNavegacao to="/catalogo?tipo=filme" className={localizacao.pathname === '/catalogo' && new URLSearchParams(localizacao.search).get('tipo') === 'filme' ? 'ativo' : ''}>
        Filmes
      </LinkNavegacao>
      <LinkNavegacao to="/catalogo?tipo=série" className={localizacao.pathname === '/catalogo' && new URLSearchParams(localizacao.search).get('tipo') === 'série' ? 'ativo' : ''}>
        Séries
      </LinkNavegacao>
      <LinkNavegacao to="/calendario" className={localizacao.pathname === '/calendario' ? 'ativo' : ''}>
        Calendário
      </LinkNavegacao>
    </Navegacao>
  );
};

export default Cabecalho;