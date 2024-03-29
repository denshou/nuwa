import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const useFreeTrialRedirect = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const accessToken = getToken();
    if (accessToken) {
      navigate('/workAccess');
    } else {
      navigate('/login');
    }
  };
  return {
    handleButtonClick,
  };
};

export default useFreeTrialRedirect;
