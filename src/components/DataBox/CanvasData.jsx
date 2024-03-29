import React from 'react';
import { Box, Text, Flex, Image, CloseButton } from '@chakra-ui/react';
import CanvasIcon from '@assets/white_canvas.svg';

const CanvasData = ({
  canvasId,
  title,
  content,
  date,
  name,
  workSpaceId,
  deleteMutation,
  onClick,
}) => {
  const handleDelete = (event) => {
    // 이벤트 버블링을 막아 상위 컴포넌트의 onClick 이벤트가 호출되지 않도록 합니다.
    event.stopPropagation();
    deleteMutation.mutate({ workSpaceId, canvasId });
  };

  return (
    <Box
      cursor={'pointer'}
      display="flex"
      gap="10px"
      border="1px solid grey"
      padding="12px"
      borderRadius="10px"
      alignItems="center"
      onClick={() => onClick({ id: canvasId, title, content })}
      _active={{
        transform: 'scale(0.995)', // 클릭 시 약간 축소
      }}
      transition="transform 0.1s ease-in-out" // 변화가 부드럽게 적용되도록 설정s
    >
      <Box
        boxSize="42px"
        borderRadius="8px"
        bgColor="#575DFB"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={CanvasIcon} width="25px" stroke="#ffffff" />
      </Box>
      <Flex flexFlow="column" justify="center" width="100%">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="10px">
            <Text fontSize="16px" fontWeight="500">
              {title}
            </Text>
            <Text fontSize="12px" fontWeight="500" color="#D9D9D9">
              {date}
            </Text>
          </Flex>
          <CloseButton boxSize="10px" mr="10px" onClick={handleDelete} />
        </Flex>
        <Flex align="center">
          <Text fontSize="12px" fontWeight="500" color="#575DFB">
            생성한 사람: {name}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CanvasData;
