import { isArray } from "@/utils/judge";

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
  window.localStorage.clear();
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export function deepCopy<T>(obj: any): T {
  let newObj: any;
  try {
    newObj = obj.push ? [] : {};
  } catch (error) {
    newObj = {};
  }
  for (let attr in obj) {
    if (typeof obj[attr] === "object") {
      newObj[attr] = deepCopy(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前地址
 * @return array
 */
export function getTabPane<T, U>(menuList: any[], path: U): T {
  let result: any;
  for (let item of menuList || []) {
    if (item.path === path) result = item;
    const res = getTabPane(item.children, path);
    if (res) result = res;
  }
  return result;
}

/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
  return arr.reduce((pre: any, current: any) => {
    let flatArr = [...pre, current];
    if (current.children)
      flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue))
    return callValue.length ? callValue.join(" / ") : "--";
  return callValue ?? "--";
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
  callValue: any,
  enumData: any,
  searchProps?: { [key: string]: any },
  type?: string
): string {
  const value = searchProps?.value ?? "value";
  const label = searchProps?.label ?? "label";
  let filterData = enumData.find((item: any) => item[value] === callValue);
  if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
  return filterData ? filterData[label] : "--";
}

/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(
  routerList: Menu.MenuOptions[],
  newArr: string[] = []
) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === "object" && item.path && newArr.push(item.path);
    item.children &&
      item.children.length &&
      handleRouter(item.children, newArr);
  });
  return newArr;
}

// 用于校验 URL 的正则表达式
export function checkUrl(url: string) {
  const regexp = /^(http|https):\/\/(\S+)$/;
  return regexp.test(url.trim());
}

export const swapElements = (array: any[], index1: number, index2: number) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

//  交换数组中元素位置
export const move = (arr: [], a: number, b: number) => {
  let arr_temp = [].concat(arr);

  arr_temp.splice(b, 0, arr_temp.splice(a, 1)[0]);

  return arr_temp;
};

export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content);
  return true;
};
