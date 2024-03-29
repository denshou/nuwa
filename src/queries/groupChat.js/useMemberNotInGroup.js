import { useQuery } from '@tanstack/react-query';
import { getGroupMemberNotInGroup } from '../../apis/chat/groupChat';

export const useMemberNotInGroupQuery = (workSpaceId, roomId) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['memberNotInGroupChat', roomId],
    queryFn: () => {
      return getGroupMemberNotInGroup(workSpaceId, roomId).then(
        (r) => r.data.data
      );
    },
  });

  return { data, isSuccess };
};
