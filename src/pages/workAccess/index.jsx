import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWorkspace } from '../../apis/workspace/workAccess';
import styled from 'styled-components';
import { Flex, Text, Button } from '@chakra-ui/react';
import WorkspaceCard from './WorkspaceCard';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '@utils/auth';
import useSmallScreenGuard from '../../hooks/useSmallScreenGuard';
//import { workspace_section } from '@constants/selectPlan/SELECT_ALL_INFO';

const WorkAccess = () => {
  useSmallScreenGuard();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();
  const decoded = jwtDecode(token);
  const emailSlice = decoded.sub.split('@')[0];

  useEffect(() => {
    const initWorkspaces = async () => {
      try {
        const data = await fetchWorkspace();
        setWorkspaces(data);
      } catch (error) {
        console.error(
          '워크스페이스 정보를 불러오는 중 오류가 발생했습니다',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    initWorkspaces();
  }, []);

  if (loading) {
    return <div> 로딩 중</div>;
  }

  return (
    <StContainer>
      <WorkspaceContainer>
        <Flex
          flexDirection={'column'}
          gap={'20px'}
          justify={'center'}
          align={'center'}
        >
          <Text width="100%" fontSize="48px" fontWeight="600" color="#575DF8">
            환영합니다!
          </Text>
          <Text
            width="100%"
            fontSize="22px"
            fontWeight="200"
            marginBottom={'10px'}
          >
            {`${emailSlice}님의 워크스페이스`}
          </Text>
        </Flex>
        <WorkspaceCard workspace_section={workspaces} />

        <Flex flexDirection={'column'} marginTop={'10px'}>
          <Text width="100%" fontSize="20px" fontWeight="200">
            다른 이메일로{' '}
            <Link to="/login" style={{ color: '#575DF8' }}>
              로그인
            </Link>
          </Text>
        </Flex>
      </WorkspaceContainer>
    </StContainer>
  );
};

export default WorkAccess;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const WorkspaceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px;
`;
