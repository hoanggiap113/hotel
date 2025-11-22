import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
let message: MessageInstance;
let notification: NotificationInstance;

let modal: ReturnType<typeof App.useApp>["modal"];

export const AntdStaticHolder = () => {
  const staticFunction = App.useApp();

  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;

  return null;
};

export { message, notification, modal };
