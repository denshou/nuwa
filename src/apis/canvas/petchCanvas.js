import { request } from '@apis/axios/axios';

export const updateCanvas = async ({
  workSpaceId,
  canvasId,
  title,
  content,
}) => {
  const response = await request.patch(
    `/canvas/${workSpaceId}?canvasId=${canvasId}`,
    {
      title,
      content: JSON.stringify(content),
    }
  );
  return response.data;
};
