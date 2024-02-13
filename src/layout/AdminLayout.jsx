import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Roles",
      path: "/admin/roles",
      onClick: () => {
        navigate(`/admin/roles`);
      },
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Department",
      path: "/admin/departments",
      onClick: () => {
        navigate(`/admin/departments`);
      },
    },
  ];

  return (
    <div className="admin-layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} theme="dark">
          <Menu mode="vertical" style={{ height: "100%" }} items={menuItems} />
        </Sider>
        <Layout>
          <Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <h2>Admin Paneli</h2>
            </div>
          </Header>
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: "24px, 50px",
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
