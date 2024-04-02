import { useEffect } from 'react';

const useDeleteGroupChatMessage = ({
  socketMessageDeleteList,
  setSocketMessageDeleteList,
  setSocketMessageList,
  groupChatMessageList,
}) => {
  useEffect(() => {
    if (socketMessageDeleteList.length !== 0) {
      setSocketMessageList((state) => {
        const newState = [...state];
        for (let deleteItem of socketMessageDeleteList) {
          newState.forEach((item) => {
            if (item.messageId === deleteItem.id) {
              item.key = item.key + 'delete';
              item.isDeleted = true;
              item.content = deleteItem.content;
            }
            return item;
          });
        }
        return newState;
      });
      if (groupChatMessageList.length > 0) {
        for (let deleteItem of socketMessageDeleteList) {
          groupChatMessageList.forEach((item) => {
            if (item.messageId === deleteItem.id) {
              item.key = item.key + 'delete';

              item.isDeleted = true;
              item.content = deleteItem.content;
            }
            return item;
          });
        }
      }

      setSocketMessageDeleteList([]);
    }
  }, [socketMessageDeleteList, setSocketMessageDeleteList]);
};

export default useDeleteGroupChatMessage;
