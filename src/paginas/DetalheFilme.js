import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UsuarioContexto } from '../contexts/UsuarioContexto';

const Container = styled.main`
  max-width: 600px;
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

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  margin: 0 auto 1rem auto;
  border-radius: 8px;
`;

const Genero = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
`;

const Sinopse = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const AvaliacaoEstrela = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: center;
`;

const Estrela = styled.span`
  font-size: 2rem;
  color: ${props => (props.filled ? '#ffc107' : '#e4e5e9')};
  cursor: pointer;
  margin: 0 0.25rem;
`;

const AreaTexto = styled.textarea`
  width: 97%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Botao = styled.button`
  padding: 0.75rem;
  background-color: #bfff00;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #99cc00;
  }
`;

const BotaoVoltar = styled.button`
  margin-bottom: 1rem;
  background: none;
  border: none;
  color: #bfff00;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;

  &:hover {
    color: #99cc00;
  }
`;

const BotaoFavorito = styled.button`
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => (props.favorited ? '#bfff00' : '#e0e0e0')};
  color: ${props => (props.favorited ? '#000000' : 'black')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.favorited ? '#99cc00' : '#c0c0c0')};
  }
`;

const DetalheFilme = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { usuario } = useContext(UsuarioContexto);

  const idFilme = parseInt(id, 10);
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const tipo = queryParams.get('tipo') || 'filme';

  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');
  const [avaliacoesSalvas, setAvaliacoesSalvas] = useState([]);
  const { avaliacoes, adicionarAvaliacao, deletarAvaliacao, favoritos, adicionarFavorito, removerFavorito, estaFavorito } = useContext(UsuarioContexto);

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM1ZTQwZmQ1MDk2ZTIzNTgzOWM2OWQ1ZWQ2ZGY0MiIsIm5iZiI6MTc0OTYwNDExNC4zMTMsInN1YiI6IjY4NDhkNzEyMDAyMDdjNGNkMjNlMDdkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.clCx2rRn1Y4koNNym6t_H14aj_-olujgzZrxffjPc5I';

useEffect(() => {
  setLoading(true);
  setError(null);

  const opcoes = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  const url = tipo === 'filme'
    ? `https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`
    : `https://api.themoviedb.org/3/tv/${idFilme}?language=pt-BR`;

  fetch(url, opcoes)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do filme');
      }
      return response.json();
    })
    .then(data => {
      const filmeFormatado = {
        id: data.id,
        titulo: data.title || data.name,
        genero: data.genres && data.genres.length > 0 ? data.genres[0].name : 'Outro',
        tipo: tipo,
        sinopse: data.overview,
        poster: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : 'https://via.placeholder.com/600x338?text=Sem+Imagem'
      };
      setFilme(filmeFormatado);
      setError(null);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, [idFilme, tipo]);

  useEffect(() => {
    if (filme) {
      const avaliacoesFilme = avaliacoes.filter(av => av.idFilme === idFilme);
      setAvaliacoesSalvas(avaliacoesFilme);
    }
  }, [idFilme, avaliacoes, filme]);

  const aoClicarEstrela = (estrela) => {
    setAvaliacao(estrela);
  };

  const aoEnviar = (e) => {
    e.preventDefault();
    if (!usuario) {
      alert('Você precisa estar logado para adicionar uma avaliação.');
      return;
    }
    if (avaliacao === 0) {
      alert('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }
    const novaAvaliacao = {
      usuario: usuario,
      idFilme: idFilme,
      avaliacao,
      comentario,
      data: new Date().toISOString(),
    };
    const avaliacoesAtualizadas = [...avaliacoesSalvas, novaAvaliacao];
    setAvaliacoesSalvas(avaliacoesAtualizadas);
    localStorage.setItem(`avaliacoes_${idFilme}`, JSON.stringify(avaliacoesAtualizadas));
    adicionarAvaliacao(novaAvaliacao);
    setAvaliacao(0);
    setComentario('');
    alert('Avaliação adicionada com sucesso!');
  };

  if (loading) {
    return (
      <Container>
        <p>Carregando detalhes do filme...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
        <BotaoVoltar onClick={() => navegar('/catalogo')}>Voltar ao catálogo</BotaoVoltar>
      </Container>
    );
  }

  if (!filme) {
    return (
      <Container>
        <p>Filme/Série não encontrado.</p>
        <BotaoVoltar onClick={() => navegar('/catalogo')}>Voltar ao catálogo</BotaoVoltar>
      </Container>
    );
  }

  return (
    <Container>
      <BotaoVoltar onClick={() => navegar('/catalogo')}>Voltar ao catálogo</BotaoVoltar>
      <Titulo>{filme.titulo}</Titulo>
      <Poster src={filme.poster} alt={`${filme.titulo} poster`} />
      <Genero>{filme.tipo === 'filme' ? 'Filme' : 'Série'} - {filme.genero}</Genero>
      <Sinopse>{filme.sinopse}</Sinopse>

      <form onSubmit={aoEnviar}>
        <label>Avaliação (1 a 5 estrelas)</label>
        <AvaliacaoEstrela>
          {[1, 2, 3, 4, 5].map(estrela => (
            <Estrela
              key={estrela}
              filled={estrela <= avaliacao}
              onClick={() => aoClicarEstrela(estrela)}
              role="button"
              aria-label={`${estrela} estrela`}
            >
              ★
            </Estrela>
          ))}
        </AvaliacaoEstrela>

        <label>Comentário</label>
        <AreaTexto
          rows="4"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <Botao type="submit">Salvar Avaliação</Botao>
      </form>

      {avaliacoesSalvas.length > 0 && (
        <>
          <h2>Avaliações</h2>
          {avaliacoesSalvas.map((avaliacao, indice) => (
            <div key={indice} style={{ borderTop: '1px solid #ccc', padding: '0.5rem 0' }}>
              <strong>{avaliacao.usuario.username}</strong> - {new Date(avaliacao.data).toLocaleString()}
              <div>
                {[1, 2, 3, 4, 5].map(estrela => (
                  <Estrela key={estrela} filled={estrela <= avaliacao.avaliacao}>★</Estrela>
                ))}
              </div>
              <p>{avaliacao.comentario}</p>
              <Botao onClick={() => {
                const novasAvaliacoesSalvas = avaliacoesSalvas.filter((_, i) => i !== indice);
                setAvaliacoesSalvas(novasAvaliacoesSalvas);
                localStorage.setItem(`avaliacoes_${idFilme}`, JSON.stringify(novasAvaliacoesSalvas));
                deletarAvaliacao(indice);
              }}>Excluir Avaliação</Botao>
            </div>
          ))}
        </>
      )}

      {usuario && (
        <BotaoFavorito
          favorited={estaFavorito(idFilme, filme.tipo)}
          onClick={() => {
            if (estaFavorito(idFilme, filme.tipo)) {
              removerFavorito(idFilme, filme.tipo);
            } else {
              adicionarFavorito({ id: idFilme, tipo: filme.tipo, titulo: filme.titulo });
            }
          }}
        >
          {estaFavorito(idFilme, filme.tipo) ? 'Desfavoritar' : 'Favoritar'}
        </BotaoFavorito>
      )}
    </Container>
  );
};

export default DetalheFilme;