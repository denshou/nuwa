const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
export const go = (...args) => reduce((a, f) => f(a), args);

const dateToMonthDay = (dateString) => {
  const dateObject = new Date(dateString);
  const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const day = dateObject.getDate();
  return `${month}월 ${day}일`;
};

export const dateToHourMinute = (dateString) => {
  const dateObject = new Date(dateString);

  let amOrPm;
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  if (hours < 12) {
    amOrPm = '오전';
  } else if (hours === 12) {
    amOrPm = '오후';
  } else {
    amOrPm = '오후';
    hours -= 12;
  }
  return minutes === 0
    ? `${amOrPm} ${hours}시`
    : `${amOrPm} ${hours}시 ${minutes}분`;
};

export const utcToKoreanTime = (utcTimeString) => {
  const utcDate = new Date(utcTimeString);

  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  const options = { timeZone: 'Asia/Seoul' };
  const koreaTimeString = koreaTime
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  return koreaTimeString;
};

export const getDiffFromCurrent = (dateString) => {
  const givenDate = new Date(dateString);

  const currentDate = new Date();

  const timeDifference = currentDate - givenDate;
  return { timeDifference, dateString };
};

export const writeTimeStringFromDiff = ({ timeDifference, dateString }) => {
  if (timeDifference < 60 * 1000) {
    return '방금 전';
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return dateToHourMinute(dateString);
  } else {
    return dateToMonthDay(dateString);
  }
};
