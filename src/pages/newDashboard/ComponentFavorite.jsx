import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, Text, Flex, IconButton, Avatar } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import AddUserIcon from '@assets/adduser_icon.svg';
import FavoriteCallIcon from '@assets/d_greencall.svg';
import FavoriteMessageIcon from '@assets/d_basecolor_message.svg';
import FavoriteCancelIcon from '@assets/d_red_cancel.svg';
import { useParams } from 'react-router-dom';
import { favoriteMembers } from '@apis/dashboard/favoriteMembers';
import { phoneNumberMask } from '../../components/Form/PhoneNumberInput';

const ComponentFavorite = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const { workSpaceId } = useParams();
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const loadFavoriteTeamMembers = async () => {
      try {
        const response = await favoriteMembers(workSpaceId);
        if (response.data.status === 'success') {
          setTeamMembers([...response.data.data]);
        } else {
          console.error('즐겨찾는 팀원 정보를 불러오는 데 실패했습니다.');
          // console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadFavoriteTeamMembers();
  }, [workSpaceId]);
  return (
    <Box
      width={'100%'}
      height={'100%'}
      border={'1px solid #D9D9D9'}
      borderRadius={'10px'}
      shadow={'md'}
    >
      <Flex
        borderTopRadius={'10px'}
        p={'10px 15px'}
        align={'center'}
        height={'10%'}
        bg={'#F5F5F5'}
        gap={'10px'}
      >
        <Image src={AddUserIcon} />
        <Text fontSize="16px" fontWeight="bold" align={'center'}>
          즐겨찾는 팀원
        </Text>
      </Flex>
      <Flex height={'90%'}>
        {teamMembers.length > 0 ? (
          <>
            {teamMembers.length > 4 && (
              <IconButton
                size={'200px'}
                width={'2rem'}
                aria-label="Scroll left"
                onClick={handleScrollLeft}
                icon={<ArrowLeftIcon />}
                bg="#FFFFFF"
                color="#D6D6D6"
                hover={{ color: '#FFFFFF' }}
              />
            )}
            <Flex
              justify={'space-between'}
              height={'100%'}
              alignItems={'center'}
              gap={'1rem'}
              ref={scrollContainerRef}
              overflowX={'scroll'}
              px={'2rem'}
              css={{
                '&::-webkit-scrollbar': {
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  height: '6px',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '10px',
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {teamMembers.map((member) => (
                <Flex
                  key={member.id}
                  flexFlow={'column'}
                  align={'center'}
                  height={'80%'}
                  minW={'200px'}
                  padding={'auto'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  borderRadius={'12px'}
                  border={'2px solid #D6D6D6'}
                  p={'1rem'}
                >
                  <Avatar
                    name={member.name}
                    src={member.image}
                    border="2px solid #D6D6D6"
                  />
                  <Text fontWeight="bold">{member.name}</Text>
                  <Text fontSize="sm">{member.job || '직무를 입력하세요'}</Text>
                  <Text fontSize="sm">{member.email}</Text>
                  <Text fontSize="sm">
                    {phoneNumberMask(member.phoneNumber)}
                  </Text>
                  <Flex gap={'10px'}>
                    <Image src={FavoriteCallIcon} />
                    <Image src={FavoriteMessageIcon} />
                    <Image src={FavoriteCancelIcon} />
                  </Flex>
                </Flex>
              ))}
            </Flex>
            {teamMembers.length > 4 && (
              <IconButton
                size={'200px'}
                width={'2rem'}
                aria-label="Scroll left"
                onClick={handleScrollRight}
                icon={<ArrowRightIcon />}
                bg="#FFFFFF"
                color="#D6D6D6"
                hover={{ color: '#FFFFFF' }}
              />
            )}
          </>
        ) : (
          <Flex
            width={'100%'}
            height={'90%'}
            align={'center'}
            justify={'center'}
          >
            <Text fontSize="17px">즐겨찾는 팀원이 없습니다.</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ComponentFavorite;
