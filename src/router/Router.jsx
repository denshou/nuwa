import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '@pages/not_found/NotFoundPage';
import MainPage from '@pages/main';
import LoginPage from '@pages/login';
import SignupPage from '@pages/signup';
import SelectPlan from '@pages/selectPlan';
import CreateWorkspace from '@pages/createWorkspace';
import Agreement from '@pages/createWorkspace/agreement';
import Create from '@pages/createWorkspace/create';
import CreateWorkSapceName from '@pages/createWorkspace/create/workspaceName';
import UserInfo from '@pages/createWorkspace/create/userInfo';
import Work from '@pages/createWorkspace/create/work';
import SignupSocialPage from '@pages/signupSocial';
import Feature from '@pages/Feature';
import Files from '@pages/files/Files';
import WorkAccess from '@pages/workAccess';
import SocialSignupRedirect from '@pages/signupSocial/SocialSignupRedirect';
import SocialLoginRedirect from '@pages/signupSocial/SocialLoginRedirect';
import FAQ from '@pages/FAQ';
import Inquiry from '@pages/Inquiry';
import HelpDesk from '@pages/HelpDesk';
import MainLayout from '@components/Layout/MainLayout';
import WorkspaceLayout from '@components/Layout/WorkspaceLayout';
import InviteMember from '@pages/createWorkspace/create/inviteMember';
import ChatPage from '@pages/chatBoard';
import DirectChatPage from '@pages/directChat';
import DashBoard from '@pages/newDashboard';
import Canvas from '@pages/canvas';
import JoinMemberPage from '@pages/devJoinMember';
import Todo from '@pages/todo/Todo';
import FindChannel from '@pages/findChannel/FindChannel';
import AddUser from '@pages/addUser/AddUser';

import { getDirectChatRoomInfo } from '@apis/chat/chat';
import { getWorkspaceUserProfile } from '@apis/workspace/workspaceProfile';
import ErrorBoundary from '@components/Error/ErrorBoundary';
import GroupChatPage from '@pages/groupChat';
import { getGroupChatInfo } from '../apis/chat/groupChat';
import InviteRedirectPage from '../pages/inviteRedirect';
import JoinPage from '../pages/inviteJoin';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          { path: '*', element: <NotFoundPage /> },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/signup',
            element: <SignupPage />,
          },
          {
            path: '/signup-social',
            element: <SignupSocialPage />,
          },
          {
            path: '/select-plan',
            element: <SelectPlan />,
          },
          //oauth 회원 가입시 이메일과 provider(kakao,naver) 받는 페이지
          {
            path: '/signup/social',
            element: <SocialSignupRedirect />,
          },
          {
            path: '/loading/auth',
            element: <SocialLoginRedirect />,
          },
          {
            path: '/faq',
            element: <FAQ />,
          },
          {
            path: '/inquiry',
            element: <Inquiry />,
          },
          {
            path: '/feat-description',
            element: <Feature />,
          },
          {
            path: '/workAccess',
            element: <WorkAccess />,
          },
          { path: '/helpdesk', element: <HelpDesk /> },
          {
            path: '/dev/join',
            element: <JoinMemberPage />,
          },
          {
            path: '/api/invite/:inviteCode',
            element: <InviteRedirectPage />,
          },
          {
            path: '/join',
            element: <JoinPage />,
          },
        ],
      },
      {
        path: '/create-workspace',
        element: <CreateWorkspace />,
        children: [
          {
            element: <Create />,
            index: true,
          },
          {
            path: '/create-workspace/agreement',
            element: <Agreement />,
          },
          {
            path: '/create-workspace/workspace-name',
            element: <CreateWorkSapceName />,
          },
          {
            path: '/create-workspace/user-info',
            element: <UserInfo />,
          },
          {
            path: '/create-workspace/work',
            element: <Work />,
          },
          {
            path: '/create-workspace/invite-member',
            element: <InviteMember />,
          },
        ],
      },
      {
        path: '/workspace/:workSpaceId',
        element: <WorkspaceLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            element: <DashBoard />,
            index: true,
          },
          { path: '*', element: <NotFoundPage /> },

          {
            path: '/workspace/:workSpaceId/todo',
            element: <Todo />,
          },
          {
            path: '/workspace/:workSpaceId/chatboard',
            element: <ChatPage />,
          },
          {
            path: '/workspace/:workSpaceId/direct-chat/:roomId',
            element: <DirectChatPage />,
            loader: async ({ params }) => {
              const chatRoomInfo = await getDirectChatRoomInfo(
                params.workSpaceId,
                params.roomId
              ).then((r) => r.data.data);

              const userProfile = await getWorkspaceUserProfile(
                params.workSpaceId
              ).then((r) => r.data.data);
              return { chatRoomInfo, userProfile };
            },
          },
          {
            path: '/workspace/:workSpaceId/canvas',
            element: <Canvas />,
          },
          {
            path: '/workspace/:workSpaceId/findchannel',
            element: <FindChannel />,
          },
          {
            path: '/workspace/:workSpaceId/adduser',
            element: <AddUser />,
            loader: async ({ params }) => {
              const userProfile = await getWorkspaceUserProfile(
                params.workSpaceId
              ).then((r) => r.data.data);
              return { userProfile };
            },
          },
          { path: '/workspace/:workSpaceId/files', element: <Files /> },
          {
            path: '/workspace/:workSpaceId/groupChat/:roomId/',
            element: <GroupChatPage />,
            loader: async ({ params }) => {
              const chatRoomInfo = await getGroupChatInfo(
                params.workSpaceId,
                params.roomId
              ).then((r) => r.data.data);

              const userProfile = await getWorkspaceUserProfile(
                params.workSpaceId
              ).then((r) => r.data.data);

              const isGroupMember = chatRoomInfo.memberList.includes(
                userProfile.id
              );
              return {
                userProfile,
                chatRoomInfo,
                isGroupMember,
              };
            },
          },
        ],
      },
    ],
  },
]);
