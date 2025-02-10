import React, { useState } from "react";
import { Layout, Typography, Menu, Dropdown, Space, Avatar } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UploadPage from "./UploadPage";
import ViewInvoices from "./ViewInvoices";
import AskQuestions from "./AskQuestions";
interface DashboardProps {
  userInfo: Record<string, any>;
  onLogout: () => void;
}

const { Sider, Header, Content, Footer } = Layout;
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
  
  const [activeComponent, setActiveComponent] = useState("upload");
  const[documentId,setDocumentId]=useState<string | null>(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "viewInvoices":
        return <ViewInvoices userInfo={userInfo} />;
      case "askQuestions":
        return <AskQuestions documentId={documentId} />;
      case "upload":
      default:
        return <UploadPage setDocumentId={setDocumentId} userInfo={userInfo}/>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Layout style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          style={{
            background: "#001529",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#fff" }}>
            Welcome,Financial Invoice Analysis
          </Title>

          <Menu theme="dark" mode="horizontal" style={{ flex: 1, justifyContent: "right" }}>
            <Menu.Item key="upload" onClick={() => setActiveComponent("upload")}>
              Upload
            </Menu.Item>
            <Menu.Item key="invoices" onClick={() => setActiveComponent("viewInvoices")}>
              View Invoices
            </Menu.Item>
            <Menu.Item key="questions" onClick={() => setActiveComponent("askQuestions")}>
              Ask Questions
            </Menu.Item>
          </Menu>

          <Dropdown overlay={profileMenu(onLogout)} trigger={["click"]}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span style={{ cursor: "pointer", color: "#fff" }}>{userInfo.username}</span>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: 0, flex: 1, overflow: "hidden" }}>{renderComponent()}</Content>

        <Footer
          style={{
            textAlign: "center",
            padding: "10px 50px",
            width: "100%",
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          <div>© 2025 InvoicePro, Inc. All rights reserved.</div>
          <div>Contact us: support@invoicepro.com</div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
