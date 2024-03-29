export const validateFiles = (files) => {
  let totalSize = 0;
  const maxSizePerFile = 3 * 1024 * 1024; // 20MB in bytes
  const maxTotalSize = 30 * 1024 * 1024; // 50MB in bytes
  const maxFiles = 10;

  if (files.length > maxFiles) {
    alert('파일을' + maxFiles + '개 초과할 수 없습니다.');
    return null;
  }

  for (var i = 0; i < files.length; i++) {
    totalSize += files[i].size;
    if (files[i].size > maxSizePerFile) {
      alert('파일 ' + files[i].name + '가 3MB가 보다 큽니다.');
      return null;
    }
  }

  if (totalSize > maxTotalSize) {
    alert('총 사이즈가 30MB를 넘을 수 없습니다.');
    return null;
  }

  return files;
};
