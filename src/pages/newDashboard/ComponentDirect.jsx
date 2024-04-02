import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import DirectMessageIcon from '@assets/message_icon.svg'; // 경로에 따라 수정해주세요.
import { fetchCanvases } from '@apis/dashboard/fetchCanvases'; // 경로에 따라 수정해주세요.

const ComponentDirect = () => {
  const [canvases, setCanvases] = useState([]);
  const { workSpaceId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCanvases(workSpaceId);
        const canvasMessages = response.data.data.map((canvas) => {
          // JSON 문자열을 객체로 파싱
          const contentObject = JSON.parse(canvas.canvasContent);
          // ops 배열 내의 모든 insert 값 추출 및 하나의 문자열로 결합
          const contentText = contentObject.ops.map((op) => op.insert).join('');
          return {
            id: canvas.canvasId,
            title: canvas.canvasTitle,
            content: contentText, // 수정된 부분
            createdAt: canvas.createdAt,
          };
        });
        setCanvases(canvasMessages);
      } catch (error) {
        console.error('캔버스 데이터 조회 중 오류가 발생했습니다.', error);
      }
    };

    fetchData();
  }, [workSpaceId]);

  return (
    <>
      <Flex
        borderTopRadius={'10px'}
        display={'flex'}
        p={'10px 15px'}
        align={'center'}
        height={'14%'}
        bg={'#F5F5F5'}
        gap={'10px'}
      >
        <Image src={DirectMessageIcon} />
        <Text fontSize="16px" fontWeight="bold" align={'center'}>
          캔버스
        </Text>
      </Flex>

      <Box
        padding={'20px'}
        height={'86%'}
        overflowY={'auto'}
        borderBottom={'1px solid #D9D9D9'}
        display={'flex'}
        flexFlow={'column'}
        gap={'12px'}
      >
        {canvases.length > 0 ? (
          canvases.map((canvas, index) => (
            <Box
              key={index}
              borderWidth="1px"
              width="100%"
              display={'flex'}
              gap={'10px'}
            >
              <Flex flexFlow={'column'} width={'100%'}>
                <Flex align={'center'} justify={'space-between'}>
                  <Text fontSize={'16px'} fontWeight={'700'}>
                    {canvas.title}
                  </Text>
                </Flex>
                <Text width={'80%'}>{canvas.content}</Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Flex height={'90%'} align={'center'} justify={'center'}>
            <Text fontSize="17px">캔버스가 존재하지 않습니다.</Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default ComponentDirect;
