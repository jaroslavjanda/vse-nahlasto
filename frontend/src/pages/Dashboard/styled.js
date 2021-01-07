import styled from 'styled-components';
import theme from '../../common/theme';

export const DashboardCardWrapper = styled.div`
  text-align: center;
  border-radius: ${theme.radius.basic};
  background-color: ${theme.color.white};
  border: 2px solid ${theme.color.lightBlue};
  padding: 36px 16px;
  margin-bottom: 36px;
  transition: 0.3s;
  min-height: 280px;

  &:hover {
    background: #dfe2f1;
    border: 2px solid #5067d6;
    transition: 0.3s;
  }
`;

export const CardTitle = styled.div`
  margin-top: 24px;
  font-size: 26px;
  line-height: 30px;
  font-weight: bold;
  color: ${theme.color.black};
`;
