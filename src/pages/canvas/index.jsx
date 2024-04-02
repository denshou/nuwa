import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Flex,
  Text,
  Button,
  Image,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import Exclude from '@assets/Exclude.png';
import CanvasSearchBar from '@components/SearchBar/CanvasSearchBar';
import CanvasData from '@components/DataBox/CanvasData';
import NotCanvasData from '@components/DataBox/NotCanvasData';
import CanvasModal from '@components/Modal/CanvasModal/index.jsx';
import useModal from '@hooks/useModal';
import { useParams } from 'react-router-dom';
import useCanvasData from '@hooks/canvas/useCanvasData';
import CanvasEditModal from '@components/Modal/EditCanvas/index.jsx';
import useBoundStore from '../../store/store';
const Canvas = () => {
  const { setUploadType, uploadType } = useBoundStore();

  useEffect(() => {
    if (uploadType !== 'CANVAS') {
      setUploadType('CANVAS');
    }
  }, []);

  const { isOpen, onOpen, onClose } = useModal();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useModal(); // 편집 모달 제어용
  const [selectedCanvasId, setSelectedCanvasId] = useState(null); // 선택된 CanvasData의 ID 저장용
  const [selectedCanvas, setSelectedCanvas] = useState({
    id: null,
    title: '',
    content: '',
  });

  const { workSpaceId } = useParams();
  const [filter, setFilter] = useState('ALL');
  const {
    data: canvasData,
    isLoading,
    error,
    deleteMutation, // useCanvasData에서 deleteMutation을 받음
  } = useCanvasData(workSpaceId, filter);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // 버튼 스타일을 위한 컬러 모드 값
  const activeBgColor = useColorModeValue('#575DFB', '#575DFB');
  const inactiveBgColor = useColorModeValue('gray.200', 'gray.600');
  const activeColor = useColorModeValue('white', 'white');
  const inactiveColor = useColorModeValue('black', 'white');

  // 검색어에 따라 canvasData를 필터링하는 효과
  useEffect(() => {
    if (!isLoading && !error) {
      const filtered = canvasData.filter((data) =>
        data.canvasTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, canvasData, isLoading, error]);

  // CanvasData 클릭 이벤트 핸들러
  const handleCanvasDataClick = (canvas) => {
    setSelectedCanvas(canvas); // canvas 객체 전체를 상태로 저장
    onEditModalOpen();
  };

  return (
    <StContainer>
      <Flex justify={'space-between'} align={'center'} width={'100%'}>
        <Text fontSize={'40px'} fontWeight={'700'}>
          캔버스
        </Text>
        <Button
          className={'apple'}
          leftIcon={<Image src={Exclude} boxSize="20px" />}
          bg={'#575DFB'}
          variant="solid"
          onClick={onOpen}
          color={'white'}
          _hover={{ bg: '#5056ff' }}
          _active={{
            transform: 'scale(0.98)', // 클릭 시 약간 축소
          }}
          transition="transform 0.1s ease-in-out" // 변화가 부드럽게 적용되도록 설정
        >
          새 캔버스
        </Button>
      </Flex>

      <CanvasSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Flex justify={'flex-end'} gap={'10px'} mb={'10px'}>
        <Button
          onClick={() => setFilter('ALL')}
          bg={filter === 'ALL' ? activeBgColor : inactiveBgColor}
          color={filter === 'ALL' ? activeColor : inactiveColor}
          _hover={{
            bg: filter === 'ALL' ? activeBgColor : inactiveBgColor,
          }}
          _active={{
            transform: 'scale(0.98)', // 클릭 시 약간 축소
          }}
          transition="transform 0.1s ease-in-out" // 변화가 부드럽게 적용되도록 설정
        >
          전체 캔버스 조회
        </Button>
        <Button
          onClick={() => setFilter('MINE')}
          bg={filter === 'MINE' ? activeBgColor : inactiveBgColor}
          color={filter === 'MINE' ? activeColor : inactiveColor}
          _hover={{
            bg: filter === 'MINE' ? activeBgColor : inactiveBgColor,
          }}
          _active={{
            transform: 'scale(0.98)', // 클릭 시 약간 축소
          }}
          transition="transform 0.1s ease-in-out" // 변화가 부드럽게 적용되도록 설정s
        >
          내가 작성한 캔버스 조회
        </Button>
      </Flex>

      <CanvasModal isOpen={isOpen} onClose={onClose} />

      <DataContainer>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((data) => (
            <CanvasData
              key={data.canvasId}
              canvasId={data.canvasId}
              title={data.canvasTitle}
              content={data.canvasContent}
              name={data.createMemberName}
              date={data.createdAt}
              workSpaceId={workSpaceId}
              deleteMutation={deleteMutation}
              onClick={() =>
                handleCanvasDataClick({
                  id: data.canvasId,
                  title: data.canvasTitle,
                  content: data.canvasContent,
                })
              }
            />
          ))
        ) : (
          <NotDataSection>
            <NotCanvasData />
          </NotDataSection>
        )}
      </DataContainer>
      <CanvasEditModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        canvasId={selectedCanvas.id}
        canvasTitle={selectedCanvas.title}
        canvasContent={selectedCanvas.content}
      />
    </StContainer>
  );
};

export default Canvas;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 50px;
`;

const DataContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const NotDataSection = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
