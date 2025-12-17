import React, { useState, useEffect, useMemo } from "react";
import { Ticker } from "../components/ticker.jsx";
import { Titlebar } from "../components/titlebar.js";
import { Card } from "../components/card.js";
import { Row } from "../components/row.jsx";
import { Col } from "../components/column.js";
import { NotificationList } from "../components/notificationList.jsx";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from "devextreme-react/chart";
import { LoadPanel } from "devextreme-react/load-panel";
import { useAuth } from "../context/AuthContext.jsx";
import PageConfig from "../classes/page-config.js";
import Assist from "../classes/assist.js";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  ColumnChooser,
  Editing,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { useNavigate } from "react-router-dom";

const MyDashboard = () => {
  //user

  const [loading, setLoading] = useState(false);

  //State for Lists
  const [testsData, setTestsData] = useState([]);
  const [instrumentsData, setInstrumentsData] = useState([]);
  const [benchesData, setBenchesData] = useState([]);

  //State for Counts (Top Widgets)
  const [userCount, setUserCount] = useState(0);

  const pageConfig = new PageConfig(`Dashboard`, "", "", "User", ``,);

  useEffect(() => {
    setLoading(true);

    //Fetch all data from backend to populate counts and lists
    Promise.all([
      Assist.loadData("Users", "users/list"),
      Assist.loadData("Tests", "lab-tests/list"),
      Assist.loadData("Instruments", "lab-instruments/list"),
      Assist.loadData("Benches", "lab-benches/list"),

    ])
    //cast entire result array
    .then((results: any) => {
      // destructure them safely
      const [users, tests, instruments, benches] = results;

      setUserCount(users.length);
      setTestsData(tests);
      setInstrumentsData(instruments);
      setBenchesData(benches);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.error(err);
    });

  }, []);


  return (
    <div className="page-content" style={{ minHeight: "862px" }}>
      <LoadPanel
        shadingColor="rgba(248, 242, 242, 0.9)"
        position={{ of: "#pageRoot" }}
        visible={loading}
        showIndicator={true}
        shading={true}
        showPane={true}
        hideOnOutsideClick={false}
      />
      <Titlebar
        title={pageConfig.Title}
        section={"Home"}
        icon={"home"}
        url={""}
      ></Titlebar>

      {/* start widget */}
      <Row>
        <Col xl={3} lg={2} sm={6}>
          <Ticker
            title={"Total Users"}
            value={userCount}
            color={"blue"}
            percent={100}
          ></Ticker>
        </Col>
        <Col xl={3} lg={2} sm={6}>
          <Ticker
            title={"Total Tests"}
            value={testsData.length}
            color={"green"}
            percent={100}
          ></Ticker>
        </Col>
        <Col xl={3} lg={3} sm={6}>
          <Ticker
            title={"Total Instruments"}
            value={instrumentsData.length}
            color={"orange"}
            percent={100}
          ></Ticker>
        </Col>
        <Col xl={3} lg={3} sm={6}>
          <Ticker
            title={"Total Benches"}
            value={benchesData.length}
            color={"red"}
            percent={100}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Share"}
            value={0}
            color={"blue"}
            percent={90}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Social"}
            value={0}
            color={"green"}
            percent={90}
          ></Ticker>
        </Col>
      </Row>
      {/* end widget */}

      {/* chart start */}
      {/* Tests and Instruments Lists - Side by Side */}
      <Row>
        <Col sz={12} sm={12} lg={6}>
          <Card title={"Recent Tests"} showHeader={true}>
              <DataGrid
                className={"dx-card wide-card"}
                dataSource={testsData}
                keyExpr={"id"}
                showBorders={true}
                columnAutoWidth={true}
                noDataText={"No tests added yet"}
              >
                <Paging defaultPageSize={5} />
                <Column dataField="name" caption="Test Name" />
                <Column 
                  dataField="created_at" 
                  caption="Date" 
                  dataType="date" 
                  format={"dd MMM yyyy"} 
                />
              </DataGrid>
          </Card>
        </Col>

        <Col sz={12} sm={12} lg={6}>
          <Card title={"Recent Instruments"} showHeader={true}>
              <DataGrid
                className={"dx-card wide-card"}
                dataSource={instrumentsData}
                keyExpr={"id"}
                showBorders={true}
                columnAutoWidth={true}
                noDataText={`No instruments added yet`}
              >
                <Paging defaultPageSize={5} />
                <Column dataField="name" caption="Instrument" />
                <Column 
                  dataField="cost" 
                  caption="Cost" 
                  format="K #,##0.00" 
                  dataType="number"
                />
              </DataGrid>
          </Card>
        </Col>
      </Row>

      {/*Benches List - Full Width */}
      <Row>
        <Col sz={12} sm={12} lg={12}>
          <Card title={"Bench List"} showHeader={true}>
            <DataGrid
              className={"dx-card wide-card"}
              dataSource={benchesData}
              keyExpr={"id"}
              showBorders={true}
              columnAutoWidth={true}
              noDataText={"No Benches Found"}
            >
              <Paging defaultPageSize={5} />
              <Column dataField="id" caption="ID" visible={false} />
              <Column dataField="name" caption="Bench Name" />
              <Column dataField="description" caption="Description" />
              <Column
                dataField="created_at"
                caption="Date Created"
                dataType="date"
                format={"dd MMMM yyyy"}
              />
            </DataGrid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
