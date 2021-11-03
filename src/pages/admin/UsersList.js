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
import { EditOutlined, LoadingOutlined, RedoOutlined, RestOutlined } from "@ant-design/icons";
import { getUsers, signIn, updateUser } from "../../services/user";
import Modal from "antd/lib/modal/Modal";
import { UserForm } from "../../components/boxes/UserForm";
import { error, success } from "../../components/commons";

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
      render: (record) =>
        <>
          {/* <EditOutlined onClick={e => handleEditButton(record)} style={{ cursor: "pointer" }} /> */}
          <Row onClick={() => handleResetPassword(record)} style={{ cursor: "pointer" }} justify="center" align="middle" >
            <Col span={12}>
              <RedoOutlined type="primary" />
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "10px" }} >Reset</span>
            </Col>
          </Row>
        </>
    },
  ];
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useToken();
  const user = JSON.parse(token);
  const [users, setUsers] = useState(undefined);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  // For the modals
  const [isAddingModalVisible, setIsAddingModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const showAddingModal = () => {
    setIsAddingModalVisible(true);
  };
  const showResetModal = () => {
    setIsResetModalVisible(true);
  };
  
  const handleResetOk = async () => {
    console.log(selectedUser);

    setLoading(true);
    await updateUser(
      selectedUser._id,
      {
        password: "passer1234"
      },
      user.token
    ).then(res => {
      if (res != "") {
        setRefresh(!refresh);
        success("Le mot de passe a bien été réinitialisé.")
      }

      else error("Une erreur est survenue lors de la réinitialisation.")
    });
    setLoading(false);
    setIsResetModalVisible(false);
  };

  const handleAddButton = () => {
    showAddingModal();
  }
  const handleAddOk = async (values) => {
    setLoading(true);
    await signIn(values, user.token).then(res => {
      console.log(res);
      if (res != "") {
        success("L'utilisateur a été correctement ajouté.");
        setRefresh(!refresh);
      }
      else error("Une erreur est survenue.");
    })
    setLoading(false);
  }
  const handleResetPassword = (user) => {
    setSelectedUser(user)
    showResetModal();
  }

  useEffect(async () => {
    let mounted = true;
    setLoading(true);
    await getUsers(user.token).then(req => {
      // console.log(req)
      if (req != "" && mounted) {
        setUsers(req.users);
      }
      else {
        setUsers(undefined);
      }
    });
    setLoading(false);

    return () => mounted = false;
  }, [refresh]);

  return (
    <>
      {
        loading ?
          <LoadingOutlined style={{ fontSize: "100px", color: "red" }}/>
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
            <Modal title="Ajouter Utilisateur" visible={isAddingModalVisible} footer={null} onOk={() => setIsAddingModalVisible(false)} onCancel={() => setIsAddingModalVisible(false)}>
              <UserForm handleOk={handleAddOk} />
            </Modal>
            <Modal title="Réinitialiser Mot de passe" visible={isResetModalVisible} onOk={handleResetOk} onCancel={() => setIsResetModalVisible(false)}>
              <p>Voulez-vous vraiment réinitialiser le mot de passe de <b>{selectedUser?.firstname} {selectedUser?.lastname}</b> ? <br /> Le nouveau mot de passe sera :  <b>passer1234</b></p>
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
