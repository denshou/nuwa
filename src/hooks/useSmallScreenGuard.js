import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSmallScreenGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.innerWidth < 500) {
      navigate('/');
      alert('모바일에서는 아직 지원되지 않습니다. 웹에서 사용해주세요.');
    }
  }, []);
  return;
};

export default useSmallScreenGuard;
