import styled from 'styled-components';
import theme from './../../common/theme';
import { NavLink } from 'react-router-dom';
import React from 'react';

const StyledLink = styled(NavLink)`
  color: ${theme.color.blue};
  margin: 0 36px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0;
  text-decoration: none;

  &:hover {
    padding-bottom: 9px;
    border-bottom: 4px solid #dfe2f1;
    border-radius: 2px;
  }
  &:active {
    border-bottom: 4px solid #dfe2f1;
    border-radius: 2px;
    padding-bottom: 9px;
  }
  @media screen and (max-width: 768px) {
    margin: 0px 20px;
  }
`;

export default (props) => <StyledLink {...props} />;
