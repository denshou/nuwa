import { Flex, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react';
/**
 *
 * @param {string} name
 * @param {string} value : react state
 * @param {SetStateAction} state react setState
 * @param {Array} RadioConstants 라디오 선택지 데이터 담긴 상수 배열
 */
const ChannelRadio = ({ name, RadioConstants, value, setValue }) => {
  return (
    <Flex flexDirection={'column'} gap={'14px'} pb={'4rem'} fontSize={'14px'}>
      <div>{name}</div>
      <RadioGroup onChange={setValue} value={value}>
        <Stack spacing={'14px'}>
          {RadioConstants.map((item) => (
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              key={item.id}
            >
              <Flex gap={'8px'}>
                <Image src={item.icon} alt={'아이콘'} />
                <div>{item.label + ' - ' + item.description}</div>
              </Flex>
              <Radio
                colorScheme="gray"
                value={item.value}
                borderColor={'gray'}
                isDisabled={item.value === 'voice'}
              />
            </Flex>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default ChannelRadio;
