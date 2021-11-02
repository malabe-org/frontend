import {
    Row,
    Col,
    Card,
    Table,
    message,
    Button,
    Avatar,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { getRequestsForPhUser } from "../../services/request";
import { LoadingOutlined } from "@ant-design/icons";
import { getUsers } from "../../services/user";

const { Title } = Typography;

// table code start
const columns = [
    {
        title: "Prénom",
        dataIndex: "prenom",
        key: "prenom",
        width: "32%",
        sorter: true,
    },
    {
        title: "Nom",
        dataIndex: "nom",
        key: "nom",
        sorter: true,

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
];
function buildDataTabelRows(requests) {
    var rows = [];
    requests.map((user, index) => {
        rows.push(
            {
                key: index,
                prenom: (
                    <>
                        <Avatar.Group>
                            <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                // src={face2}
                            ></Avatar>
                            <div className="avatar-info">
                                <Title level={5}>{user.firstname}</Title>
                            </div>
                        </Avatar.Group>{" "}
                    </>
                ),
                nom: (
                    <>
                        <div className="author-info">
                            <Title level={5}>{user.lastname}</Title>
                        </div>
                    </>
                ),

                cni: (
                    <>
                        <div className="author-info">
                            <Title level={5}>{user.cni}</Title>
                        </div>
                    </>
                ),
                role: (
                    <>
                        <div className="ant-employed">
                            <span>{user.role}</span>
                        </div>
                    </>
                ),
                telephone: (
                    <>
                        <div className="ant-employed">
                            <span>{user.telephone}</span>
                        </div>
                    </>
                ),
                email: (
                    <>
                        <div className="ant-employed">
                            <span>{user.email}</span>
                        </div>
                    </>
                ),
            },
        )
    });
    return rows;
}

function UsersList() {

    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const user = JSON.parse(token);
    const [requests, setRequests] = useState(undefined);

    useEffect(async () => {
        let mounted = true;
        setLoading(true);
        await getUsers(user.token).then(req => {
            console.log(req)
            if (req != "" && mounted) {
                setRequests(req.allRequests);
            }
            else {
                setRequests(undefined);
            }
        });
        setLoading(false);

        return () => mounted = false;
    }, []);

    return (
        <>
            {
                loading ?
                    <LoadingOutlined style={{ fontSize: "100px", color: "red" }} label="En cours de chargement..." />
                    :

                    requests == undefined ?
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
                                                dataSource={buildDataTabelRows(requests)}
                                                pagination={false}
                                                className="ant-border-space"
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
            }
        </>
    );
}

export default UsersList;
