import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-family: 'Exile', cursive;
  font-size: 4rem;
  font-weight: light;
  text-align: center;
  margin: 1rem 0;
  background: linear-gradient(40deg, #bfff00, #99cc00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 2px #bfff00) drop-shadow(0 0 5px #99cc00);
  user-select: none;
`;

const Logo = () => {
  return <LogoContainer>Monkey</LogoContainer>;
};

export default Logo;
