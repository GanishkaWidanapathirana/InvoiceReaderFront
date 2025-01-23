import { notification } from "antd";

export const showSuccess = (message: string, description: string): void => {
  notification.success({
    message,
    description,
    placement: "topRight",
  });
};

export const showError = (message: string, description: string): void => {
  notification.error({
    message,
    description,
    placement: "topRight",
  });
};
