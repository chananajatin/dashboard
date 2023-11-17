import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Modal from "./Modal";

const { Title } = Typography;

const StyledContainer = styled.div`
  max-width: 5xl;
  margin: 8rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #3494e6, #ec6ead);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: #3494e6;
  border-color: #3494e6;

  &:hover {
    background-color: #2c7bb6;
    border-color: #2c7bb6;
  }
`;

const UserDetailsTab = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://dashboard-ohmd.onrender.com/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.creationDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, user) => (
        <StyledButton onClick={() => handleGenerateReport(user._id)}>
          Generate Report
        </StyledButton>
      ),
    },
  ];

  const handleGenerateReport = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledContainer>
      <Title level={2} className="text-center mb-4" style={{ color: "white" }}>
        User Details
      </Title>

      <StyledInput
        prefix={<SearchOutlined />}
        placeholder="Search by username, email, id, creation date or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        bordered
        className="mt-4"
      />

      <Modal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </StyledContainer>
  );
};

export default UserDetailsTab;
