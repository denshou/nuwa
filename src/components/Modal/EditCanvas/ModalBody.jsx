import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import styled from 'styled-components';
import EditCanvasEditor from '@components/EditCavasEditor/EditCanvasEditor';
import { useParams } from 'react-router-dom';
import { updateCanvas } from '@apis/canvas/petchCanvas.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ModalBody = ({
  onClose,
  title: initialTitle,
  content: initialContent,
  canvasId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(JSON.parse(initialContent));
  const { workSpaceId } = useParams();
  const queryClient = useQueryClient();

  // useMutation을 사용하여 서버 업데이트 로직 구현
  const { mutate, isLoading } = useMutation({
    mutationFn: () => updateCanvas({ workSpaceId, canvasId, title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['canvas', canvasId]);
      onClose();
    },
    onError: (error) => {
      console.error('캔버스 수정 실패:', error);
    },
  });

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleContentChange = (newContent) => {
    // const extractedText = newContent.ops.map((op) => op.insert).join('');
    setContent(newContent);
  };
  const handleSubmit = () => {
    mutate();
  };

  return (
    <StContainer>
      <Input value={title} onChange={handleTitleChange} mb={'10px'} />
      <EditCanvasEditor
        onContentChange={handleContentChange}
        initialContent={content} // Quill에 initialContent를 직접 전달
      />
      <Button
        width={'100%'}
        onClick={handleSubmit}
        bg={'#575DFB'}
        color={'white'}
        _hover={{ bg: '#5056ff' }}
        mt={'10px'}
      >
        캔버스 수정하기
      </Button>
    </StContainer>
  );
};

export default ModalBody;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
`;
