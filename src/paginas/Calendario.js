import React, { useState, useEffect } from 'react';
import 'styled-components';
import styled from 'styled-components';

const Container = styled.main`
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
    margin: 0 0 0.5rem 0;
`;

const DataLancamento = styled.p`
    font-weight: bold;
    margin: 0 0 0.5rem 0;
`;

const Descricao = styled.p`
    margin: 0;
    padding: 0;
`;

const dadosFuturos = [
    {
        id: 1,
        titulo: 'Lilo & Stitch',
        dataLancamento: '22 de maio de 2025',
        descricao: 'Live-action do famoso clássico de animação da Disney, Lilo & Stitch conta a história da amizade entre uma jovem menina humana e um alienígena fugitivo que parece um cachorro. Stitch (Chris Sanders), o experimento 626, é um extraterrestre expressivo que é adotado como animal de estimação por Lilo (Maia Kealoha), uma imaginativa e rebelde garota havaiana, e juntos eles descobrem o significado de família. O jeito extrovertido de Lilo mais do que corresponde à energia caótica do pequeno monstro peludo e impulsivo que está sendo caçado pelos agentes da Federação Galáctica Unida. A amizade incomum entre os dois provoca uma série de confusões e problemas até com a assistente social que cuida de Lilo, observando seu bem-estar ao lado da irmã Nani, sua tutora legal desde a morte dos pais.',
        poster: 'https://d2d7ho1ae66ldi.cloudfront.net/ArquivoNoticias/cd5df8d5-ab52-11ef-aa79-9bebc91072b3/lilo-stitch-live-action+(1).jpeg',
    },
    {
        id: 2,
        titulo: 'SUPERMAN',
        dataLancamento: '10 de julho de 2025',
        descricao: 'Um herói movido pela crença e pela esperança na bondade da humanidade. Em Superman, acompanhamos a jornada do super-herói em tentar conciliar suas duas personas: sua herança extraterrestre como kryptoniano e sua vida humana, criado como Clark Kent (David Corenswet) na cidade de Smallville no Kansas. Dirigido por James Gunn, o novo filme irá reunir personagens, heróis e vilões clássicos da história de Superman, como Lex Luthor (Nicholas Hoult), Lois Lane (Rachel Brosnahan), Lanterna Verde (Nathan Fillion), Mulher-Gavião (Isabela Merced), entre outros. O chamado de Superman será colocado à prova através de uma série de novas aventuras épicas e diante de uma sociedade que enxerga seus valores de justiça e verdade como antiquados.',
        poster: 'https://saocarlosnotoque.com/wp-content/uploads/2025/03/superman-filme-estreia-2025.jpg',
    },
    {
        id: 3,
        titulo: 'Zootopia',
        dataLancamento: '27 de novembro de 2025',
        descricao: 'Os heróis e policiais novatos Judy Hopps e Nick Wilde estão de volta para mais uma aventura extravagante pela grande metrópole animal. Em Zootopia 2, Judy e Nick precisarão formar uma parceria inusitada com um recém-chegado à cidade: o misterioso réptil Gary De’Snake. Para tentar desvendar os mistérios do caso envolvendo a víbora, Judy e Nick devem desvendar novas partes da cidade, sendo testados o tempo todo.',
        poster: 'https://i.ytimg.com/vi/KYOguImkYek/maxresdefault.jpg',
    },
];

const Calendario = () => {
    const [futuros, setFuturos] = useState([]);

    useEffect(() => {
        setFuturos(dadosFuturos);
    }, []);

    return (
        <Container>
            <Titulo>Calendários de Filmes e Séries Futuras</Titulo>
            <Lista>
                {futuros.map(({ id, titulo, dataLancamento, descricao, poster }) => (
                    <ItemLista key={id}>
                        <img src={poster} alt= {titulo} width="300" height="300" />
                        <div>
                            <TituloFilme>{titulo}</TituloFilme>
                            <DataLancamento>Data de Lançamento:{dataLancamento}</DataLancamento>
                            <Descricao>{descricao}</Descricao>
                        </div>
                    </ItemLista>
                ))}
            </Lista>
        </Container>
    );
};

export default Calendario;