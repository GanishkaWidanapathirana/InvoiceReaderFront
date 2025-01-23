import React, { useState } from "react";
import { Layout, Typography, Card, Row, Col, Spin, Menu, Dropdown, Space, Avatar } from "antd";
import UploadDocument from "./UploadDocument";
import Suggestions from "./Suggestions";
import { processDocument } from "../services/documentService";
import {
    DashboardOutlined,
    FileTextOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const { Header, Content } = Layout;
const { Title } = Typography;
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

const Dashboard: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleProcess = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    const result = await processDocument(uploadedFile);
    setSuggestions(result);
    setLoading(false);
  };

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
                <Col xs={24} md={12}>
                    <Card title="Upload Document">
                    <UploadDocument onFileUpload={setUploadedFile} onProcess={handleProcess} />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Suggestions" style={{ minHeight: "300px" }}>
                    {loading ? (
                        <div style={{ textAlign: "center", marginTop: "100px" }}>
                        <Spin size="large" />
                        </div>
                    ) : (
                        <Suggestions suggestions={suggestions} />
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
