import React, { useState } from "react";
import { Layout, Typography, Card, Row, Col, Spin, Menu, Dropdown, Space, Avatar } from "antd";
import UploadDocument from "./UploadDocument";
import { processDocument } from "../services/documentService";
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { ApiResponse } from "../types";
import { showError, showSuccess } from "../utils/notifications";
import InvoiceDetails from "./InvoiceDetails"; // Invoice details component
interface DashboardProps {
  userInfo: Record<string, any>;
  onLogout: () => void;
}

const { Header, Content } = Layout;
const { Title } = Typography;

const profileMenu = (onLogout: () => void) => (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Profile
    </Menu.Item>
    <Menu.Item key="2" icon={<SettingOutlined />}>
      Settings
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LogoutOutlined />} danger onClick={onLogout}>
      Logout
    </Menu.Item>
  </Menu>
);

const Dashboard: React.FC<DashboardProps> = ({ userInfo, onLogout }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<ApiResponse | null>(null);
  const [userType, setUserType] = useState<string>("buyer");

  const handleProcess = async () => {
    if (!uploadedFile) return;

    setLoading(true);
    try {
      const result: ApiResponse = await processDocument(uploadedFile, userType);
      setInvoiceData(result);
      showSuccess("Invoice processed successfully!", "Your invoice has been processed successfully!");
    } catch (error) {
      showError("Error processing invoice", "Your invoice failed to process!");
      console.error("Error processing invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: "#001529" }}
        >
          <div
            style={{
              height: "32px",
              margin: "16px",
              textAlign: "center",
            }}
          >
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
          {/* Header */}
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
  
            <Dropdown overlay={profileMenu(onLogout)} trigger={["click"]}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span style={{ cursor: "pointer" }}>{userInfo.username}</span>
              </Space>
            </Dropdown>
          </Header>
  
          <Content style={{ margin: "16px" }}>
            {/* Upload Document Section */}
            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col span={24}>
                <Card
                  title="Upload Document"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <UploadDocument
                    onFileUpload={setUploadedFile}
                    onProcess={handleProcess}
                    setUserType={setUserType}
                  />
                </Card>
              </Col>
            </Row>
  
            {/* Invoice Details Section */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  title="Invoice Details"
                  style={{
                    minHeight: "500px", // Adjust this as per your content height
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  {loading ? (
                    <div style={{ textAlign: "center", marginTop: "100px" }}>
                      <Spin size="large" />
                    </div>
                  ) : (
                    invoiceData && <InvoiceDetails invoice={invoiceData.response} />
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
