import { useEffect } from 'react';

const useGroupChatBoxScroll = (ref, deps) => {
  useEffect(() => {
    if (ref.current) {
      const { offsetHeight, scrollHeight, scrollTop } = ref.current;
      // console.log(
      //   scrollHeight <= scrollTop + offsetHeight + 100,
      //   scrollHeight,
      //   scrollTop + offsetHeight
      // );
      if (scrollHeight <= scrollTop + offsetHeight + 500) {
        setTimeout(() => {
          ref.current?.scrollTo(0, scrollHeight);
        }, 200);
      }
    }
  }, [deps, ref]);
};

export default useGroupChatBoxScroll;
