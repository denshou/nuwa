import { Button, Text } from '@chakra-ui/react';

const SubmitButton = ({ isSubmitting, isSubmitted, isValid, isDirty }) => {
  return (
    <>
      {!isSubmitting ? (
        <Button
          height={'52px'}
          type="submit"
          colorScheme="secondary"
          // isDisabled={isValid}
        >
          <Text
            color={'white'}
            fontSize={'18px'}
            fontWeight={'700'}
            py={'14px'}
          >
            회원가입
          </Text>
        </Button>
      ) : (
        <Button
          height={'52px'}
          type="submit"
          colorScheme="secondary"
          isLoading
        />
      )}
    </>
  );
};

export default SubmitButton;
