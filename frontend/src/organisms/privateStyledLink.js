import styled from 'styled-components';
import theme from './../common/theme';
import { NavLink } from 'react-router-dom';
import React from 'react';

const PrivateStyledLink = styled(NavLink)`
  color: ${theme.color.blue};
  padding-left: 36px;
  min-width: 185px;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 0;
  text-decoration: none;
  display: flow-root;
  margin-bottom: 16px;
  border-left: 4px solid transparent;
  &:hover {
    border-left: 4px solid #dfe2f1;
    border-radius: 2px;
  }
  @media screen and (max-width: 768px) {
    margin: inherit 20px;
  }
`;

export default (props) => <PrivateStyledLink {...props} />;
