import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import NicknameInput from '@components/Form/NicknameInput';
import EmailInput from '@components/Form/EmailInput';
import PhoneNumberInput from '@components/Form/PhoneNumberInput';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '@components/Button/SubmitButton';
import useBoundStore from '@store/store';
import { createSocialAccount } from '@apis/auth/auth';
import { setTokenInStorage } from '@utils/auth';
//social
const SignUpForm = () => {
  const email = useBoundStore((state) => state.email);
  const provider = useBoundStore((state) => state.provider);
  const isInvited = useBoundStore((state) => state.isInvited);
  const setIsLoggedIn = useBoundStore((state) => state.setIsLoggedIn);

  const resetSocialSignupInfo = useBoundStore(
    (state) => state.resetSocialSignupInfo
  );
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
      email: `${email}`,
      phoneNumber: '',
    },
  });

  const onSubmit = async (data) => {
    const newData = {
      nickname: data.nickname,
      email: email,
      phoneNumber: unmaskPhoneNumber(data.phoneNumber),
      provider,
    };
    try {
      setTimeout(async () => {
        const response = await createSocialAccount(newData);
        console.log(response);
        if (response.data.status === 'success') {
          resetSocialSignupInfo();
          setTokenInStorage(response.data.data.accessToken);
          setIsLoggedIn(true);
          // todo : to main page
          if (isInvited) {
            navigate('/join');
          } else {
            navigate('/');
          }
        }
      }, 1000);
    } catch (error) {
      alert('에러!');
    }
  };
  return (
    <StLoginContainer>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <NicknameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} disabled={true} />
        <PhoneNumberInput control={control} errors={errors} />
        <SubmitButton
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          isDirty={isDirty}
          isValid={isValid}
        />
      </StForm>
    </StLoginContainer>
  );
};

export default SignUpForm;

const StLoginContainer = styled.div`
  width: 100%;
`;

const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const unmaskPhoneNumber = (phoneNumber) => {
  return phoneNumber.replaceAll(/\D/g, '');
};
