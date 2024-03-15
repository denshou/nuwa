import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import CustomToolbarBottom from '../TextEditor/CustomToolbarBottom';
import { myOptions as options } from './quill/customOptions';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { sendQuillDataHandler } from './quill/utils';
import { imageMatcher } from './quill/clipboard';
import { Box } from '@chakra-ui/react';
// Editor is an uncontrolled React component
// const Delta = Quill.import('delta');

const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
      emojiPickerIsOpen,
      setEmojiPickerIsOpen,
      publish,
      channelId,
    },
    ref
  ) => {
    const { workSpaceId } = useParams();

    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    const handleSendMessage = () => {
      sendQuillDataHandler(ref.current, publish);
    };

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      options.externalLayer = {
        workSpaceId,
        channelId,
        publish,
      };
      const quill = new Quill(editorContainer, options);

      quill.clipboard.addMatcher('img', function (node) {
        return imageMatcher(node, quill, workSpaceId, channelId);
      });
      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });
      // quill.on();
      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [publish]);

    useLayoutEffect(() => {
      const sendButton = document.querySelector('#send-button');
      sendButton.addEventListener('click', handleSendMessage);

      return () => {
        sendButton.removeEventListener('click', handleSendMessage);
      };
    }, [publish]);

    return (
      <Box maxH={'15vh'} flexGrow={1} width={'100%'} marginBottom={'auto'}>
        <EmojiPicker
          open={emojiPickerIsOpen}
          className="emoji-picker"
          onEmojiClick={console.log}
        />
        <div id="editor" ref={containerRef}></div>
        <CustomToolbarBottom setEmojiPickerIsOpen={setEmojiPickerIsOpen} />
      </Box>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;
