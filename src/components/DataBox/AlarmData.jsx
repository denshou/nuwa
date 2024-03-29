import { useState } from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import DirectMessage from '@assets/chat.svg';
import Chat from '@assets/direct_message.svg';
import Canvas from '@assets/white_canvas.svg';
import Todo from '@assets/todo.svg';
import { useNavigate, useParams } from 'react-router-dom';

const getIcon = (type) => {
  switch (type) {
    case 'DIRECT':
      return DirectMessage;
    case 'CANVAS':
      return Canvas;
    case 'TODO':
      return Todo;
    case 'CHAT':
      return Chat;
    default:
      return null;
  }
};

const getMessage = (type, partner, count) => {
  const messages = {
    DIRECT: `${partner}님에게 ${count}개의 메세지가 도착하였습니다.`,
    CANVAS: '새로운 캔버스가 생성되었습니다.',
    TODO: '새로운 투두리스트가 생성되었습니다.',
    CHAT: `그룹채팅에 ${partner}님이 새로운 메세지를 작성하였습니다.`,
  };

  return messages[type] || '알 수 없는 타입이 생성되었습니다.';
};

const AlarmData = ({
  boolean,
  url,
  type,
  partner,
  count,
  onRead,
  notificationId,
  onClose,
}) => {
  const { workSpaceId } = useParams();
  const navigate = useNavigate();
  const Icon = getIcon(type);
  const message = getMessage(type, partner, count);
  const [isRead, setIsRead] = useState(boolean);
  const confirmationMessage = boolean ? '확인' : '미확인';

  const handleClick = () => {
    onClose();
    navigate(`/workspace/${workSpaceId}${url}`);

    onRead(notificationId, type, setIsRead);
  };

  return (
    <>
      <Box
        display={'flex'}
        mb={'10px'}
        border={'2px solid #D9D9D9'}
        padding={'12px'}
        borderRadius={'10px'}
        alignItems={'center'}
        cursor={'pointer'}
        transition={'transform 0.1s ease-in-out'}
        _hover={{
          borderColor: '#7c80f9',
        }}
        _active={{
          transform: 'scale(0.98)',
        }}
        onClick={handleClick}
      >
        <Flex gap={'10px'}>
          <Box
            display={'flex'}
            boxSize={'42px'}
            borderRadius={'8px'}
            bgColor={'#7c80f9'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image src={Icon} alt={`${type} 아이콘`} w="24px" h="24px" />
          </Box>
          <Flex flexFlow={'column'} justify={'center'} gap={'5px'}>
            <Text fontSize={'14px'} fontWeight={'700'}>
              {message}
            </Text>
            <Text fontSize={'12px'} fontWeight={'500'}>
              {confirmationMessage}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default AlarmData;
