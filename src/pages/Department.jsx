import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pages, setPage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const tokenvalue = userData.Data.accessToken;

  const columns = [
    {
      title: "DepartmentName",
      dataIndex: "departmentName",
      key: "id",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/departments/update/${record.id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteDepartment(record.id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const apiUrl = process.env.REACT_APP_BASE_URL;
  const url = `${apiUrl}/Department`;

  const fetchDepartments = useCallback(async () => {
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

  const deleteDepartment = async (departmentId) => {
    try {
      const requestBody = {
        id: departmentId,
      };
      console.log(departmentId);
      const response = await fetch(`${apiUrl}/Department`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenvalue}`,
        },
        body: JSON.stringify(requestBody).toString(),
      });

      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        fetchDepartments();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    if (userDataString) {
      const userData = JSON.parse(userDataString);

      //   setToken(userData.Data.accessToken);
    } else {
      console.log("localStorage'da user anahtarına sahip veri bulunamadı.");
    }
    fetchDepartments();
  }, []);

  return (
    <Table rowSelection={pages} columns={columns} dataSource={dataSource} />
  );
};

export default Department;
