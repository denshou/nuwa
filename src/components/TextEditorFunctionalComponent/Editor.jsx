import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import CustomToolbarBottom from '../TextEditor/CustomToolbarBottom';
import { myOptions as options } from './quill/customOptions';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { sendQuillDataHandler } from './quill/utils';
import { imageMatcher } from './quill/clipboard';
import { Box } from '@chakra-ui/react';
import Quill from 'quill';
import useBoundStore from '../../store/store';
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
    const uploadType = useBoundStore((state) => state.uploadType);
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
        uploadType,
      };
      const quill = new Quill(editorContainer, options);
      quill.clipboard.addMatcher('img', function (node) {
        return imageMatcher(node, quill, workSpaceId, channelId, uploadType);
      });
      // quill.clipboard.addMatcher('IMG', (node, delta) => {
      //   const Delta = Quill.import('delta');
      //   return new Delta().insert('');
      // });
      // quill.clipboard.addMatcher('PICTURE', (node, delta) => {
      //   const Delta = Quill.import('delta');
      //   return new Delta().insert('');
      // });
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

    useEffect(() => {
      if (ref.current) {
        ref.current.focus({ preventScroll: true });
      }
    }, [publish, channelId]);
    return (
      <Box flexGrow={0}>
        <EmojiPicker
          open={emojiPickerIsOpen}
          className="emoji-picker"
          onEmojiClick={(e) => {
            if (ref.current) {
              let index;
              const range = ref.current.getSelection();
              if (range === null) {
                index = 0;
              } else {
                index = range.index;
              }
              ref.current.insertText(index, e.emoji);
              ref.current.setSelection(index + e.emoji.length);
            }
            setEmojiPickerIsOpen(false);
          }}
        />
        <div
          id="editor"
          ref={containerRef}
          onDragOver={(e) => {
            e.preventDefault;
          }}
        ></div>
        <CustomToolbarBottom setEmojiPickerIsOpen={setEmojiPickerIsOpen} />
      </Box>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;
