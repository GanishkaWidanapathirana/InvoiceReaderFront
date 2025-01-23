import React, { useState } from "react";
import { Layout, Menu, Button, Upload, Typography, Card, notification, Dropdown, Space, Avatar, Row, Col } from "antd";
import {
  UploadOutlined,
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Handle file upload
  const handleFileChange = (file: File) => {
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
      setUploadedFile(file);
      notification.success({
        message: "Upload Successful",
        description: `${file.name} uploaded successfully.`,
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Upload Failed",
        description: "Only PDF or JPEG files are allowed.",
        placement: "topRight",
      });
    }
    return false; // Prevent automatic upload
  };

  // Simulate processing and generating suggestions
  const handleProcess = () => {
    if (!uploadedFile) {
      notification.error({
        message: "No Document Uploaded",
        description: "Please upload a document before processing.",
        placement: "topRight",
      });
      return;
    }

    const mockSuggestions = [
      `Suggestion for "${uploadedFile.name}" - Item 1`,
      `Suggestion for "${uploadedFile.name}" - Item 2`,
      `Suggestion for "${uploadedFile.name}" - Item 3`,
    ];

    setSuggestions(mockSuggestions);
    notification.success({
      message: "Processing Complete",
      description: "Document processed successfully.",
      placement: "topRight",
    });
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: "#001529" }}>
        <div style={{ height: "32px", margin: "16px", textAlign: "center" }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            InvoicePro
          </Title>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            Documents
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Financial Invoice Analysis
          </Title>

          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span style={{ cursor: "pointer" }}>John Doe</span>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: "16px" }}>
          <Row gutter={[16, 16]}>
            {/* Left Side: Upload and Process */}
            <Col xs={24} md={12}>
              <Card
                title={<Title level={5}>Upload Invoice</Title>}
                bordered
                style={{ height: "100%" }}
              >
                <Upload
                  beforeUpload={handleFileChange}
                  maxCount={1}
                  accept=".pdf, .jpeg, .jpg"
                  style={{ width: "100%" }}
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    block
                    style={{ marginBottom: "16px" }}
                  >
                    Select File
                  </Button>
                </Upload>
                <Button type="primary" block onClick={handleProcess}>
                  Process Document
                </Button>
              </Card>
            </Col>

            {/* Right Side: Suggestions */}
            <Col xs={24} md={12}>
              <Card
                title={<Title level={5}>Document Suggestions</Title>}
                bordered
                style={{ height: "100%" }}
              >
                {suggestions.length > 0 ? (
                  <ul style={{ padding: "0 16px", listStyleType: "circle" }}>
                    {suggestions.map((suggestion, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No suggestions available. Upload and process a document to see suggestions.</p>
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
