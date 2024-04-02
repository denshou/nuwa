import { Flex, Grid, GridItem, Text, Box } from '@chakra-ui/react';
import styled from 'styled-components';
import Logo from '@components/Image/Logo';
import { footer_categories } from '@constants/selectPlan/SELECT_ALL_INFO';
const Footer = () => {
  return (
    <StContainer>
      <Flex
        flexDirection={'column'}
        justify={'center'}
        align={'flex-start'}
        width={'1440px'}
      >
        <FooterCols className="FooterCols">
          <Logo width={'140px'} height={'fit-content'} className="FooterLogo" />
          <FooterFlexWrap className="FooterWrap">
            {footer_categories.map((footer_category, index) => (
              <Flex
                key={index}
                flexFlow={'column'}
                fontSize={'14px'}
                color={'#666'}
                gap={'12px'}
                mr={{
                  SE: '0px',
                  sm: '50px',
                }}
              >
                <Text>{footer_category.text1}</Text>
                <Text>{footer_category.text2}</Text>
                <Text>{footer_category.text3}</Text>
                <Text>{footer_category.text4}</Text>
                <Text>{footer_category.text5}</Text>
                <Text>{footer_category.text6}</Text>
              </Flex>
            ))}
          </FooterFlexWrap>
        </FooterCols>

        <Box
          width={'100%'}
          padding={'40px 0px'}
          display={'flex'}
          gap={'20px'}
          fontSize={'12px'}
          fontWeight={'700'}
          borderTop={'1px solid #00000010'}
          color={'#666'}
        >
          <Text>상태</Text>
          <Text>개인 정보 보호</Text>
          <Text>약관</Text>
          <Text>귀하의 개인정보 보호선택</Text>
          <Text>쿠키기본설정</Text>
          <Text>문의하기</Text>
        </Box>
      </Flex>
    </StContainer>
  );
};

export default Footer;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 60px 12px;
  border-top: 1px solid #00000010;
  margin: 0 auto;
`;

const FooterCols = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const FooterFlexWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 50%;
  justify-content: space-between;
`;
const FooterFlexItems = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 14px;
  color: #666;
  gap: 12px;
  margin-right: 50px;
`;
