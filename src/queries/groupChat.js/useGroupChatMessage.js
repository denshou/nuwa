import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getGroupChatMessage } from '@apis/chat/groupChat';
import { request } from '../../apis/axios/axios';

export const useGroupChatMessageQuery = (
  chatChannelRoomId,
  messageIndex,
  size
) => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['groupChatMessage', chatChannelRoomId, messageIndex],
    queryFn: async () => {
      const response = await getGroupChatMessage(
        chatChannelRoomId,
        messageIndex,
        size
      );
      const data = await response.data.data.content;
      return data;
    },
  });
  return { data: data ? data : [], isFetching, isSuccess };
};

export const useGroupChatMessageInfiniteQuery = (
  roomId,
  messageIndex,
  size,
  sortBy = 'createAt',
  sortOrder = 'asc'
) => {
  const fetchUrl = `/message/chat/${roomId}?page=${messageIndex}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ['groupChatMessageInfinite', roomId],
      queryFn: ({ pageParam = fetchUrl }) =>
        request.get(pageParam).then((r) => r.data.data),
      getNextPageParam: (lastPage) => {
        if (lastPage?.last) {
          return undefined;
        } else {
          return fetchUrl;
        }
      },
    });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  };
};
