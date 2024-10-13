import moment from 'moment';

/**
 * 날짜 포멧 컨버팅
 */
export const convertDateFormat = (value: string | undefined) => {
  return moment(value).format('YYYY-MM-DD hh:mm:ss');
};

/**
 * 문자 자르기
 */
export const sliceStr = (str: string, num: number) => {
  if (str.length > num) {
    return `${str.substring(0, num)}...`;
  } else {
    return str;
  }
};
