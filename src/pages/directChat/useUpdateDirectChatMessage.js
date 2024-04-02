import { useEffect } from 'react';

const useUpdateDirectChatMessage = ({
  socketMessageUpdateList,
  setSocketMessageList,
  directChatMessageList,
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
      if (directChatMessageList.length > 0) {
        for (let updateItem of socketMessageUpdateList) {
          directChatMessageList.forEach((item) => {
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

export default useUpdateDirectChatMessage;
