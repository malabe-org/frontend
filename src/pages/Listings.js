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
import face2 from "../assets/images/face-2.jpg";
import useToken from "../hooks/useToken";
import { getRequestsForPhUser } from "../services/request";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "AUTEUR",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Requete",
    dataIndex: "requete",
    key: "requete",
  },

  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "DATE SOUMISSION",
    key: "dateSoumission",
    dataIndex: "dateSoumission",
  },
  {
    title: "DATE CLOTURE",
    key: "dateCloture",
    dataIndex: "dateCloture",
  },
];
function buildDataTabelRows(requests) {
  var rows = [];
  requests.map((request, index) => {
    const created_at = new Date(request.created_at);
    rows.push(
      {
        key: index,
        name: (
          <>
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="square"
                size={40}
                src={face2}
              ></Avatar>
              <div className="avatar-info">
                <Title level={5}>{request.seeker.firstname} {request.seeker.lastname}</Title>
                <p>CNI : <b>{request.seeker._id}</b></p>
              </div>
            </Avatar.Group>{" "}
          </>
        ),
        requete: (
          <>
            <div className="author-info">
              <Title level={5}>{request._id}</Title>
            </div>
          </>
        ),

        status: (
          <>

            {request.treatment.decision == "Ok" ?
              <Button type="primary" className="tag-primary">
                {"Conforme"}
              </Button>
              :
              (request.treatment.decision == "Non-Ok" ?
                <Button type="dashed" className="tag-primary">
                  {"Non Conforme"}
                </Button>
                :
                <Button type="default" className="tag-primary">
                  {"Pas traité"}
                </Button>
              )}

          </>
        ),
        dateSoumission: (
          <>
            <div className="ant-employed">
              <span>{created_at.toUTCString()}</span>
            </div>
          </>
        ),
        dateCloture: (
          <>
            <div className="ant-employed">
              {request.treatment.decision == "Ok" ?
                <span>{created_at.toUTCString()}</span>
                :
                ""
              }
            </div>
          </>
        ),
      },
    )
  });
  return rows;
}

function Listings() {

  const [loading, setLoading] = useState(true);
  const { token, setToken } = useToken();
  const user = JSON.parse(token);
  const [requests, setRequests] = useState(undefined);
  
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRequestsForPhUser(user.token).then(req => {
      console.log(req)
      if (req != "" && mounted) {
        setRequests(req.allRequests);
      }
      else {
        setRequests(undefined);
      }
      setLoading(false);
    });

    return () => mounted = false;
  }, []);

  return (
    <>
      {
        loading ?
          <LoadingOutlined style={{ fontSize: "100px", color: "red" }} label="En cours de chargement..." />
          :

          requests == undefined ?
            <h2>Aucune demande assignée.</h2>
            :
            <div className="tabled">
              <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                  <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Liste des requêtes"
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

export default Listings;
