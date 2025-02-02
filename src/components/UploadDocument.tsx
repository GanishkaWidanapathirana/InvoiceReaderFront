import React, { useState } from "react";
import { Upload, Button, notification, Select, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Props {
  onFileUpload: (file: File | null) => void;
  onProcess: () => void;
  setUserType: (userType: string) => void; // Callback to set user type
}

const UploadDocument: React.FC<Props> = ({ onFileUpload, onProcess, setUserType }) => {
  const [userType, setUserTypeLocal] = useState<string | null>(null);

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

  const handleUserTypeChange = (value: string) => {
    setUserTypeLocal(value);
    setUserType(value); // Passing the selected user type to parent component
  };

  return (
    <Row gutter={16} style={{ marginTop: "16px" }} align="middle" justify="start">
      {/* File Upload */}
      <Col span={12}>
        <Upload beforeUpload={handleBeforeUpload} maxCount={1}>
          <Button icon={<UploadOutlined />} block>
            Select File
          </Button>
        </Upload>
      </Col>

      {/* User Type Selection */}
      <Col>
        <Select
          value={userType}
          onChange={handleUserTypeChange}
          placeholder="Select User Type"
          style={{ width: "200px", marginLeft: "16px" }}
        >
          <Option value="buyer">Buyer</Option>
          <Option value="vendor">Vendor</Option>
        </Select>
      </Col>

      {/* Buttons (Process and Clear) */}
      <Col>
        <Row gutter={16}>
          <Col>
            <Button
              type="primary"
              onClick={onProcess}
              block
              disabled={!userType}
            >
              Process Document
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              block
              onClick={() => setUserType("")} // Clear user type selection
              disabled={!userType}
            >
              Clear Selection
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UploadDocument;
