import { Box } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';
import Quill from 'quill';

import Editor from './Editor';

import '@components/CanvasEditor/quill.custom.snow2.css';

const EditCanvasEditor = ({ onContentChange, initialContent }) => {
  const Delta = Quill.import('delta');
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();

  const quillRef = useRef();
  const defaultValue = initialContent;

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('text-change', () => {
        const content = quillRef.current.getContents();
        if (typeof onContentChange === 'function') {
          onContentChange(content);
        }
      });
    }
  }, [onContentChange]);

  return (
    <Box>
      <Editor
        ref={quillRef}
        readOnly={false}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
        defaultValue={defaultValue}
      />
    </Box>
  );
};

export default EditCanvasEditor;
