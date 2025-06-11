import React, { createContext, useState, useEffect } from 'react';

export const UsuarioContexto = createContext();

export const ProvedorUsuario = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const dadosUsuarioArmazenados = JSON.parse(localStorage.getItem('dadosUsuario'));
    if (dadosUsuarioArmazenados && dadosUsuarioArmazenados.username) {
      setUsuario({ username: dadosUsuarioArmazenados.username });
      const avaliacoesArmazenadas = JSON.parse(localStorage.getItem(`avaliacoes_${dadosUsuarioArmazenados.username}`)) || [];
      setAvaliacoes(avaliacoesArmazenadas);
      const favoritosArmazenados = JSON.parse(localStorage.getItem(`favoritos_${dadosUsuarioArmazenados.username}`)) || [];
      setFavoritos(favoritosArmazenados);
    }
  }, []);

  const entrar = (dadosUsuario) => {
    setUsuario({ username: dadosUsuario.username });
    localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));
    const avaliacoesArmazenadas = JSON.parse(localStorage.getItem(`avaliacoes_${dadosUsuario.username}`)) || [];
    setAvaliacoes(avaliacoesArmazenadas);
    const favoritosArmazenados = JSON.parse(localStorage.getItem(`favoritos_${dadosUsuario.username}`)) || [];
    setFavoritos(favoritosArmazenados);
  };

  const sair = () => {
    setUsuario(null);
    setAvaliacoes([]);
    setFavoritos([]);
    localStorage.removeItem('dadosUsuario');
  };

    const adicionarAvaliacao = (avaliacao) => {
        const avaliacoesAtualizadas = [...avaliacoes, avaliacao];
        setAvaliacoes(avaliacoesAtualizadas);
        if (usuario && usuario.username) {
        localStorage.setItem(`avaliacoes_${usuario.username}`, JSON.stringify(avaliacoesAtualizadas));
        }
    };

  const deletarAvaliacao = (indiceAvaliacao) => {
    const avaliacoesAtualizadas = avaliacoes.filter((_, index) => index !== indiceAvaliacao);
    setAvaliacoes(avaliacoesAtualizadas);
    if (usuario && usuario.username) {
      localStorage.setItem(`avaliacoes_${usuario.username}`, JSON.stringify(avaliacoesAtualizadas));
    }
  };

    const adicionarFavorito = (item) => {
        if (!favoritos.find(fav => fav.id === item.id && fav.tipo === item.tipo)) {
        const favoritosAtualizados = [...favoritos, item];
        setFavoritos(favoritosAtualizados);
        if (usuario && usuario.username) {
        localStorage.setItem(`favoritos_${usuario.username}`, JSON.stringify(favoritosAtualizados));
        }
    }
  };

  const removerFavorito = (idItem, tipoItem) => {
    const favoritosAtualizados = favoritos.filter(fav => !(fav.id === idItem && fav.tipo === tipoItem));
    setFavoritos(favoritosAtualizados);
    if (usuario && usuario.username) {
      localStorage.setItem(`favoritos_${usuario.username}`, JSON.stringify(favoritosAtualizados));
    }
  };

  const estaFavorito = (idItem, tipoItem) => {
    return favoritos.some(fav => fav.id === idItem && fav.tipo === tipoItem);
  };

  return (
    <UsuarioContexto.Provider value={{
      usuario,
      entrar,
      sair,
      avaliacoes,
      adicionarAvaliacao,
      deletarAvaliacao,
      favoritos,
      adicionarFavorito,
      removerFavorito,
      estaFavorito,
    }}>
      {children}
    </UsuarioContexto.Provider>
  );
};