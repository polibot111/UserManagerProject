import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const LoginLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default LoginLayout;
