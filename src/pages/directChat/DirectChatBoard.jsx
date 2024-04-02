import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';

import { useDirectChatRoomListQuery } from '@queries/chat/useDirectChatRoomList';
import DirectChatHeaderIcon from '@components/Icon/DirectChatHeaderIcon';
import useBoundStore from '@store/store';
import ChatPreviewBox from '../chatBoard/ChatPreviewBox';

import { useNavigate, useParams } from 'react-router-dom';

const DirectChatBoard = () => {
  const { setIsDirectChatBoxExpand, setMessageIndex } = useBoundStore();
  const { workSpaceId } = useParams();
  const navigate = useNavigate();
  const {
    data: chatList,
    isFetching,
    isSuccess,
    refetch,
  } = useDirectChatRoomListQuery(workSpaceId);
  return (
    <Stack flex={2} px={'1rem'} py={'1rem'}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottom={'1px'}
        borderColor={'grey.300'}
      >
        <Text fontWeight={700} fontSize={'20px'}>
          채팅목록
        </Text>
        <Flex alignItems={'center'}>
          <DirectChatHeaderIcon
            icon={
              <RepeatIcon
                size={'1.25rem'}
                onClick={() => {
                  refetch();
                }}
              />
            }
          />
          <DirectChatHeaderIcon
            icon={
              <CloseIcon
                size={'1.25rem'}
                onClick={() => {
                  setIsDirectChatBoxExpand(true);
                }}
              />
            }
          />
        </Flex>
      </Flex>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'0.5rem'}
        overflowY={'scroll'}
      >
        {isFetching ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'50vh'}
          >
            <Spinner
              thickness="10px"
              speed="0.5s"
              emptyColor="gray.200"
              color="secondary.500"
              width={'200px'}
              height={'200px'}
            />
          </Box>
        ) : isSuccess && chatList.length !== 0 ? (
          chatList.map((chat) => {
            return (
              <ChatPreviewBox
                key={chat.roomId}
                messageCreatedAt={chat.messageCreatedAt}
                lastMessage={chat.lastMessage}
                unReadCount={chat.unReadCount}
                joinMemberName={chat.joinMemberName}
                createMemberName={chat.createMemberName}
                roomId={chat.roomId}
                createMemberId={chat.createMemberId}
                joinMemberId={chat.joinMemberId}
                onClick={() => {
                  setMessageIndex(0);
                  navigate(
                    `/workspace/${workSpaceId}/direct-chat/${chat.roomId}`
                  );
                }}
              />
            );
          })
        ) : (
          <Flex justifyContent={'center'} alignItems={'center'} height={'50vh'}>
            <Text fontSize={'20px'} color={'grey.400'}>
              기록이 없습니다. 대화를 시작해보세요!
            </Text>
          </Flex>
        )}
      </Box>
    </Stack>
  );
};

export default DirectChatBoard;
