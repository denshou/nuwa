export const subscribeHandler = (
  socketMessageList,
  setSocketMessageList,
  setSocketMessageDeleteList,
  setSocketMessageUpdateList
) => {
  return (message) => {
    // console.log('SUBSCRIBE MESSAGE : ', message.body);
    const bodyObject = JSON.parse(message.body);
    //enter는 없음
    bodyObject.key = bodyObject.messageId;

    if (bodyObject.messageType === 'ENTER') {
      console.log('SUBSCIREB ENTER');
    } else if (bodyObject.messageType === 'DELETE') {
      console.log('SUBSCIREB DELETE');

      setSocketMessageDeleteList((state) => [...state, bodyObject]);
    } else if (bodyObject.messageType === 'UPDATE') {
      console.log('SUBSCIREB UPDATE');

      setSocketMessageUpdateList((state) => [...state, bodyObject]);
    } else {
      console.log('SUBSCIREB MESSAGE');

      setSocketMessageList((state) => [...state, bodyObject]);
    }
  };
};
