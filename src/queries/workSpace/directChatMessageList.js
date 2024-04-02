import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getDirectChatMessageList } from '../../apis/chat/chat';
import { request } from '../../apis/axios/axios';
import InfiniteScroll from 'react-infinite-scroller';
export const useDirectChatMessageListQuery = (roomId, messageIndex, size) => {
  const { data, isLoading } = useQuery({
    queryKey: ['directChatMessageList', roomId],
    queryFn: async () => {
      const response = await getDirectChatMessageList(
        roomId,
        messageIndex,
        size,
        'createAt',
        'asc'
      );
      const data = await response.data.data.content;
      return data.reverse();
    },
  });
  return {
    directChatMessageList: data ? data : [],
    isLoading,
  };
};

export const useDirectChatMessageInfiniteQuery = (
  roomId,
  messageIndex,
  size,
  sortBy = 'createAt',
  sortOrder = 'asc'
) => {
  const fetchUrl = `/message/direct/${roomId}?page=${messageIndex}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ['directChatMessageInfinite', roomId],
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
