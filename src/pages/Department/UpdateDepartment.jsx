import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateDepartmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const departmentId = params.id;
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const url = `${apiUrl}/Department/GetById`;

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const tokenvalue = userData.Data.accessToken;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const requestBody = {
        id: departmentId,
        DepartmentName: values.name,
      };
      const response = await fetch(`${apiUrl}/Department`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenvalue}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingledepartment = async () => {
      setLoading(true);

      try {
        console.log(departmentId);
        const response = await fetch(url + `?id=${departmentId}`, {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenvalue}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.Data);
          if (data.Data) {
            form.setFieldsValue({
              name: data.Data.departmentName,
            });
          }
        } else {
          message.error("Giriş başarısız.");

          // window.location.href = "/";
        }
      } catch (error) {
        console.log("Giriş başarısız", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingledepartment();
  }, [apiUrl, departmentId, form]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Department Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateDepartmentPage;
