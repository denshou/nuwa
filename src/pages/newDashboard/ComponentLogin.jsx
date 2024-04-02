import { useState, useEffect } from 'react';
import BorderCircle from '@assets/border_circle.svg';
import { Box, Image, Text, Button, Flex, Avatar } from '@chakra-ui/react';
import ProfileModal from '@components/Modal/ProfileEdit/index.jsx';
import useModal from '@hooks/useModal';
import { useParams } from 'react-router-dom';
import { userProfile } from '@apis/dashboard/userProfile';
import styled from 'styled-components';
import { phoneNumberMask } from '../../components/Form/PhoneNumberInput';
import { useWorkspaceUserProfileQuery } from '../../queries/workspaceProfile';
const ComponentLogin = () => {
  const { workSpaceId } = useParams();
  // const [userInfo, setUserInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useModal();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const data = await userProfile(workSpaceId);
  //       if (data.status === 'success') {
  //         setUserInfo({
  //           image: data.data.image,
  //           // 'https://search.pstatic.net/sunny/?src=http%3A%2F%2Fthumbnail.10x10.co.kr%2Fwebimage%2Fimage%2Fadd2_600%2F141%2FA001410223_02.jpg%3Fcmd%3Dthumb%26w%3D500%26h%3D500%26fit%3Dtrue%26ws%3Dfalse&type=sc960_832', // 이미지가 없는 경우 대체 이미지 사용
  //           name: data.data.name,
  //           job: data.data.job,
  //           email: data.data.email,
  //           phone: data.data.phoneNumber,
  //           status: data.data.status,
  //         });
  //       } else {
  //         throw new Error('프로필 정보를 불러올 수 없습니다.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [workSpaceId]);

  const {
    data: userInfo,
    refetch: refetchUserProfile,
    isSuccess,
  } = useWorkspaceUserProfileQuery(workSpaceId);

  const handleProfileSave = (updatedProfile) => {
    // setUserInfo(updatedProfile);
    onClose();
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      flexFlow={'column'}
      height={'100%'}
      align={'center'}
      justify={'space-around'}
      py={'0.3rem'}
    >
      {isSuccess && (
        <>
          <Avatar
            borderRadius="full"
            size="xl"
            src={userInfo.image}
            alt=""
            border={'2px solid #d9d9d9'}
            name={userInfo.name}
          />
          <Text fontSize="18px" fontWeight={'700'}>
            {userInfo.name}
          </Text>
          <Text fontSize="14px" fontWeight={'500'} color={'#656565'}>
            {userInfo.job || '직무를 입력하세요'}
          </Text>
          <Text fontSize="12px" fontWeight={'500'} color={'#656565'}>
            {userInfo.email}
          </Text>
          <Text fontSize="12px" fontWeight={'500'} color={'#656565'}>
            {phoneNumberMask(userInfo.phoneNumber)}
          </Text>
          <ProfileButton
            onClick={onOpen}
            fontSize="14px"
            color="white"
            width={'80%'}
          >
            프로필 편집
          </ProfileButton>
          <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            profile={userInfo}
            onSave={handleProfileSave}
          />
        </>
      )}
    </Flex>
  );
};

export default ComponentLogin;

const ProfileButton = styled.div`
  cursor: pointer;
  background-color: #575df8;
  font-size: 14px;
  color: white;
  font-weight: bold;
  padding: 10px 30px;
  border-radius: 10px;
`;
