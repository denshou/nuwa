export const getFullText = (quill) => {
  return quill.getText(0, quill.getLength());
};

export const isQuillTextEmpty = (quill) => {
  const text = quill.getText().trim();
  return text === '';
};

export const isQuillImageEmpty = (quill) => {
  const images = quill.container.querySelectorAll('img');
  return images.length === 0;
};

export const isQuillEmpty = (quill) => {
  if (quill === null) return;

  return isQuillTextEmpty(quill) && isQuillImageEmpty(quill);
};

export const clearQuillContent = (quill) => {
  if (!quill) return;
  quill.deleteText(0, quill.getLength());
};

export const sendQuillDataHandler = (quill, publish) => {
  if (isQuillEmpty(quill)) return;
  const content = quill.getContents();
  const textContent = content.filter((value) => !value.insert.image);
  const imageContent = content.filter((value) => !!value.insert.image);

  const imageRawStringArray = imageContent.map((item) => item.insert.image);
  if (!isQuillImageEmpty(quill)) {
    publish(JSON.stringify(imageContent), 'IMAGE', imageRawStringArray);
  }

  if (!isQuillTextEmpty(quill)) {
    publish(JSON.stringify(textContent), 'TEXT', [getFullText(quill)]);
  }
  clearQuillContent(quill);
};

export const updateQuillDataHandler = (quill, updatePublish, id) => {
  if (isQuillEmpty(quill)) return;
  const content = quill.getContents();
  const textContent = content.filter((value) => !value.insert.image);

  if (!isQuillTextEmpty(quill)) {
    updatePublish(id, JSON.stringify(textContent), [getFullText(quill)]);
  }
  clearQuillContent(quill);
};
