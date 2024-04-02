import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { useWorkSpaceMemberListQuery } from '@queries/workSpace/workSpaceMemberList';
import { useLoaderData, useParams } from 'react-router';
import InviteMemberList from '@components/Card/InviteMemberCard';
import { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { joinInGroupChat } from '@apis/chat/groupChat';
import { useMemberNotInGroupQuery } from '../../../queries/groupChat.js/useMemberNotInGroup';

const InviteMemberModal = ({ isOpen, onClose }) => {
  const [selectedList, setSelectedList] = useState([]);
  const { chatRoomInfo } = useLoaderData();
  const { memberList: groupMemberList } = chatRoomInfo;
  const { workSpaceId, roomId } = useParams();

  const { data: test, isSuccess } = useMemberNotInGroupQuery(
    workSpaceId,
    roomId
  );
  console.log(test);
  const { memberList: workSpaceMemberList, isSuccess: memberListIsSuccess } =
    useWorkSpaceMemberListQuery(workSpaceId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'20px'} fontWeight={500}>
          대화 상대 초대
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            height={'50vh'}
            overflowY={'scroll'}
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
            {
              // isSuccess &&
              memberListIsSuccess &&
              workSpaceMemberList.filter((item) => {
                return !groupMemberList.includes(item.id);
              }).length !== 0 ? (
                workSpaceMemberList
                  .filter((item) => {
                    return !groupMemberList.includes(item.id);
                  })
                  .map((member) => {
                    return (
                      <InviteMemberList
                        key={member.email}
                        id={member.id}
                        name={member.name}
                        onClose={onClose}
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                      />
                    );
                  })
              ) : (
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'50vh'}
                >
                  <Text
                    fontSize={'16px'}
                    color={'grey.400'}
                    textAlign={'center'}
                  >
                    초대할 멤버가 없습니다
                  </Text>
                </Flex>
              )
            }
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            width={'100%'}
            colorScheme="secondary"
            isDisabled={selectedList.length === 0}
            onClick={() => {
              joinInGroupChat(chatRoomInfo.channelId, selectedList).then(() => {
                onClose();
                setSelectedList([]);
              });
            }}
          >
            초대하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteMemberModal;
