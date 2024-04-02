import { useState } from 'react';

import {
  Button,
  IconButton,
  Flex,
  Box,
  Text,
  Image,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import CreateChannel from '../Channel/CreateChannelModal';

import arrowdown from '../../assets/arrowdown.svg';
import chat_ch from '../../assets/chat_ch.svg';
import voice_ch from '../../assets/voice_ch.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupChatListQuery } from '@queries/groupChat.js/useGroupChatList';
import useBoundStore from '../../store/store';

const ChatChannel = ({ type }) => {
  const navigate = useNavigate();
  const { workSpaceId } = useParams();
  const [channelHidden, setChannelHidden] = useState(false);
  const handleChange = () => {
    setChannelHidden((prev) => !prev);
  };
  const setMessageIndex = useBoundStore((state) => state.setMessageIndex);
  const {
    data: chatChList,
    isSuccess,
    isFetching,
  } = useGroupChatListQuery(workSpaceId);
  return (
    <Box m="20px 0">
      <Flex
        fontSize="16px"
        fontWeight="600"
        color="#656565"
        position="relative"
        mb="8px"
        pl="12px"
        align={'center'}
      >
        <IconButton
          size="xs"
          bgColor="#f1f1f1"
          icon={
            <Image
              src={arrowdown}
              transform={channelHidden ? 'rotate(-90deg)' : ''}
              transition="all 0.1s ease-out"
              alt=""
            />
          }
          onClick={handleChange}
        />
        {type === 'chat' && <Text ml="16px">채팅채널</Text>}
        {type === 'voice' && <Text ml="16px">음성채널</Text>}
        <CreateChannel />
      </Flex>
      {!channelHidden && (
        <Box
          maxH="160px"
          overflowY="auto"
          mr="7px"
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
              backgroundColor: '#FCFCFC',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              backgroundColor: '#7A7A7A',
            },
          }}
        >
          {isFetching ? (
            <Stack maxH={'160px'} spacing={'4px'}>
              <ChannelSkelton />
              <ChannelSkelton />
              <ChannelSkelton />
              <ChannelSkelton />
            </Stack>
          ) : (
            isSuccess &&
            chatChList.map((x, index) => (
              <Button
                key={index}
                fontSize="14px"
                fontWeight="500"
                color="#656565"
                width="100%"
                justifyContent="flex-start"
                backgroundColor="#f1f1f1"
                onClick={() => {
                  setMessageIndex(0);
                  navigate(`/workspace/${workSpaceId}/groupChat/${x.roomId}`);
                }}
              >
                {type === 'chat' && (
                  <Image src={chat_ch} alt="" w="20px" h="21px" mr="20px" />
                )}
                {type === 'voice' && (
                  <Image src={voice_ch} alt="" w="20px" h="21px" mr="20px" />
                )}

                {x.name}
              </Button>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default ChatChannel;

const ChannelSkelton = () => {
  return (
    <Skeleton rounded={'lg'} mr={'7px'} bg={'gray.50'}>
      <Button
        fontSize="12px"
        fontWeight="500"
        color="#656565"
        width="100%"
        justifyContent="flex-start"
        backgroundColor="#f1f1f1"
      ></Button>
    </Skeleton>
  );
};
