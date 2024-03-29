import styled from 'styled-components';
import { Flex, Text, Button } from '@chakra-ui/react';
import FeatCard from './FeatCard';
import circle_arrow from '@assets/circle_arrow.png';
import { SELECT_FEAT_INFO } from '@constants/selectPlan/SELECT_FEAT_INFO';
import useFreeTrialRedirect from '../../hooks/auth/useFreeTrialRedirect';

const FeatCenter = () => {
  const { handleButtonClick } = useFreeTrialRedirect();
  return (
    <StContainer>
      <FeatSection>
        <StTextBox>
          <Flex flexDirection="column" gap="15px">
            <Text
              width="100%"
              fontSize={{ SE: '22px', sm: '28px', md: '38px', lg: '42px' }}
              fontWeight="700"
            >
              NUWA 협업툴의 주요기능은
              <br />
              무엇인가요?
            </Text>

            <Text
              width="100%"
              fontSize={{ SE: '12px', sm: '16px', md: '18px', lg: '20px' }}
              fontWeight="700"
              color="#AFAFAF"
            >
              NUWA의 모든 사람과 모든 것을 위한 회사의 구심점이자 회사가 더 많은
              것들을 이룰 수 있는 생산성 플랫폼입니다.
            </Text>
          </Flex>

          <Button
            width="30%"
            fontSize={{ SE: '12px', sm: '12px', md: '14px', lg: '16px' }}
            fontWeight="700"
            color="white"
            borderRadius="full"
            bgColor="#575DFB"
            onClick={handleButtonClick}
          >
            무료로 시작하기
          </Button>
        </StTextBox>
        <Flex flexDirection={'column'} width={'45%'} gap={'72px'}>
          {SELECT_FEAT_INFO.map((card, index) => (
            <FeatCard
              key={index}
              index={index}
              backgroudImage={card.Image}
              mainText={card.HeaderText}
              icon={circle_arrow}
              subText={card.SubText}
              detailText={card.TextLink}
            />
          ))}
        </Flex>
      </FeatSection>
    </StContainer>
  );
};

export default FeatCenter;

const StContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 80px 12px;
  align-items: center;
  justify-content: center;
`;

const FeatSection = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 79px;
`;

const StTextBox = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 72px;
  position: sticky;
  top: 10vh;
`;
