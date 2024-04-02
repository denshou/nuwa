import { request } from '@apis/axios/axios';

// 알림 조회 API 로직을 별도의 함수로 정의
export const fetchAlarms = async (
  workSpaceId,
  { page = 0, size = 10, sortBy = 'createdAt', sortOrder = 'asc' }
) => {
  try {
    const response = await request.get(`/notification/v2/${workSpaceId}`, {
      params: {
        page,
        size,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('알람 조회 요청에서 에러(get):', error);
    throw error;
  }
};

//알림 patch api (알림 읽음 여부 확인)
export const markNotificationsAsRead = async (notificationIdList) => {
  try {
    const response = await request.patch('/notification/read/v2', {
      notificationIdList,
    });
    return response.data;
  } catch (error) {
    console.error('알람읽음 확인 요청에서 에러(patch):', error);
    throw error;
  }
};

export const readAllNotification = (workSpaceId) => {
  return request.patch(`notification/read/all/${workSpaceId}`);
};
