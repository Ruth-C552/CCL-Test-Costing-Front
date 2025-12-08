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


  const pageConfig = new PageConfig(
    `Dashboard`,
    "",
    "",
    "User",
    ``,
  );

  useEffect(() => {


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
        <Col xl={2} lg={2}>
          <Ticker
            title={"Savings"}
            value={0}
            color={"green"}
            percent={80}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Loans"}
            value={0}
            color={"red"}
            percent={40}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Interest"}
            value={0}
            color={"orange"}
            percent={70}
          ></Ticker>
        </Col>
        <Col xl={2} lg={2}>
          <Ticker
            title={"Penalty"}
            value={0}
            color={"red"}
            percent={90}
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
      <Row>
        <Col sz={12} sm={12} lg={6}>
          <Card title={"Tests"} showHeader={true}>
            <Card showHeader={false}>
              <DataGrid
                className={"dx-card wide-card"}
                dataSource={[]}
                showColumnHeaders={false}
                keyExpr={"id"}
                noDataText={"No tests added yet"}
                showBorders={false}
                focusedRowEnabled={false}
                defaultFocusedRowIndex={0}
                columnAutoWidth={true}
                columnHidingEnabled={true}
              >
                <Paging defaultPageSize={10} />
                <Editing
                  mode="row"
                  allowUpdating={false}
                  allowDeleting={false}
                  allowAdding={false}
                />
                <Pager showPageSizeSelector={true} showInfo={true} />
                <Column
                  dataField="id"
                  caption="ID"
                  hidingPriority={3}
                  visible={false}
                ></Column>
                <Column
                  dataField="title"
                  caption="Title"
                  hidingPriority={2}
                ></Column>
                <Column
                  dataField="created_at"
                  caption="Date"
                  dataType="date"
                  format={"dd MMMM yyy HH:mm"}
                  hidingPriority={1}
                ></Column>
              </DataGrid>
            </Card>
          </Card>
        </Col>
        <Col sz={12} sm={12} lg={6}>
          <Card title={"Instruments"} showHeader={true}>
            <Card showHeader={false}>
              <DataGrid
                className={"dx-card wide-card"}
                dataSource={[]}
                keyExpr={"id"}
                showColumnHeaders={false}
                noDataText={`No intruments added yet`}
                showBorders={false}
                focusedRowEnabled={false}
                defaultFocusedRowIndex={0}
                columnAutoWidth={true}
                columnHidingEnabled={true}
              >
                <Paging defaultPageSize={10} />
                <Editing
                  mode="row"
                  allowUpdating={false}
                  allowDeleting={false}
                  allowAdding={false}
                />
                <Pager showPageSizeSelector={true} showInfo={true} />

                <Column
                  dataField="id"
                  caption="ID"
                  hidingPriority={3}
                  visible={false}
                ></Column>
                <Column
                  dataField="title"
                  caption="Title"
                  hidingPriority={2}
                ></Column>
                <Column
                  dataField="created_at"
                  caption="Date"
                  dataType="date"
                  format={"dd MMMM yyy HH:mm"}
                  hidingPriority={1}
                ></Column>
              </DataGrid>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
