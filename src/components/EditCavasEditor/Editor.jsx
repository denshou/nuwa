import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import { useParams } from 'react-router-dom';
import { imageMatcher } from '@components/TextEditorFunctionalComponent/quill/clipboard';
import { imageHandler } from '../TextEditorFunctionalComponent/quill/customOptions';
import useBoundStore from '../../store/store';
/// 캔버스 수정 쪽 에디터
const Editor = forwardRef(
  (
    { readOnly, onTextChange, onSelectionChange, channelId, defaultValue },
    ref
  ) => {
    const uploadType = useBoundStore((state) => state.uploadType);

    const { workSpaceId } = useParams();

    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const defaultValueRef = useRef(defaultValue);

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
      const quill = new Quill(editorContainer, {
        externalLayer: { uploadType },
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

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
      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, []);

    useEffect(() => {
      const handleEmptyEditorClick = () => {
        ref.current.focus({ preventScroll: true });
        ref.current.setSelection(ref.current.getLength(), 0);
      };
      const element = document.querySelector('.canvas .ql-container.ql-snow');
      element.addEventListener('click', handleEmptyEditorClick);

      return () => {
        element.removeEventListener('click', handleEmptyEditorClick);
      };
    }, []);

    return <div id="canvas-editor" className="canvas" ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
