import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { useImage } from '@queries/useImage';
import { dataURItoBlob } from '@utils/dataURItoBlob';
import { updateWorkspaceInfo } from '@apis/workspace/workspaceUpload.js';

const ModalBody = () => {
  const { workSpaceId } = useParams();
  const [workSpaceName, setWorkSpaceName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { mutation } = useImage();
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // FileReader를 사용하여 파일을 data URL 형태로 읽습니다.
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        // 읽기가 완료되면, 결과(data URL)를 Blob으로 변환합니다.
        const blob = dataURItoBlob(reader.result);
        // Blob을 사용하여 서버(S3)에 이미지를 업로드합니다.
        try {
          const data = await mutation.mutateAsync(blob);
          console.log('이미지가 정상적으로 S3에 도착하였습니다.');
          setImageUrl(data.location);
          console.log(`이미지 URL: ${data.location}`);
        } catch (error) {
          console.error('이미지 업로드에 실패했습니다.', error);
        }
      };
    }
  };

  const handleUpdateWorkspace = async () => {
    try {
      await updateWorkspaceInfo(workSpaceId, workSpaceName, imageUrl);
      console.log('워크스페이스 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('워크스페이스 정보 업데이트에 실패했습니다.', error);
    }
  };

  return (
    <StContainer>
      <Text>
        워크스페이스의 이름을 수정하거나 워크스페이스의 이미지를 수정 또는
        추가할 수 있으며 다른 사용자에게 표시됩니다.
      </Text>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="workspace-name">워크스페이스 이름</FormLabel>
          <Input
            id="workspace-name"
            value={workSpaceName}
            onChange={(e) => setWorkSpaceName(e.target.value)}
            borderRadius={'3px'}
            placeholder="새로운 워크스페이스명을 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="workspace-image">워크스페이스 아이콘</FormLabel>
          <InputGroup size="md">
            <Input
              value={imageUrl || '선택된 이미지 없음'}
              placeholder="선택된 이미지 없음"
              readOnly
              borderRadius={'3px'}
            />
            <Button
              as="label"
              colorScheme="blue"
              ml={2}
              borderRadius={'3px'}
              fontSize={'14px'}
              cursor={'pointer'}
              bg={'#979797'}
              _hover={{ bg: '#747474' }}
              _active={{ bg: '#747474  ' }}
            >
              파일선택
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
                ref={fileInputRef}
              />
            </Button>
          </InputGroup>
        </FormControl>
        <Button
          onClick={handleUpdateWorkspace}
          width={'100%'}
          borderRadius={'3px'}
          bg={'#5158FF'}
          _hover={{ bg: '#4147f8' }}
          _active={{ bg: '#4147f8  ' }}
          color={'white'}
          mt={'40px'}
        >
          수정하기
        </Button>
      </VStack>
    </StContainer>
  );
};

export default ModalBody;

const StContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;
