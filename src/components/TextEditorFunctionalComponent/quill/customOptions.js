import Emitter from 'quill/core/emitter';
import { bindings } from './keyboardBindings';
import Quill from 'quill';
import { uploadFile } from '../../../apis/file/file';
import { validateFiles } from '../../../utils/validateFile';

const Delta = Quill.import('delta');

export const myOptions = {
  theme: 'snow',
  modules: {
    clipboard: {
      matchers: [],
    },
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        // ['send'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    keyboard: {
      bindings: bindings,
    },
  },
};

export function imageHandler() {
  const { workSpaceId, channelId, uploadType } =
    this.quill.options.externalLayer;
  const fileRequestDto = {
    workSpaceId,
  };

  let fileInput = this.container.querySelector('input.ql-image[type=file]');
  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute(
      'accept',
      'image/png, image/jpg, image/jpeg, image/svg'
    );
    fileInput.multiple = true;
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', async (e) => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        const files = validateFiles(fileInput.files);
        if (files === null) {
          return;
        }
        const formData = new FormData();
        formData.append(
          'fileRequestDto',
          new Blob([JSON.stringify(fileRequestDto)], {
            type: 'application/json',
          })
        );
        for (let file of e.target.files) {
          formData.append('fileList', file);
        }
        fileInput.value = null;

        const imageUrlArray = await uploadFile(
          uploadType,
          channelId,
          formData
        ).then((r) => r.data.data);
        formData.forEach((value, key) => {
          formData.delete(key);
        });

        for (let fileInfo of imageUrlArray) {
          let range = this.quill.getSelection(true);
          this.quill.updateContents(
            new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image: fileInfo.fileUrl }),
            Emitter.sources.USER
          );
          this.quill.setSelection(range.index + 1, Emitter.sources.SILENT);
        }
      }
    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

export function dataURItoBlob(dataURI) {
  const type = dataURI.substring(
    'data:image/'.length,
    dataURI.indexOf(';base64')
  );

  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return [new Blob([ia], { type: mimeString }), type];
}
