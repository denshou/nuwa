import { Flex, Box, Text, Avatar, Image } from '@chakra-ui/react';
import StateModal from '@components/Modal/StateModal';
import useModal from '@hooks/useModal';
import { useParams } from 'react-router-dom';
import { state_seticon } from '@constants/selectPlan/SELECT_STATE_INFO';
import { useWorkspaceUserProfileQuery } from '../../queries/workspaceProfile';

const UserInfo = () => {
  const { workSpaceId } = useParams();
  const { isOpen, onOpen, onClose } = useModal();

  const {
    data: profileData,
    refetch: refetchUserProfile,
    isSuccess,
  } = useWorkspaceUserProfileQuery(workSpaceId);

  // console.log(profileData);
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        m="10px 0"
        position="relative"
      >
        {isSuccess && (
          <>
            <Flex
              justify="center"
              align="center"
              w="150px"
              h="150px"
              border="2px solid #3361ff"
              borderRight="2px solid #DADEE6"
              borderRadius="70%"
              m="10px"
            >
              <Avatar
                size="2xl"
                src={profileData.image !== 'N' ? profileData.image : undefined}
                position={'relative'}
                name={profileData.name}
              >
                <Box
                  w="30px"
                  h="30px"
                  fontSize="12px"
                  fontWeight="900"
                  color="white"
                  backgroundColor="#D9D9D9"
                  border={'2px solid #3361ff'}
                  borderRadius="70%"
                  lineHeight="30px"
                  position="absolute"
                  zIndex="10"
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  right={'-4px'}
                  bottom={'-4px'}
                >
                  <Image
                    src={
                      state_seticon.filter(
                        (item) => item.title === profileData.status
                      )[0].icon
                    }
                    alt=""
                    m="0 3px"
                    boxSize={'14px'}
                  />
                </Box>
              </Avatar>
            </Flex>
            <Box m="13px 0">
              <Text fontSize="16px" fontWeight="900" color="#656565">
                {profileData.name}
              </Text>
              <Text fontSize="14px" fontWeight="500" color="#656565">
                {profileData.email}
              </Text>
            </Box>
            <Flex
              fontSize="14px"
              fontWeight="500"
              color="#898989"
              cursor={'pointer'}
              onClick={onOpen}
              align={'center'}
              justify="center"
            >
              <Image
                src={
                  state_seticon.filter(
                    (item) => item.title === profileData.status
                  )[0].icon
                }
                alt=""
                m="0 3px"
                boxSize={'14px'}
              />
              {profileData.status}
            </Flex>
          </>
        )}
      </Flex>
      <StateModal
        isOpen={isOpen}
        onClose={onClose}
        workSpaceId={workSpaceId}
        refetchUserProfile={refetchUserProfile}
      />
    </>
  );
};

export default UserInfo;

// const [userProfile, setUserProfile] = useState({});

// useEffect(() => {
//   const getUserProfile = async () => {
//     try {
//       const response = await getProfile(workSpaceId);
//       setUserProfile(response.data);
//       console.log('데이터가 성공적으로 들어왔습니다.', response.data);
//     } catch (error) {
//       console.error('프로필 정보를 가져오는데 실패했습니다:', error);
//     }
//   };
//   getUserProfile();
// }, [workSpaceId]);

// const [userProfile, setUserProfile] = useState({});

// useEffect(() => {
//   const getUserProfile = async () => {
//     try {
//       const response = await getProfile(workSpaceId);
//       setUserProfile(response.data);
//       console.log('데이터가 성공적으로 들어왔습니다.', response.data);
//     } catch (error) {
//       console.error('프로필 정보를 가져오는데 실패했습니다:', error);
//     }
//   };
//   getUserProfile();
// }, [workSpaceId]);

// console.log('eeeeeee', data);
// const {
//   isLoading,
//   error,
//   data,
//   refetch: refetchUserProfile,
// } = useQuery({
//   queryKey: ['userProfile', workSpaceId],
//   queryFn: () => getProfile(workSpaceId),
//   select: (response) => ({
//     ...response.data,
//     status: response.data.status ?? '현재 활동 중',
//   }),
//   enabled: !!workSpaceId,
// });
// console.log({ profileData });
// const userProfile = profileData ? profileData : { image: undefined };

// const StatusIcon = state_seticon.filter(
// (status) => status.title === userProfile.status
// );
// console.log('status icon', StatusIcon);
// const userStatus = userProfile ? userProfile.status : '현재 활동 중';
