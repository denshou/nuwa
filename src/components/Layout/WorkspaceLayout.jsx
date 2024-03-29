import {
  Box,
  Flex,
  Text,
  Spinner,
  useToast,
  CloseButton,
} from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import WorkspaceHeader from '@components/Header/WorkspaceHeader.jsx';
import useAuthGuard from '@hooks/auth/useAuthGuard';
import { Fragment, useEffect, useState } from 'react';
import useWorkspaceMemberGuard from '@hooks/auth/useWorkspaceMemberGuard';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/auth';

const WorkspaceLayout = () => {
  const { isAuthChecked } = useAuthGuard();
  const { isMemberChecked } = useWorkspaceMemberGuard(isAuthChecked);
  const { workSpaceId } = useParams();
  const email = jwtDecode(getToken()).sub;
  const [alarmList, setAlarmList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const address = `${import.meta.env.VITE_SERVER_ADDRESS}/notification`;
    const params = `?email=${email}&workSpaceId=${workSpaceId}`;
    const eventSource = new EventSource(address + params);

    // JSON 형식인지 검사하는 함수
    function isValidJSON(text) {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    }

    const testHandler = (e) => {
      console.log('데이터확인: ', e.data);
      if (isValidJSON(e.data)) {
        const data = JSON.parse(e.data);

        let title = '타입이 지정되지 않은 알림';
        let description = '지정되지 않은 타입 에러';

        switch (data.notificationType) {
          case 'DIRECT':
            description = `${data.notificationSenderName}님의 다이렉트 메세지`;
            title = `${data.notificationContent}`;
            break;
          case 'CHAT':
            description = `${data.notificationContent}`;
            title = `그룹채팅의 알림이 도착하였습니다.`;
            break;
          case 'CANVAS':
            title = `새로운 캔버스가 생성되었습니다.`;
            description = `${data.notificationContent}`;
            break;
          case 'NOTICE':
            title = `사용자 권한이 변경되었습니다.`;
            description = `${data.notificationContent}`;
            break;
        }

        const toastId = `alarm-toast-${data.notificationId}`;
        toast.closeAll(); // 새 토스트를 표시하기 전에 모든 현재 토스트를 닫음
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            isClosable: true,
            position: 'top-right',
            render: ({ onClose }) => (
              <Box
                p={3}
                bg="#575DFB"
                borderRadius="lg"
                color="white"
                boxShadow="md"
              >
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={onClose}
                />
                <Text fontWeight="bold" fontSize={'16px'} mb={'10px'}>
                  {title}
                </Text>
                <Text mt={2} fontSize={'14px'}>
                  {description}
                </Text>
              </Box>
            ),
          });
        }
      } else {
        console.log('초기알림:', e.data);
      }
    };

    eventSource.addEventListener('sse', testHandler);

    eventSource.onmessage = function (event) {
      console.log('Received message: ', event.data);
      setAlarmList((prev) => [...prev, event.data]);
    };
    eventSource.onerror = function (error) {
      console.error('EventSource failed:', error);
    };

    return () => {
      console.log('SERVER SENT EVENT CLOSE');
      eventSource.close();
    };
  }, [toast, workSpaceId]);

  return (
    <Fragment>
      {isAuthChecked && isMemberChecked ? (
        <Box h="100vh" overflowX="hidden">
          <WorkspaceHeader />
          <Flex h="calc(100% - 60px)">
            <SideBar />
            <Outlet context={{ alarmList }} />
          </Flex>
        </Box>
      ) : (
        <Flex
          h="100vh"
          overflowX="hidden"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner
            thickness="10px"
            speed="0.5s"
            emptyColor="gray.200"
            color="secondary.500"
            width={'200px'}
            height={'200px'}
          />
        </Flex>
      )}
    </Fragment>
  );
};

export default WorkspaceLayout;
