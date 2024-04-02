import { Flex, Box, Text, Grid, Avatar } from '@chakra-ui/react';
import styled from 'styled-components';
import MemberIcon from './MemberIcon';
import { Link } from 'react-router-dom';
import imageMain from '@assets/nuwaWorkSpace.png';
import useBoundStore from '../../store/store';
import workspaceAdd from '../../assets/workspace_add.png';

const WorkspaceCard = ({ workspace_section }) => {
  const { workspace } = useBoundStore();
  const { workSpaceImage } = workspace;
  const { workSpaceMemberImage } = workspace;

  return (
    <Grid
      templateColumns={{ SE: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}
      gap={{ SE: '2', sm: '6' }}
    >
      <CardContainer>
        <Flex
          flexDirection={'column'}
          justify={'center'}
          align={'center'}
          gap={'32px'}
        >
          <Link to="/create-workspace">
            <Avatar
              border={'1px solid #ccc'}
              size={{ SE: 'lg', sm: 'lg', md: 'lg', lg: 'xl' }}
              src={workspaceAdd}
            />
          </Link>
          <Text
            fontSize={{ SE: '12px', sm: '14px', md: '16px', lg: '18px' }}
            fontWeight="700"
          >
            워크스페이스 생성
          </Text>
        </Flex>
      </CardContainer>
      {workspace_section?.map((item, index) => (
        <CardContainer key={index}>
          <Flex
            flexDirection={'column'}
            justify={'center'}
            align={'center'}
            gap={'32px'}
            // border={'1px solid blue'}
            width={'100%'}
          >
            <Link to={`/workspace/${item.workspaceId}`}>
              <Avatar
                // width={'120px'}
                // height={'120px'}
                border={'1px solid #ccc'}
                name={item.workSpaceName}
                size={{ SE: 'lg', sm: 'lg', md: 'lg', lg: 'xl' }}
                // src=''
                // borderRadius={'full'}
                // backgroundImage={`url(${workSpaceImage || ''})`}
                // backgroundPosition="center"
                // backgroundRepeat="no-repeat"
                // backgroundSize="cover"
              />
            </Link>

            <Flex
              flexDirection={'column'}
              justify={'center'}
              align={'center'}
              // border={'1px solid black'}
            >
              <Text
                fontSize={{ SE: '14px', sm: '16px', md: '18px', lg: '20px' }}
                fontWeight="700"
                isTruncated
                maxWidth="150px"
                mt={'-20px'}
              >
                {item.workSpaceName}
              </Text>
              <MemberIcon
                image={workSpaceMemberImage || imageMain}
                number={item.workSpaceMemberCount}
              />
            </Flex>
          </Flex>
        </CardContainer>
      ))}
    </Grid>
  );
};

export default WorkspaceCard;

const CardContainer = styled.div`
  max-width: 300px;
  padding: 40px 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 10px 12px 33px 0px rgba(102, 102, 102, 0.1);
  border-radius: 12px;
`;
