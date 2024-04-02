import { dataURItoBlob } from './customOptions';
import { uploadFile } from '@apis/file/file';
import Quill from 'quill';
import { validateFiles } from '../../../utils/validateFile';
const Delta = Quill.import('delta');

/**
 *
 * @param {*} node addMathcer에서 넘겨 받는 html노드
 * @param {*} quill 에디터 객체
 * @param {*} workSpaceId
 * @param {*} channelId
 * @returns 비어 있는 delta 값
 *
 * image match
 */
export const imageMatcher = (
  node,
  quill,
  workSpaceId,
  channelId,
  uploadType
) => {
  const [blob, type] = dataURItoBlob(node.getAttribute('src'));
  const formData = new FormData();
  const fileRequestDto = {
    workSpaceId,
  };
  formData.append(
    'fileRequestDto',
    new Blob([JSON.stringify(fileRequestDto)], {
      type: 'application/json',
    })
  );
  const [file] = validateFiles([new File([blob], `image.${type}`)]);
  formData.append('fileList', file);
  uploadFile(uploadType, channelId, formData).then((r) => {
    const data = r.data.data;
    console.log(data);
    quill.updateContents(
      new Delta().retain(quill.getSelection()?.index ?? 0).insert({
        image: data[0].fileUrl,
      })
    );
    const index = quill.getSelection().index;
    const length = quill.getLength();
    if (index < length - 1) {
      quill.setSelection(index + 1);
    }
  });

  const delta = new Delta();
  return delta;
};
