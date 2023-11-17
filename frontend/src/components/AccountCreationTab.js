import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Form, Input, Button, Typography, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const StyledContainer = styled.div`
  max-width: 400px;
  margin: 8rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #3494e6, #ec6ead);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const AccountCreationTab = () => {
  const auth = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/users", { ...values });
      console.log("Account created successfully");
      openNotification(
        "success",
        "Account Created",
        "Your account has been created successfully."
      );
      auth.login();
    } catch (error) {
      console.error("Error creating account:", error);
      openNotification(
        "error",
        "Error",
        "An error occurred while creating your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Title level={2} className="text-center mb-6" style={{ color: "white" }}>
        Account Creation
      </Title>
      <StyledForm onFinish={handleFormSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid email address!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit" loading={loading} >
            Create Account
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </StyledContainer>
  );
};

export default AccountCreationTab;
