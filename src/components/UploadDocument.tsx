import React, { useState } from "react";
import { Upload, Button, notification, Select, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Props {
  onFileUpload: (file: File | null) => void;
  onProcess: () => void;
  setUserType: (userType: string) => void;
}

const UploadDocument: React.FC<Props> = ({ onFileUpload, onProcess, setUserType }) => {
  const [userType, setUserTypeLocal] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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

    setFile(file);
    onFileUpload(file);
    notification.success({
      message: "File Uploaded",
      description: `${file.name} uploaded successfully.`,
    });

    return false; // Prevent auto upload
  };

  const handleUserTypeChange = (value: string) => {
    setUserTypeLocal(value);
    setUserType(value);
  };

  const handleClear = () => {
    setFile(null);
    setUserTypeLocal(null);
    setUserType("");
    onFileUpload(null);
  };

  return (
    <>
      {/* Title Row */}
      <Row style={{ width: "100%", marginBottom: 8 }}>
        <Col>
          <Typography.Title level={5} style={{ margin: 0, fontWeight: "bold" }}>
            Upload File Here
          </Typography.Title>
        </Col>
      </Row>

      {/* Content Row */}
      <Row 
        style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}
        gutter={16}
      >
        {/* File Upload */}
        <Col flex="500px">
          <Upload 
            beforeUpload={handleBeforeUpload} 
            maxCount={1}
            showUploadList={false}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button icon={<UploadOutlined />}>
                Select File
              </Button>
              {file && (
                <span style={{ 
                  flex: 1, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap' 
                }}>
                  {file.name}
                </span>
              )}
            </div>
          </Upload>
        </Col>

        {/* User Type Selection */}
        <Col flex="200px">
          <Select
            value={userType}
            onChange={handleUserTypeChange}
            placeholder="Select User Type"
            style={{ width: "100%" }}
          >
            <Option value="buyer">Buyer</Option>
            <Option value="vendor">Vendor</Option>
          </Select>
        </Col>

        {/* Process Button */}
        <Col flex="150px">
          <Button 
            type="primary" 
            onClick={onProcess} 
            block 
            disabled={!userType}
          >
            Process
          </Button>
        </Col>

        {/* Clear Button */}
        <Col flex="150px">
          <Button 
            onClick={handleClear} 
            block 
            disabled={!userType}
            danger
          >
            Clear
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UploadDocument;