import React from "react";
import { Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface Props {
  onFileUpload: (file: File | null) => void;
  onProcess: () => void;
}

const UploadDocument: React.FC<Props> = ({ onFileUpload, onProcess }) => {
  const handleBeforeUpload = (file: File) => {
    const isAcceptedType =
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png";

    if (!isAcceptedType) {
      notification.error({
        message: "Invalid File Type",
        description: "Only PDF, JPEG, and PNG files are allowed.",
      });
      return false;
    }

    onFileUpload(file);
    notification.success({
      message: "File Uploaded",
      description: `${file.name} uploaded successfully.`,
    });

    return false; // Prevent auto upload
  };

  return (
    <>
      <Upload beforeUpload={handleBeforeUpload} maxCount={1}>
        <Button icon={<UploadOutlined />} block>
          Select File
        </Button>
      </Upload>
      <Button type="primary" onClick={onProcess} block style={{ marginTop: "16px" }}>
        Process Document
      </Button>
    </>
  );
};

export default UploadDocument;
