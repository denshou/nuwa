import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import styled from 'styled-components';
import CanvasTextEditor from '@components/CanvasEditor/CanvasTextEditor.jsx';
import { createCanvas } from '@apis/canvas/postCanvas.js';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ModalBody = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { workSpaceId } = useParams();
  const queryClient = useQueryClient();
  // useMutation을 사용하여 createCanvas 함수를 비동기적으로 실행
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => createCanvas(workSpaceId, title, JSON.stringify(content)),
    onSuccess: (data) => {
      // 성공 처리 로직
      if (data.success) {
        queryClient.invalidateQueries(['canvasData']);
        alert('캔버스가 성공적으로 생성되었습니다.');
        onClose();
      } else {
        alert(`캔버스 생성 실패: ${data.message}`);
      }
    },
    onError: (error) => {
      // 에러 처리 로직
      console.error(error);
      alert('캔버스 생성 중 오류가 발생했습니다.');
    },
  });

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    mutate();
  };

  return (
    <StContainer>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
        mb={'10px'}
      />
      <CanvasTextEditor onContentChange={handleContentChange} />
      <Button
        onClick={handleSubmit}
        isLoading={isLoading}
        width={'100%'}
        mt={'10px'}
        bg={'#575DFB'}
        _hover={{ bg: '#5056ff' }}
        color={'white'}
      >
        새로운 캔버스 생성하기
      </Button>
    </StContainer>
  );
};

export default ModalBody;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
`;
