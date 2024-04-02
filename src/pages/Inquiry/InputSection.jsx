import React, { useState } from 'react';
import styled from 'styled-components';
import CustomInput from '@components/Input/CustomInput';
import {
  Flex,
  Button,
  Checkbox,
  Text,
  Center,
  Textarea,
} from '@chakra-ui/react';

const InputSection = ({ onSendInquiry }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inquiryData = Object.fromEntries(formData);
    onSendInquiry(inquiryData);
  };

  return (
    <StContainer onSubmit={handleSubmit}>
      <Flex gap={'24px'}>
        <CustomInput name="name" width="100%" placeholder="이름" />
        <CustomInput name="phoneNumber" width="100%" placeholder="전화번호" />
      </Flex>

      <Flex gap={'24px'} flexDirection={'column'}>
        <CustomInput name="email" width="100%" placeholder="이메일" />
        <CustomInput
          name="countryRegion"
          width="100%"
          placeholder="국가/지역"
        />
      </Flex>

      <Flex gap={'24px'}>
        <CustomInput name="companyName" width="100%" placeholder="회사명" />
        <CustomInput name="departmentName" width="100%" placeholder="부서명" />
      </Flex>

      <Flex gap={'24px'}>
        <CustomInput name="position" width="100%" placeholder="직책" />
        <CustomInput name="numberOfPeople" width="100%" placeholder="인원수" />
      </Flex>

      <Flex gap={'24px'} margin>
        <Textarea
          name="content"
          width="100%"
          height={'100px'}
          placeholder="문의내용"
          defaultValue=""
          border={'1px solid #ccc'}
          borderRadius="md"
        />
      </Flex>

      <Flex justify={'center'}>
        <Checkbox
          defaultChecked
          sx={{
            '.chakra-checkbox__control': {
              borderWidth: '2px',
              borderColor: 'gray.500',
            },
          }}
        >
          <Text>
            <span style={{ color: '#575DFB' }}> [필수] </span> 요청하신 문의
            내용에 대한 서비스제공을 위해서 필요한 최소한의
            <span style={{ color: '#575DFB' }}>[개인정보] </span>이므로
            동의하여야 서비스를 이용할 수 있습니다.
          </Text>
        </Checkbox>
      </Flex>

      <Button
        marginTop="50px"
        borderRadius={'12px'}
        bg={'#575DFB'}
        _hover={{ bg: '#5055f3' }}
        _active={{ bg: '#5359f6' }}
        width={'100%'}
        padding={'14px 0px'}
        bgColor={'primary400'}
        color={'white'}
        fontSize={'22px'}
        fontWeight={'700'}
        type="submit"
      >
        문의하기
      </Button>
    </StContainer>
  );
};

export default InputSection;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 80%;
`;
