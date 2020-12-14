import styled from 'styled-components';
import theme from './../common/theme';

export const AdminWrapper = styled.div`
  padding-bottom: 60px;
`;

export const Wrapper = styled.div``;

export const AdminBackground = styled.div`
  min-height: calc(100vh - 5rem);
  padding-top: 5rem;
  overflow-x: hidden;
  background: transparent
    linear-gradient(180deg, #fafafa 0%, #fafafa 50%, #dfe2f1 100%) 0% 0%
    no-repeat padding-box;
`;
export const Header = styled.header`
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 96px;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 1200px) {
    padding-bottom: 40px;
  }
`;

export const ProfileWrapper = styled.div`
  width: 180px;
  text-align: center;
  display: inline-table;
  vertical-align: middle;
  background: #ffffff00;
  border: 2px solid #dfe2f1;
  border-radius: 8px;
  padding: 11px 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${theme.color.blue};
`;
export const HeaderSection = styled.div`
  @media screen and (max-width: 768px) {
    padding-bottom: 24px;
  }
`;

export const Logo = styled.a`
  text-decoration: none;
  color: ${theme.color.blue};
  font-size: 36px;
  font-weight: bold;
  border: unset !important;
  margin-right: 16px;

  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
  @media screen and (max-width: 576px) {
  }
`;
export const Background = styled.div`
  background-color: ${theme.color.gray};
`;

export const Footer = styled.div`
  background-color: ${theme.color.blue};
  padding: 60px 0px 25px 0px;
`;

export const FooterHeader = styled.div`
  color: ${theme.color.white};
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0px;
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
`;

export const FooterLink = styled.div`
  color: ${theme.color.hoverLink};
  font-size: 24px;
  margin: 8px 0px;
`;

export const FooterItem = styled.div`
  color: ${theme.color.hoverLink};
  font-size: 24px;
  margin: 8px 0px;
`;
export const Line = styled.div`
  border: 2px solid #435cd7;
  margin: 8px 0px;
`;
export const LogoFooter = styled.div`
  text-align: right;
  font-size: 36px;
  font-weight: bold;
  color: ${theme.color.white};
  @media screen and (max-width: 991px) {
    margin-top: 64px;
    text-align: left;
  }
  @media screen and (max-width: 768px) {
    margin-top: 64px;
    text-align: center;
  }
`;

export const FooterDescWrap = styled.div`
  margin-top: 120px;
  font-size: 18px;
  color: ${theme.color.hoverLink};
`;

export const FooterDescLeft = styled.div`
  text-align: left;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

export const FooterDescRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    margin-top: 32px;
    justify-content: center;
  }
`;
