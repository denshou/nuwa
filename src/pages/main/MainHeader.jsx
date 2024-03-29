import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex, Text, Button } from '@chakra-ui/react';
import mainTool from '@assets/mainpage1.jpg';
import mainTool2 from '@assets/mainpage2.jpg';
import mainTool3 from '@assets/mainpage2_1.jpg';
import mainTool4 from '@assets/mainpage2_2.jpg';
import mainTool5 from '@assets/mainpage3.jpg';
import useFreeTrialRedirect from '../../hooks/auth/useFreeTrialRedirect';

const images = [mainTool, mainTool2, mainTool3, mainTool4, mainTool5]; // 이미지 배열

const MainHeader = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { handleButtonClick } = useFreeTrialRedirect();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StContainer>
      <MainSection>
        <StTextBox>
          <Flex
            flexDirection="column"
            gap={{
              SE: '10px',
              sm: '32px',
            }}
          >
            <Text
              width="100%"
              fontSize={{
                SE: '22px',
                sm: '28px',
                md: '34px',
                lg: '40px',
                xl: '48px',
                xxl: '56px',
              }}
              fontWeight="700"
              lineHeight="3.5rem"
              align={{ SE: 'center', sm: 'left' }}
            >
              생산성 향상을 위한 간편한 협업툴
            </Text>

            <Text
              width="100%"
              fontSize={{
                SE: '10px',
                md: '12px',
                lg: '14px',
                xl: '16px',
                xxl: '18px',
              }}
              fontWeight="500"
              color="#24242490"
              className="landingPSubTitle"
              align={{ SE: 'center', sm: 'left' }}
            >
              필요없는 기능으로 복잡해진 협업툴은 그만! 간편하게 다이렉트
              메세지와 채팅, 파일공유 메일을 사용해보세요.
            </Text>
          </Flex>
          <Button
            onClick={handleButtonClick}
            width="45%"
            padding="12px"
            fontSize={{
              SE: '12px',
              md: '14px',
              lg: '14px',
              xl: '16px',
              xxl: '16px',
            }}
            fontWeight="700"
            color="white"
            borderRadius="full"
            bgColor="#575DF8"
          >
            무료로 시작하기
          </Button>
        </StTextBox>

        <StImageBox>
          <img
            src={images[currentImage]}
            alt="메인 툴 이미지"
            width={'880px'}
            height={'600px'}
          />
        </StImageBox>
      </MainSection>
    </StContainer>
  );
};

export default MainHeader;

const StContainer = styled.div`
  width: 100%;
  padding: 80px 12px;
  background-color: #ffffff;
`;

const MainSection = styled.div`
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 8px;
`;

const StTextBox = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 30%;
  padding: 32px 0;
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StImageBox = styled.div`
  img {
    object-fit: cover;
    animation: ${slideAnimation} 1s ease-out;
  }
`;
