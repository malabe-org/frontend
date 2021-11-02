import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Typography,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { getUsers } from "../../services/user";
import Modal from "antd/lib/modal/Modal";
import { UserForm } from "../../components/boxes/UserForm";

const { Title } = Typography;


function buildDataTabelRows(users) {
  var rows = [];
  users.map((user, index) => {
    rows.push(
      {
        key: index,
        prenom: user.firstname,
        nom: user.lastname,
        cni: user.cni,
        role: user.role,
        telephone: user.phone,
        email: (
          <>
            <div className="ant-employed">
              <span>{user.email}</span>
            </div>
          </>
        ),
        update: user
      },
    )
  });
  return rows;
}

function UsersList() {
  const columns = [
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
      width: "32%",
      sorter: (a, b) => a.prenom.length - b.prenom.length,
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      sorter: (a, b) => a.prenom.length - b.prenom.length,
    },
    {
      title: "CNI",
      key: "cni",
      dataIndex: "cni",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      filters: [
        { text: 'PH User', value: 'phUser' },
        { text: 'DH User', value: 'dhUser' },
        { text: 'Admin', value: 'admin' },
        { text: 'Utilisateur', value: 'seeker' },
      ],
      onFilter: (value, record) => record.role.includes(value),
      filterSearch: true,
    },
    {
      title: "Telephone",
      key: "telephone",
      dataIndex: "telephone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "update",
      dataIndex: "update",
      render: (record) => <EditOutlined onClick={e => handleEditButton(record)} style={{ cursor: "pointer" }} />
    },
  ];
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useToken();
  const user = JSON.parse(token);
  const [users, setUsers] = useState(undefined);
  const [currentEditingUser, setCurrentEditingUser] = useState(undefined);
  // For the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setCurrentEditingUser(undefined);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEditingUser(undefined);
  };

  useEffect(async () => {
    let mounted = true;
    setLoading(true);
    await getUsers(user.token).then(req => {
      console.log(req)
      if (req != "" && mounted) {
        setUsers(req.users);
      }
      else {
        setUsers(undefined);
      }
    });
    setLoading(false);

    return () => mounted = false;
  }, []);

  const handleAddButton = () => {
    showModal();
  }

  const handleEditButton = (user) => {
    // console.log(user)
    setCurrentEditingUser(user);
    showModal();
  }

  return (
    <>
      {
        loading ?
          <LoadingOutlined style={{ fontSize: "100px", color: "red" }} label="En cours de chargement..." />
          :
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24} sm={15} md={7} lg={7} xl={7} className="mb-24" >
                <Card bordered={false} className="criclebox cardbody h-full">
                  <div className="project-ant">
                    <Button htmlType="button" type="primary" onClick={handleAddButton} style={{ width: "100%" }}>AJOUTER</Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <Modal title={!currentEditingUser ? "Ajouter Utilisateur" : "Modifier Utilisateur"} visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
              <UserForm currentUser={currentEditingUser} />
            </Modal>
            {users == undefined ?
              <h2>Aucun utilisateur pour le moment.</h2>
              :
              <div className="tabled">
                <Row gutter={[24, 0]}>
                  <Col xs="24" xl={24}>
                    <Card
                      bordered={false}
                      className="criclebox tablespace mb-24"
                      title="Liste des utilisateurs"
                    >
                      <div className="table-responsive">
                        <Table
                          columns={columns}
                          dataSource={buildDataTabelRows(users)}
                          pagination={false}
                          className="ant-border-space"
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            }</>
      }
    </>
  );
}

export default UsersList;
