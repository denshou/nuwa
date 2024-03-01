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
import Files from '@pages/sidebar_link/Files';
import WorkAccess from '@pages/workAccess';
import SocialSignupRedirect from '@pages/signupSocial/SocialSignupRedirect';
import SocialLoginRedirect from '@pages/signupSocial/SocialLoginRedirect';
import FAQ from '@pages/FAQ';
import Inquiry from '@pages/Inquiry';
import HelpDesk from '@pages/HelpDesk';
import MainLayout from '@components/Layout/MainLayout';
import WorkspaceLayout from '@components/Layout/WorkspaceLayout';
import InviteMember from '@pages/createWorkspace/create/inviteMember';
import ChatPage from '../pages/chatBoard';
import DirectChatPage from '../pages/directChat';
import DashBoard from '@pages/dashboard';
import Canvas from '@pages/canvas';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          { path: '*', element: <NotFoundPage /> },
          {
            path: 'login',
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
        path: '/workspace/:workspaceId',
        element: <WorkspaceLayout />,
        children: [
          {
            element: <DashBoard />,
            index: true,
          },
          {
            path: '/workspace/:workspaceId/chatboard',
            element: <ChatPage />,
          },
          {
            path: '/workspace/:workspaceId/direct-chat',
            element: <DirectChatPage />,
          },
          {
            path: '/workspace/:workspaceId/canvas',
            element: <Canvas />,
          },
          { path: '/workspace/:workspaceId/files', element: <Files /> },
        ],
      },
    ],
  },
]);