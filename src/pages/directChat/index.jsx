import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useLoaderData, useParams } from 'react-router-dom';

import DirectChatHeader from './DirectChatHeader';
import MyText from './MyText';
import YourText from './YourText';

import useSocketInit from '@apis/socket/useSocketInit';
import TextEditor from '@components/TextEditorFunctionalComponent/TextEditor';

import { useDirectChatMessageListQuery } from '@queries/workSpace/directChatMessageList';

import useChatBoxScroll from '@hooks/directChat/useChatBoxScroll';
import useChatBoxScrollToBottom from '@hooks/directChat/useChatBoxScrollToBottom';
import DirectChatBoard from './DirectChatBoard';
import useBoundStore from '../../store/store';
import useDeleteDirectChatMessage from './useDeleteDirectChatMessage';
import useUpdateDirectChatMessage from './useUpdateDirectChatMessage';
import { getReceiver } from './utils';
import _ from 'lodash';
import { useDirectChatMessageInfiniteQuery } from '../../queries/workSpace/directChatMessageList';

const DirectChatPage = () => {
  const {
    isDirectChatBoxExpand: isExpand,
    messageIndex,
    setMessageIndex,
    setUploadType,
    uploadType,
  } = useBoundStore();

  useEffect(() => {
    if (uploadType !== 'DIRECT') {
      setUploadType('DIRECT');
    }
  }, []);
  const { chatRoomInfo, userProfile } = useLoaderData();
  const { roomId, workSpaceId } = useParams();

  // define receiver
  let userId = userProfile?.id;
  const { receiverId, receiverName } = getReceiver(userId, chatRoomInfo);

  const pageSize = 10;
  const [fetchedMessage, setFetchedMessage] = useState([]);

  const [totalMessageList, setTotalMessageList] = useState([]);

  const chatBoxRef = useRef(null);

  // const { directChatMessageList, isLoading: directChatMessageListIsLoading } =
  //   useDirectChatMessageListQuery(roomId, messageIndex, pageSize);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useDirectChatMessageInfiniteQuery(roomId, messageIndex, pageSize);

  useEffect(() => {
    const arr = [];
    if (!isLoading) {
      data.pages.map((pageData) => {
        pageData.content.map((body) => {
          body.key = body.messageId;
          arr.push(body);
        });
      });
      setFetchedMessage(arr.reverse());
    }
  }, [data]);

  useChatBoxScrollToBottom(chatBoxRef, fetchedMessage, messageIndex);
  // useEffect(() => {
  //   console.log('eeeeeeeeee total', totalMessageList);
  // }, [totalMessageList]);

  const {
    publish,
    updatePublish,
    socketMessageList,
    setSocketMessageList,
    deleteSocketMessage,
    socketMessageDeleteList,
    setSocketMessageDeleteList,
    socketMessageUpdateList,
    setSocketMessageUpdateList,
  } = useSocketInit(roomId, workSpaceId, receiverId, 'direct');

  useChatBoxScroll(chatBoxRef, socketMessageList);

  useEffect(() => {
    setTotalMessageList(
      _.uniqBy([...fetchedMessage, ...socketMessageList], 'messageId')
    );
  }, [fetchedMessage, roomId]);

  let previousScrollPosition;
  if (chatBoxRef.current) {
    previousScrollPosition = chatBoxRef.current.scrollHeight;
  }
  useEffect(() => {
    let id;

    if (chatBoxRef) {
      const remainScrollHandler = () => {
        chatBoxRef.current.scrollTop =
          chatBoxRef.current.scrollHeight - previousScrollPosition;
      };
      id = setTimeout(remainScrollHandler, 300);
    }
    return () => {
      clearTimeout(id);
    };
  }, [fetchedMessage]);

  useEffect(() => {
    setTotalMessageList([...fetchedMessage, ...socketMessageList]);
  }, [socketMessageList]);

  useDeleteDirectChatMessage({
    socketMessageDeleteList,
    directChatMessageList: fetchedMessage,
    setSocketMessageList,
    setSocketMessageDeleteList,
  });

  useUpdateDirectChatMessage({
    socketMessageUpdateList,
    setSocketMessageList,
    directChatMessageList: fetchedMessage,
    setSocketMessageUpdateList,
  });

  const moreMessageButtonHandler = () => {
    const index = Math.floor(totalMessageList.length / pageSize);
    setMessageIndex(index);
  };
  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [messageIndex]);

  useEffect(() => {
    setSocketMessageList([]);
    setTotalMessageList([]);
    setFetchedMessage([]);
    return () => {
      setMessageIndex(0);
    };
  }, [roomId]);
  console.log('eeeeeeeeeee', fetchedMessage);
  return (
    <Box width="calc(100% - 380px)" px={'0.5rem'} display={'flex'}>
      <Box
        maxW={'100%'}
        display={'flex'}
        flexDirection={'column'}
        gap={'0.25rem'}
        height={'100%'}
        flex={5}
      >
        {
          <>
            <DirectChatHeader receiverName={receiverName} />
            <Box
              flexGrow={1}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              overflowY={'scroll'}
              height={'auto'}
              ref={chatBoxRef}
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
                  backgroundColor: '#d6d6d6',
                },
              }}
            >
              <Flex justifyContent={'center'} pt={'1rem'} pb={'2rem'}>
                <Button
                  onClick={moreMessageButtonHandler}
                  isDisabled={!hasNextPage}
                >
                  더보기
                </Button>
              </Flex>
              {
                !isLoading &&
                  totalMessageList.map((body) => {
                    if (userId === body.senderId) {
                      return (
                        <MyText
                          key={body.key}
                          content={body.content}
                          deleteSocketMessage={deleteSocketMessage}
                          messageId={body.messageId}
                          isDeleted={body.isDeleted}
                          messageType={body.messageType}
                          updatePublish={updatePublish}
                        />
                      );
                    } else {
                      return (
                        <YourText
                          key={body.key}
                          content={body.content}
                          senderName={body.senderName}
                          deleteSocketMessage={deleteSocketMessage}
                          messageId={body.messageId}
                          isDeleted={body.isDeleted}
                          sendedTime={body.createdAt}
                        />
                      );
                    }
                  })
                // totalMessageList.map((body) => {
                //   if (userId === body.senderId) {
                //     return (
                //       <MyText
                //         key={body.messageId}
                //         content={body.content}
                //         deleteSocketMessage={deleteSocketMessage}
                //         messageId={body.messageId}
                //         isDeleted={body.isDeleted}
                //         messageType={body.messageType}
                //         updatePublish={updatePublish}
                //       />
                //     );
                //   } else {
                //     return (
                //       <YourText
                //         key={body.messageId}
                //         content={body.content}
                //         senderName={body.senderName}
                //         deleteSocketMessage={deleteSocketMessage}
                //         messageId={body.messageId}
                //         isDeleted={body.isDeleted}
                //         sendedTime={body.createdAt}
                //       />
                //     );
                //   }
                // })
              }
            </Box>
            <TextEditor publish={publish} channelId={chatRoomInfo.channelId} />
          </>
        }
      </Box>
      {!isExpand && <DirectChatBoard />}
    </Box>
  );
};

export default DirectChatPage;
