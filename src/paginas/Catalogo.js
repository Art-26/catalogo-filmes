import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UsuarioContexto } from '../contexts/UsuarioContexto';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://api.themoviedb.org/3';
const API_LANG = 'pt-BR';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM1ZTQwZmQ1MDk2ZTIzNTgzOWM2OWQ1ZWQ2ZGY0MiIsIm5iZiI6MTc0OTYwNDExNC4zMTMsInN1YiI6IjY4NDhkNzEyMDAyMDdjNGNkMjNlMDdkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.clCx2rRn1Y4koNNym6t_H14aj_-olujgzZrxffjPc5I'; 

const generosMapeados = {
  28: 'Ação',
  35: 'Comédia',
  27: 'Terror',
  16: 'Animação',
  80: 'Policial',
  53: 'Suspense'
};

const Container = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #000000;
  border: 2px solid #bfff00;
  border-radius: 8px;
`;

const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Filtro = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: #000000;
  border: 2px solid #bfff00;
  border-radius: 8px;
  padding: 0.5rem;
`;

const BotaoFiltro = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => (props.ativo ? '#bfff00' : '#e0e0e0')};
  color: ${props => (props.ativo ? '#000000' : 'black')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #99cc00;
    color: #000000;
  }
`;

const Grade = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const Cartao = styled.article`
  border: 2px solid #bfff00;
  border-radius: 8px;
  padding: 0.5rem;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const TituloFilme = styled.h2`
  font-size: 1rem;
  margin: 0.5rem 0;
  text-align: center;
`;

const Genero = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
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

const BotaoFavorito = styled.button`
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => (props.$favorito ? '#bfff00' : '#e0e0e0')};
  color: ${props => (props.$favorito ? '#000000' : 'black')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.$favorito ? '#99cc00' : '#c0c0c0')};
  }
`;

const generos = [
  'Ação',
  'Comédia',
  'Terror',
  'Animação',
  'Policial',
  'Suspense',
];

const Catalogo = () => {
  const { usuario, favoritos, adicionarFavorito, removerFavorito, estaFavorito } = useContext(UsuarioContexto);
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [temMaisPaginas, setTemMaisPaginas] = useState(true);
  const navegar = useNavigate();

  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const tipoSelecionado = queryParams.get('tipo') || '';

  const mapearGenero = (ids) => {
    const generosEncontrados = [];
    for (let id of ids) {
      if (generosMapeados[id]) {
        generosEncontrados.push(generosMapeados[id]);
      }
    }
    return generosEncontrados.length > 0 ? generosEncontrados : ['Outro'];
  };

  const buscarDados = async (pagina = 1) => {
    setCarregando(true);
    try {
      const opcoes = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`
        }
      };

      const endpoints = [
        fetch(`${API_BASE}/movie/popular?language=${API_LANG}&page=${pagina}`, opcoes),
        fetch(`${API_BASE}/tv/popular?language=${API_LANG}&page=${pagina}`, opcoes)
      ];

      const respostas = await Promise.all(endpoints);
      const resultados = await Promise.all(respostas.map(res => res.json()));

      const filmes = resultados[0].results.map(item => ({
        id: item.id,
        titulo: item.title,
        genero: mapearGenero(item.genre_ids),
        tipo: 'filme',
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
          : 'https://via.placeholder.com/180x320?text=Sem+Imagem'
      }));

      const series = resultados[1].results.map(item => ({
        id: item.id,
        titulo: item.name,
        genero: mapearGenero(item.genre_ids),
        tipo: 'tv',
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
          : 'https://via.placeholder.com/180x320?text=Sem+Imagem'
      }));

      const tudo = [...filmes, ...series];

      if (pagina === 1) {
        setDados(tudo);
      } else {
        setDados(prev => [...prev, ...tudo]);
      }

      const totalPaginas = Math.max(resultados[0].total_pages, resultados[1].total_pages);
      if (pagina >= totalPaginas || pagina >= 500) {
        setTemMaisPaginas(false);
      }
    } catch (error) {
      console.error('Erro na API', error);
      setErro('Erro ao buscar catálogo');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    setDadosFiltrados([]);
    setPaginaAtual(1);
    setTemMaisPaginas(true);
  }, [generoSelecionado, tipoSelecionado]);

  useEffect(() => {
    buscarDados(paginaAtual);
  }, [paginaAtual, generoSelecionado, tipoSelecionado]);

  useEffect(() => {
    let filtrados = dados;

    if (generoSelecionado) {
      filtrados = filtrados.filter(item => item.genero.includes(generoSelecionado));
    }

    if (tipoSelecionado) {
      filtrados = filtrados.filter(item => item.tipo === tipoSelecionado);
    }

    setDadosFiltrados(filtrados);
  }, [generoSelecionado, tipoSelecionado, dados]);

  const carregarMais = () => {
    if (!temMaisPaginas || carregando) return;
    const proximaPagina = paginaAtual + 1;
    setPaginaAtual(proximaPagina);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        carregarMais();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [paginaAtual, carregando]);

  const aoClicarCartao = (id, tipo) => {
    navegar(`/catalogo/${id}?tipo=${tipo}`);
  };

  const aoClicarFavorito = (item) => {
    if (estaFavorito(item.id, item.tipo)) {
      removerFavorito(item.id, item.tipo);
    } else {
      adicionarFavorito(item);
    }
  };

  if (erro) return <Container>Erro: {erro}</Container>;

  return (
    <Container>
      {usuario && <BotaoVoltar onClick={() => navegar('/')}>Voltar para o Painel</BotaoVoltar>}
      <Titulo>Catálogo de Filmes e Séries</Titulo>
      <Filtro>
        <BotaoFiltro ativo={generoSelecionado === ''} onClick={() => setGeneroSelecionado('')}>
          Todos
        </BotaoFiltro>
        {generos.map((genero) => (
          <BotaoFiltro
            key={genero}
            ativo={generoSelecionado === genero}
            onClick={() => setGeneroSelecionado(genero)}
          >
            {genero}
          </BotaoFiltro>
        ))}
      </Filtro>
      <Grade>
        {dadosFiltrados.map(({ id, titulo, poster, genero, tipo }) => (
          <Cartao key={id} onClick={() => aoClicarCartao(id, tipo)} style={{ cursor: 'pointer' }}>
            <Poster src={poster} alt={`${titulo} poster`} />
            <TituloFilme>{titulo}</TituloFilme>
            <Genero>{tipo === 'filme' ? 'Filme' : 'Série'} - {genero.join(', ')}</Genero>
            {usuario && (
              <BotaoFavorito
                $favorito={estaFavorito(id, tipo)}
                onClick={(e) => { e.stopPropagation(); aoClicarFavorito({ id, tipo, titulo }); }}
              >
                {estaFavorito(id, tipo) ? 'Desfavoritar' : 'Favoritar'}
              </BotaoFavorito>
            )}
          </Cartao>
        ))}
      </Grade>
      {carregando && <div>Carregando mais...</div>}
      {!temMaisPaginas && <div>Todos os itens foram carregados.</div>}
    </Container>
  );
};

export default Catalogo;