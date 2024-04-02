import React, { useState } from 'react';
import styled from 'styled-components';
import StText from '@components/Text/StText';
import Logo from '@components/Image/Logo';
import { Flex, Text, Button } from '@chakra-ui/react';
import { categories } from '@constants/selectPlan/SELECT_ALL_INFO';
import { Link, useNavigate } from 'react-router-dom';
import useBoundStore from '@store/store';
import { logoutRequest } from '@apis/auth/auth';
import { removeToken } from '@utils/auth';
const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useBoundStore();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogoutButton = () => {
    logoutRequest();
    // removeToken(); 로그아웃에서 처리
    setIsLoggedIn(false);
    navigate('/login');
  };
  return (
    <>
      <HeaderTop>
        <Text
          fontSize={{ SE: '12px', sm: '14px' }}
          color={'white'}
          fontWeight={'700'}
        >
          100인 이하 그룹이라면 누구나 무료!👍 협업 메신저 누와로 시작하세요
        </Text>
      </HeaderTop>
      <HeaderWarp>
        <HeaderCenter>
          <Link to="/">
            <Logo width={'122px'} height={'32px'} />
          </Link>
        </HeaderCenter>
        <HeaderBottom>
          <MobileHeaderIcon className="mobileHeaderIcon" onClick={toggleMenu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                fill="black"
              />
            </svg>
          </MobileHeaderIcon>
          <CategoryBox className="moblieHeaderMenu" open={isMenuOpen}>
            {categories.map((category) => (
              <Link to={category.link} key={category.name}>
                <Flex gap={'4px'}>
                  <Text fontSize={'16px'} fontWeight={'500'}>
                    {category.name}
                  </Text>
                  <img
                    width={'14px'}
                    height={'9px'}
                    src={category.icon}
                    alt="아이콘"
                  />
                </Flex>
              </Link>
            ))}
          </CategoryBox>
          <DTHeader className="headerMenu" open={isMenuOpen}>
            {categories.map((category) => (
              <Link to={category.link} key={category.name}>
                <Flex gap={'4px'}>
                  <Text fontSize={'16px'} fontWeight={'500'}>
                    {category.name}
                  </Text>
                  <img
                    width={'14px'}
                    height={'9px'}
                    src={category.icon}
                    alt="아이콘"
                  />
                </Flex>
              </Link>
            ))}
          </DTHeader>
          <ButtonBox>
            {isLoggedIn ? (
              <Link to="/workAccess">
                <Button
                  borderRadius={'4px'}
                  bg={'#575DFB'}
                  _hover={{ bg: '#5055F3' }}
                  _active={{ bg: '#5359F6' }}
                  bgColor={'primary400'}
                  padding={'9px 22px'}
                  color={'white'}
                  fontSize={'16px'}
                  fontWeight={'700'}
                >
                  워크스페이스로 이동
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  borderRadius={'4px'}
                  bg={'#575DFB'}
                  _hover={{ bg: '#5055F3' }}
                  _active={{ bg: '#5359F6' }}
                  bgColor={'primary400'}
                  padding={'9px 22px'}
                  color={'white'}
                  fontSize={{ SE: '14px', sm: '14px', md: '16px', lg: '16px' }}
                  fontWeight={'700'}
                >
                  로그인
                </Button>
              </Link>
            )}
            {isLoggedIn ? (
              <Button
                borderRadius={'4px'}
                bg={'#313131'}
                _hover={{ bg: '#212121' }}
                _active={{ bg: '#101010' }}
                bgColor={'primary400'}
                padding={'9px 22px'}
                color={'white'}
                fontSize={{ SE: '14px', sm: '14px', md: '16px', lg: '16px' }}
                fontWeight={'700'}
                onClick={handleLogoutButton}
              >
                로그아웃
              </Button>
            ) : (
              <Link to="/signup">
                <Button
                  borderRadius={'4px'}
                  bg={'#313131'}
                  _hover={{ bg: '#212121' }}
                  _active={{ bg: '#101010' }}
                  bgColor={'primary400'}
                  padding={'9px 22px'}
                  color={'white'}
                  fontSize={{ SE: '14px', sm: '14px', md: '16px', lg: '16px' }}
                  fontWeight={'700'}
                >
                  무료 회원가입
                </Button>
              </Link>
            )}
          </ButtonBox>
        </HeaderBottom>
      </HeaderWarp>
    </>
  );
};
export default Header;
const HeaderTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 10px 0px;
`;
const HeaderWarp = styled.div`
  display: block;
  border-bottom: 1px solid #00000010;
`;
const HeaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 150px;
  border-bottom: 1px solid #00000010;
`;
const HeaderBottom = styled.div`
  display: flex;
  padding: 12px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  position: relative;
`;
const DTHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
`;
const CategoryBox = styled.div`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-flow: column;
  gap: 16px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #00000010;
  padding: 16px;
  border-radius: 8px;
  top: 56px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
  z-index: 10;
  @media (min-width: 769px) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }
`;
const MobileHeaderIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
