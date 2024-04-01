import { removeToken, setTokenInStorage } from '@utils/auth';
import { request } from '../axios/axios';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '@utils/auth';

export const createAccount = async ({
  nickname,
  email,
  password,
  phoneNumber,
}) =>
  await request.post('/signup', {
    nickname,
    email,
    password,
    phoneNumber,
  });

export const createSocialAccount = async ({
  nickname,
  email,
  phoneNumber,
  provider,
}) =>
  await request.post('/signup/social', {
    nickname,
    email,
    phoneNumber,
    provider,
  });

export const chekcDuplicateNickname = async (nickname) => {
  let isValid, errorMessage;
  return await request
    .get('/check/nickname', {
      params: {
        nickname,
      },
    })
    .then((r) => {
      const data = r.data;

      if (data?.status === 'success') {
        isValid = true;
        errorMessage = '사용가능한 닉네임입니다.';
      }
      return {
        isValid,
        errorMessage,
      };
    })
    .catch((err) => {
      if (err.response.status === 409) {
        isValid = false;
        errorMessage = '이미 사용되고 있는 닉네임입니다.';
        return {
          isValid,
          errorMessage,
        };
      } else {
        console.error('chekcDuplicateNickname error', err);
      }
    });
};

export const chekcDuplicateEmail = async (email) => {
  let isValid, errorMessage;
  return await request
    .get('/check/email', {
      params: {
        email,
      },
    })
    .then((r) => {
      const data = r.data;

      if (data.status === 'success') {
        isValid = true;
        errorMessage = '사용가능한 이메일입니다.';
      }
      return {
        isValid,
        errorMessage,
      };
    })
    .catch((err) => {
      if (err.response.status === 409) {
        isValid = false;
        errorMessage = '이미 사용되고 있는 이메일입니다.';
        return {
          isValid,
          errorMessage,
        };
      } else {
        console.error('checkDuplicationEmail error', err);
      }
    });
};

export const login = async ({ email, password }) => {
  return request
    .post('/login', {
      email,
      password,
    })
    .then((r) => {
      if (r.data?.status === 'success') {
        setTokenInStorage(r.data.data.accessToken);
        return {
          isLoginFailed: false,
          message: '로그인에 성공했습니다.',
        };
      }
    })
    .catch((err) => {
      if (err.response.data.status === 'fail') {
        return {
          isLoginFailed: true,
          message: err.response.data.message,
        };
      } else {
        console.log('LOGIN_ERROR :', err);
        return {
          isLoginFailed: true,
          message: 'LOGIN ERROR',
        };
      }
    });
};

export const logoutRequest = () =>
  request
    .post('/logout')
    .then(() => {
      removeToken();
    })
    .catch((err) => {
      console.log(err);
      removeToken();
    });

export const reissueToken = () => {
  const emailSlice = jwtDecode(getToken()).sub;
  return request
    .post(
      '/reissue',
      {},
      {
        params: {
          email: emailSlice,
        },
      }
    )
    .then((r) => {
      if (r.data?.status === 'success') {
        setTokenInStorage(r.data.data.accessToken);
      }
    })
    .catch((err) => {
      if (err.response.data.status === 'fail') {
        console.log(err.response.data.message);
        // logoutRequest();
      } else {
        console.error('REISSUE_TOKEN_ERROR :', err);
      }
    });
};
// TODO 토큰이 없거나 로그아웃 되었을 경우에 로그인이나 메인으로 리다이렉트
