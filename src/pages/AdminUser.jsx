import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pages, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const tokenvalue = userData.Data.accessToken;

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "username",
    },
    {
      title: "RoleName",
      dataIndex: "roleName",
      key: "rolename",
    },
    {
      title: "DepartmentName",
      dataIndex: "departmentName",
      key: "departmentname",
    },
  ];

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const page = 0;
  const size = 100;
  const url = `${apiUrl}/User?Page=${page}&Size=${size}`;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenvalue}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataSource(data.Data.items);
        const kalan = data.Data.totalCount % size;
        if (kalan === 0) {
          const pagesize = data.Data.totalCount / size;
        } else {
          const pagesize = data.Data.totalCount / size + 1;
        }

        setPage();
        console.log(`${JSON.stringify(data)}`);
        console.log(`${JSON.stringify(dataSource)}`);
      } else {
        message.error("Giriş başarısız.");

        // window.location.href = "/";
      }
    } catch (error) {
      console.log("Giriş başarısız", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (userDataString) {
      const userData = JSON.parse(userDataString);

      //   setToken(userData.Data.accessToken);
    } else {
      console.log("localStorage'da user anahtarına sahip veri bulunamadı.");
    }
    fetchUsers();
  }, []);

  return (
    <Table rowSelection={pages} columns={columns} dataSource={dataSource} />
  );
};

export default AdminUser;
