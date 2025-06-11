import React, { useState, useEffect } from 'react';
import 'styled-components';
import styled from 'styled-components';

const Conteiner = styled.main`
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #000000;
    border: 2px solid #bfff00;
    border-radius: 4px;
`;

const Titulo = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
`;

const Lista = styled.ul`
    list-style: none;
    padding: 0;
`;

const ItemLista = styled.li`
    border: 2px solid #bfff00;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #000000;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const TituloFilme = styled.h2`
    margin: 0 0 0.5rem;
`;

const DataLancamento = styled.p`
    font-weight: bold;
    margin: 0 0 0.5rem;
`;

const Descricao = styled.p`
    margin: 0;
    padding: 0;
`;

const dadosFuturos = [
    {
        id: 1,
        Titulo: 'Lilo & Stitch',
        DataLancamento: 'sem data',
        Descricao: 'Filme Lilo & Stitch',
        poster: 'https://d2d7ho1ae66ldi.cloudfront.net/ArquivoNoticias/cd5df8d5-ab52-11ef-aa79-9bebc91072b3/lilo-stitch-live-action+(1).jpeg',
    },
]