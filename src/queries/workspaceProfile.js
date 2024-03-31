import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getWorkspaceUserProfile } from '@apis/workspace/workspaceProfile';
import {
  updateProfile,
  uploadProfileImage,
} from '@apis/dashboard/updateProfile';
export const useWorkspaceUserProfileQuery = (workSpaceId) => {
  const { data, isLoading, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['workspaceUserProfile', workSpaceId],
    queryFn: () => getWorkspaceUserProfile(workSpaceId),
    staleTime: 30 * 60 * 1000,
    select: (response) => {
      return {
        ...response.data.data,
        status: response.data.data.status ?? '현재 활동 중',
      };
    },
  });
  return { data, isLoading, isFetching, isSuccess, refetch };
};

export const useWorkspaceUserProfilePatchMutation = (workSpaceId) => {
  const queryClient = useQueryClient(); // 쿼리 클라이언트 사용

  const { mutateAsync } = useMutation({
    mutationKey: ['workspaceUserProfile', workSpaceId],
    mutationFn: (profileData) => updateProfile(workSpaceId, profileData),
    onSuccess: (_, response) => {
      queryClient.invalidateQueries({
        queryKey: ['workspaceUserProfile', workSpaceId],
      });
      return [_, response];
    },
  });

  return { mutateAsync };
};

// "id": 1,
// "name": "윤철1",
// "job": "직무1",
// "image": "",
// "email": "enjumn@nate.com",
// "phoneNumber": "1111111-1111",
// "workSpaceMemberType": null
