import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Box, Divider } from '@chakra-ui/react';
import OutletSearchBar from '@components/SearchBar/OutletSearchBar';
import GreySort from '@components/Button/GreySort';
const FindChannel = () => {
  return (
    <StContainer>
      <Text fontSize={'20px'} fontWeight={'700'}>
        전체 채널 조회
      </Text>

      <OutletSearchBar />

      <Flex justify={'space-between'} gap={'10px'}>
        <Box display={'flex'} gap={'10px'}>
          <GreySort label="모든 채널" />
          <GreySort label="모든 채널 유형" />
        </Box>

        <GreySort label="최신 채널 순" />
      </Flex>

      <DataSection>
        <Box
          cursor={'pointer'}
          height={'auto'}
          padding={'10px'}
          borderBottom={'1px solid #D9D9D9'}
          display={'flex'}
          alignItems={'center'}
        >
          <Box>
            <Text fontWeight={'500'}># be회의실</Text>

            <Flex>
              <Text fontSize={'12px'} color={''}>
                공개채널
              </Text>
              <Text fontSize={'12px'}>
                ㆍ<span>10</span>명의 멤버
              </Text>
            </Flex>
          </Box>
        </Box>
      </DataSection>
    </StContainer>
  );
};

export default FindChannel;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  padding: 50px;
`;

const DataSection = styled.div`
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
`;
