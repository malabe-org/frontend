import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useEffect, useState } from "react";
import Decision from '../components/boxes/Decision';
import useToken from "../hooks/useToken";
import { getRequestsForPhUser, updateTreatment } from "../services/request";
import { LoadingOutlined } from "@ant-design/icons";
import { getNumberOfTreatedRequests } from "../utils/functions";
import { BASE_SERVER_URL } from "../utils/constants";

/**
 * Generate the table rows for the files
 * @param {*} label 
 * @param {*} infos 
 * @param {*} link 
 * @returns 
 */
function generateTrDocument(label, infos, link) {
  return (
    <tr>
      <td>
        <h6>
          {label}
        </h6>
      </td>
      <td>
        <div className="avatar-group mt-2">
          <p>{link.includes("pdf") ? "PDF" : "IMAGE"}</p>
        </div>
      </td>
      <td>
        <span className="text-xs font-weight-bold">
          {infos == "" ? "Pas d'infos" : infos}
        </span>
      </td>
      <td>
        <div className="avatar-group mt-2">
          <p><a href={BASE_SERVER_URL + link} target="_blank">ICI</a></p>
        </div>
      </td>
    </tr>
  )
}
/**
 * Dashboard of the processing Hub user
 * @returns 
 */
function Home() {
  const { Title, Text } = Typography;

  const [request, setRequest] = useState(undefined);
  const [treated, setTreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({total: 0, treated: 0});
  const {token, setToken } = useToken();
  const user = JSON.parse(token);


  useEffect(async () => {
    let mounted = true;
    setLoading(true);
    await getRequestsForPhUser(user.token).then(async (res) => {
      // console.log(res)
      if (res != "" && mounted && 'treatment' in res.currentRequest ) {
        setRequest(res.currentRequest);
        setStatistics({
          total: res.allRequests.length,
          treated: getNumberOfTreatedRequests(res.allRequests)
        });
        // console.log(res)
        if((!("isOpen" in res.currentRequest.treatment))
          ||
        ("isOpen" in res.currentRequest.treatment && res.currentRequest.treatment.isOpen == false)){
          const values ={
            isOpen: true,
            openDate: Date.now()
          }
          // console.log(!("isOpen" in res.currentRequest.treatment));
          // console.log(("isOpen" in res.currentRequest.treatment && res.currentRequest.treatment.isOpen == false))
          // console.log("Updating", res.currentRequest.treatment._id, values, user.token)
          await updateTreatment(res.currentRequest.treatment._id, values, user.token);
        }
      }
      else {
        setRequest(undefined);
      }
      setLoading(false);
    });

    return () => mounted = false;
  }, [treated])
  // Profile icon data
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  // heart ICON data
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [

    {
      today: "Total",
      title: statistics.total,
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Traités",
      title: statistics.treated,
      icon: heart,
      bnb: "redtext",
    },
    // {
    //   today: "En cours",
    //   title: "800",
    //   icon: cart,
    //   bnb: "bnb2",
    // },
  ];

  return (
    <>{
      loading ?
        <LoadingOutlined style={{fontSize: "100px", color: "red"}} label="En cours de chargement..."/>
        :

        request == undefined || request === "" || request == {} ?
          <h2>Pas de demande à traiter pour le moment.</h2>
          :
          <div className="layout-content">
            <Row className="rowgap-vbox" gutter={[24, 0]}>
              {count.map((c, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  className="mb-24"
                >
                  <Card bordered={false} className="criclebox ">
                    <div className="number">
                      <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                          <span>{c.today}</span>
                          <Title level={3}>
                            {c.title} <small className={c.bnb}>{c.persent}</small>
                          </Title>
                        </Col>
                        <Col xs={6}>
                          <div className="icon-box">{c.icon}</div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[24, 0]}>
              <Col xs={24} md={20} sm={24} lg={12} xl={14} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                  <Row gutter>
                    <Col
                      xs={24}
                      md={12}
                      sm={24}
                      lg={12}
                      xl={14}
                      className="mobile-24"
                    >
                      <div className="h-full col-content p-20">
                        <div className="ant-muse">
                          {/* <Text>Built by developers</Text> */}
                          <Title level={5}>{request.seeker.firstname} {request.seeker.lastname}</Title>
                          <Paragraph className="lastweek mb-36">
                            CNI : <b>{request.seeker._id}</b>
                          </Paragraph>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      md={12}
                      sm={24}
                      lg={12}
                      xl={10}
                      className="col-img"
                    >
                      <div className="ant-cret text-right">
                        <img src={BASE_SERVER_URL + request.documents.seekerPhoto} alt="Photo d'identité" className="border10" />
                        {/* <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGr-YK8gRgAsA/profile-displayphoto-shrink_100_100/0/1626970600352?e=1640822400&v=beta&t=owKOG2iGeEk6f7iNAXz-jzT_bY6fjCubry6AunHvgGo" alt="" className="border10" /> */}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mb-24">
                <Card bordered={false} className="criclebox cardbody h-full">
                  <div className="project-ant">
                    <div>
                      <Title level={5}>Documents</Title>
                    </div>
                  </div>
                  <div className="ant-list-box table-responsive">
                    <table className="width-100">
                      <thead>
                        <tr>
                          <th>DOCUMENT</th>
                          <th>TYPE</th>
                          <th>INFOS</th>
                          <th>LIEN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateTrDocument("Photocopie CNI", "", request.documents.cniCopy)}
                        {generateTrDocument("Quittance de paiement", "", request.documents.receipt)}
                        {generateTrDocument("Photo d'identité", "", request.documents.seekerPhoto)}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mb-24" >
                <Card bordered={false} className="criclebox cardbody h-full">
                  <div className="project-ant">
                    <div>
                      <Title level={5}>Décision</Title>
                    </div>
                  </div>
                  <Decision setTreated={setTreated} treated={treated} treatment={request.treatment} token={user.token} />
                </Card>
              </Col>
            </Row>

          </div>
    }</>
  );
}

export default Home;
