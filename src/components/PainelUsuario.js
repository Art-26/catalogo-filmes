import React, { useContext } from 'react';
import styled from 'styled-components';
import { UsuarioContexto } from '../contexts/UsuarioContexto';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 2px solid #bfff00;
  border-radius: 8px;
  background-color: #000000;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Secao = styled.section`
  margin-bottom: 2rem;
`;

const ItemAvaliacao = styled.div`
  border-top: 1px solid #ccc;
  padding: 0.5rem 0;
`;

const ItemFavorito = styled.div`
  border-top: 1px solid #ccc;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Botao = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #bfff00;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #99cc00;
  }
`;

const BotaoVoltar = styled.button`
  padding: 0.5rem 1rem;
  background-color: #bfff00;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #99cc00;
  }
`;

const PainelUsuario = () => {
  const { usuario, avaliacoes, deletarAvaliacao, favoritos, removerFavorito } = useContext(UsuarioContexto);
  const navegar = useNavigate();

  if (!usuario) {
    return null;
  }

  return (
    <Container>
      <BotaoVoltar onClick={() => navegar('/catalogo')}>Voltar ao Catálogo</BotaoVoltar>
      <Titulo>Painel de {usuario.username}</Titulo>

      <Secao>
        <h3>Avaliações</h3>
        {avaliacoes.length === 0 && <p>Você não fez nenhuma avaliação ainda.</p>}
        {avaliacoes.map((av, indice) => (
          <ItemAvaliacao key={indice}>
            <strong>{av.idFilme}</strong> - {av.avaliacao} estrelas - {av.comentario}
            <Botao onClick={() => deletarAvaliacao(indice)}>Excluir Avaliação</Botao>
          </ItemAvaliacao>
        ))}
      </Secao>

      <Secao>
        <h3>Favoritos</h3>
        {favoritos.length === 0 && <p>Você não tem favoritos ainda.</p>}
        {favoritos.map((fav, indice) => (
          <ItemFavorito key={indice}>
            <span>{fav.titulo} ({fav.tipo === 'filme' ? 'Filme' : 'Série'})</span>
            <Botao onClick={() => removerFavorito(fav.id, fav.tipo)}>Remover</Botao>
          </ItemFavorito>
        ))}
      </Secao>
    </Container>
  );
};

export default PainelUsuario;