import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pages, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const tokenvalue = userData.Data.accessToken;

  const columns = [
    {
      title: "RoleName",
      dataIndex: "roleName",
      key: "id",
    },
  ];

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const url = `${apiUrl}/Role`;

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
        setDataSource(data.Data);

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

  ;
};

export default Roles;
