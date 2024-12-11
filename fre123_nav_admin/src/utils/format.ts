import dayjs from "dayjs";

export declare interface instanceObject {
  [key: string]: string;
}

/**
 * JSON转url参数
 * @param data Json格式数据
 * */
export const formatJsonToUrlParams = (data: instanceObject) => {
  return typeof data === "object"
    ? Object.keys(data)
        .map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        })
        .join("&")
    : "";
};

export default formatJsonToUrlParams;

export const formatBackendDateStamp = (
  timeStamp: number,
  formatString = "YYYY年MM月DD日"
) => {
  try {
    return dayjs(timeStamp).format(formatString);
  } catch (error) {
    console.log("时间格式化错误：", error);
  }
};

export const formatTimestampByFormat = (
  formatStr: string,
  timestamp: number
) => {
  try {
    return dayjs(dayjs(timestamp).unix()).format(formatStr);
  } catch (error) {
    console.log("格式化时间错误：", error, formatStr);
  }
};

export const formatTimeStamp = (
  date: number,
  formatString = "YYYY-MM-DD HH:mm:ss"
) => {
  try {
    return dayjs(date * 1000).format(formatString);
  } catch (error) {
    console.log("时间错误", error);
  }
};
export const formatTimeYear = (data: any, formatString = "YYYY-MM-DD") => {
  try {
    return dayjs(data * 1000).format(formatString);
  } catch (error) {
    console.log("时间错误", error);
  }
};

export const formatTimestampToFullYear = (timestamp: number) =>
  formatTimestampByFormat("YYYY-MM-DD", timestamp);
export const formatTimestampToHour = (timestamp: number) =>
  formatTimestampByFormat("HH:mm:ss", timestamp);

export const sTimestamp2ms = (ts: number) => ts * 1000;
export const msTimestamp2s = (ts: number) => dayjs(ts).unix().valueOf();

/**
 * 每三位数字加上一个符号
 * @param num 需要转换的数字
 * @param char 需要替换的符号
 *
 * */
export const formatNumber = (num: number, char: string): string => {
  let Num = "";
  Num = num + "";
  Num = Num.replace(/(?!^)(?=(\d{3})+$)/g, char);
  return Num;
};
export const parseToTimestamp = (time: string) => {
  const date = new Date(time);
  return date.getTime() / 1000;
};
// 判断当前时间是否超出给定范围
export const isTimeExpired = (start_time: number, end_time: number) => {
  try {
    const currentTime = Math.round(new Date().getTime() / 1000);
    // 未开始
    if (currentTime < start_time) {
      return 1;
    }
    // 进行中
    else if (currentTime > start_time && currentTime < end_time) {
      return 2;
    }
    // 已结束
    else {
      return 3;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
};
