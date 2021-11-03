import { Modal } from "antd";

export function success(content) {
    Modal.success({
      content: content,
    });
  }
  
export function error(content) {
    Modal.error({
      // title: 'Une erreur ',
      content: content,
    });
  }
  