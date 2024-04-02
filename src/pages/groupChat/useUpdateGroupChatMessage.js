import { useEffect } from 'react';

const useUpdateGroupChatMessage = ({
  socketMessageUpdateList,
  setSocketMessageList,
  groupChatMessageList,
  setSocketMessageUpdateList,
}) => {
  useEffect(() => {
    if (socketMessageUpdateList.length !== 0) {
      setSocketMessageList((state) => {
        const newState = [...state];
        for (let updateItem of socketMessageUpdateList) {
          newState.forEach((item) => {
            if (item.messageId === updateItem.id) {
              item.key = item.key + 'update';
              item.content = updateItem.content;
            }
            return item;
          });
        }
        return newState;
      });
      if (groupChatMessageList.length > 0) {
        for (let updateItem of socketMessageUpdateList) {
          groupChatMessageList.forEach((item) => {
            if (item.messageId === updateItem.id) {
              item.key = item.key + 'update';
              item.content = updateItem.content;
            }
            return item;
          });
        }
      }

      setSocketMessageUpdateList([]);
    }
  }, [socketMessageUpdateList]);
};

export default useUpdateGroupChatMessage;
