import { ElMessageBox, ElNotification, NotificationParams } from "element-plus";

import { debounce } from "lodash-es";

export const errorMessage = (message = "操作错误") =>
  ElNotification({
    dangerouslyUseHTMLString: true,
    message,
    title: "错误：",
    duration: 2000,
    type: "error",
    onClose: () => {
      // @ts-ignore
      if (globalThis.__error_cache?.message) {
        // @ts-ignore
        globalThis.__error_cache.message = undefined;
      }
    },
  });

export const warningMessage = (message = "操作异常", title = "警告：") =>
  ElNotification({
    dangerouslyUseHTMLString: true,
    message,
    title,
    duration: 2000,
    type: "warning",
  });

/**
 * 优化消息提示函数，上面两个待续 👆🏻
 */

export const debounceWarningMessage = debounce(
  (msg: string) => warningMessage(msg),
  500
);

export const debounceMessage = (
  type: "info" | "success" | "warning" | "error",
  _options = {} as NotificationParams
) =>
  debounce(
    (
      message = "操作成功",
      options: NotificationParams = { duration: 2000 }
    ) => {
      // @ts-ignore
      ElNotification({ ...options, type, ..._options, message });
    },
    500
  );

export const infoMessage = debounceMessage("info", {
  dangerouslyUseHTMLString: true,
  title: "友情提示：",
});

export const successMessage = debounceMessage("success", {
  dangerouslyUseHTMLString: true,
  title: "友情提示：",
  message: "操作成功",
});

// ----------------------------------------- 确认信息 -----------------------------------------

//确认框

export const confirmMsg = (
  title: string,
  content: string,
  onConfirm: () => void,
  onCancel: () => void
) => {
  ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      onConfirm();
      return true;
    })
    .catch(() => false);
};
