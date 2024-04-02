import React, { useState } from 'react';
import {
  IconButton,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Flex,
  Text,
  CloseButton,
  Divider,
  Box,
  Button,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa6';
import AlarmData from '@components/DataBox/AlarmData';
import { useParams } from 'react-router-dom';
import {
  fetchAlarms,
  markNotificationsAsRead,
  readAllNotification,
} from '@apis/alarm/getAlarm';

const Alarm = () => {
  const { workSpaceId } = useParams();
  const [size, setSize] = useState('');
  const [alarmData, setAlarmData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = async (newSize) => {
    setSize(newSize);
    try {
      const response = await fetchAlarms(workSpaceId, {});
      // content에 접근
      const content = response.data?.content || [];
      const groupedData = content.reduce((acc, current) => {
        const date = new Date(current.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(current);
        return acc;
      }, {});
      setAlarmData(groupedData);
    } catch (error) {
      console.error('Error fetching alarms:', error);
    }
    onOpen();
  };

  const handleReadNotification = async (notificationId, type, setIsRead) => {
    if (type !== 'DIRECT' && type !== 'CHAT') {
      try {
        await markNotificationsAsRead([notificationId]);
        console.log('알림 읽음 처리됨', notificationId);
        setIsRead(true);
      } catch (error) {
        console.error('알림 읽음 처리 오류', error);
      }
    }
  };

  const sizes = ['sm'];

  return (
    <>
      {sizes.map((size) => (
        <IconButton
          icon={<FaBell size={'20px'} color="#575DFB" />}
          bgColor={'grey.700'}
          _hover={'grey.700'}
          _active={'grey.700'}
          onClick={() => handleClick(size)}
          key={size}
        />
      ))}

      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerContent>
          <Flex justify={'space-between'} align={'center'} p={'10px 24px'}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              알림
            </Text>
            <Button
              onClick={() => {
                readAllNotification(workSpaceId);
                onClose();
              }}
              fontSize={'sm'}
            >
              모두 읽음 처리
            </Button>
            <CloseButton onClick={onClose} />
          </Flex>
          <Divider orientation="horizontal" mb={'10px'} />
          <DrawerBody display={'flex'} flexFlow={'column'} gap={'10px'}>
            {Object.entries(alarmData).map(([date, alarms]) => (
              <Box key={date}>
                <Text fontSize={'lg'} fontWeight={'bold'} mb={'10px'}>
                  {date}
                </Text>
                {alarms.map((alarm, index) => (
                  <AlarmData
                    key={index}
                    boolean={alarm.isRead}
                    url={alarm.notificationUrl}
                    type={alarm.notificationType}
                    partner={alarm.senderName}
                    count={alarm.contentCount}
                    notificationId={alarm.notificationId}
                    onRead={handleReadNotification}
                    onClose={onClose}
                  />
                ))}
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Alarm;
