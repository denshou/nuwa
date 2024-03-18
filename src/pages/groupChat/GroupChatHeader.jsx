import { Flex, Text } from '@chakra-ui/react';
import GroupChatMenu from '@components/Menu/GroupChatMenu';

const GroupChatHeader = ({ groupChatName }) => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} padding={'0.5rem'}>
      <Flex gap={'0.5rem'} alignItems={'center'}>
        <Text fontSize={'16px'} fontWeight={700} color={'#6b7a99'}>
          groupChatName
        </Text>
        <GroupChatMenu />
      </Flex>
    </Flex>
  );
};

export default GroupChatHeader;
