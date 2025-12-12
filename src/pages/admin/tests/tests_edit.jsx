import React, { useState, useEffect, useMemo } from "react";
import { Titlebar } from "../../../components/titlebar";
import { Card } from "../../../components/card";
import { Row } from "../../../components/row";
import { Col } from "../../../components/column";
import SelectBox from "devextreme-react/select-box";
import { TextBox } from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  AsyncRule,
  CompareRule,
  CustomRule,
} from "devextreme-react/validator";
import TextArea from "devextreme-react/text-area";
import { NumberBox } from "devextreme-react/number-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import { LoadPanel } from "devextreme-react/load-panel";
import DateBox from "devextreme-react/date-box";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import PageConfig from "../../../classes/page-config";
import Assist from "../../../classes/assist";
import axios from "axios";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { useNavigate, useParams } from "react-router-dom";
import HtmlEditor, {
  Toolbar,
  Item,
  MediaResizing,
} from "devextreme-react/html-editor";
import AppInfo from "../../../classes/app-info";

const ExpenseEarningGroupEdit = () => {
    //user
    const navigate = useNavigate();
    const { user } = useAuth();
    const { eId } = useParams(); // Destructure the parameter directly

    //posting
    const [testsName, setTestsName] = useState(null);
    const [testsDescription, setTestsDescription] = useState(null);
    //state for the selected bench ID
    const [selectBenchId, setSelectedBenchId] = useState(null);

    //service
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
        //state for the list of benches
    const [benchesList, setBenchesList] = useState([]);

    const pageConfig = new PageConfig("Tests", "", "", "Tests", "");

    pageConfig.Id = eId == undefined ? 0 : Number(eId);

    //Function to load benches list
    const loadBenches = () => {
        Assist.loadData("Benches", `lab-benches/list`)
            .then((data) => {
              //  console.loadData("Loaded Benches: ", data); //check console to see the keys
                setBenchesList(data);
            })
            .catch((message) => {
                Assist.showMessage(`Failed to load benches: ${message}`, "error");
            });
    };

    
    useEffect(() => {
        loadBenches(); // populates list when the page opens

        //only load if updating item
        if (pageConfig.Id != 0) {
            setLoading(true);

            setTimeout(() => {
                Assist.loadData(pageConfig.Title, `lab-tests/id/${pageConfig.Id}`)
                 .then((data) => {
                    setLoading(false);
                    updateVaues(data);
                    setError(false);
                 })
                 .catch((message) => {
                    setLoading(false);
                    setError(true);
                    Assist.showMessage(message, "error");
                 });
            }, Assist.DEV_DELAY);
        }
    }, []);

    const updateVaues = (data) => {
        setTestsName(data.name);
        setTestsDescription(data.description);
        setSelectedBenchId(data.bench_id); //Update selected bench id when editing
    };

    const onFormSubmit = (e) => {
        setSaving(true);

        e.preventDefault();

        if (!user || !user.sub) {
            console.error("User object missing 'sub' field:", user);
            Assist.showMessage("Authentication error: Logged-in user email not found in token.", "error");
            setSaving(false);
            return;
        }

        const postData = {
         user_id: user.userid,
         name: testsName,
         description: testsDescription,
         bench_id: selectBenchId,
         created_by: user.sub,
        };

        console.log('pd', postData);


        const url = pageConfig.Id == 0
            ? `lab-tests/create`
            : `lab-tests/update/${pageConfig.Id}`;

        setTimeout(() => {
            Assist.postPutData(
                pageConfig.Title,
                url,
                postData,
                pageConfig.Id
            )
                .then((data) => {
                    setSaving(false);
                    updateVaues(data);

                    Assist.showMessage(
                        `You have successfully updated the ${pageConfig.Title}!`,
                        "success"
                    );

                     if (pageConfig.Id == 0) {
                        //navigate
                        navigate(`/admin/tests/edit/${data.id}`);
                     }
                })
                .catch((message) => {
                    setSaving(false);
                    Assist.showMessage(message, "error");
           });
        }, Assist.DEV_DELAY);
    };

    const toolbar = useMemo(() => {
        return AppInfo.htmlToolbar;
    }, []);

    return (
        <div id="pageRoot" className="page-content">
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                position={{ of: "#pageRoot"}}
                visible={loading}
                showIndicator={true}
                shading={true}
                showPane={true}
                hideOnOutsideClick={false}
            />

            <Titlebar
                title={`${pageConfig.verb()} ${pageConfig.Title}`}
                section={"Configuration"}
                icon={"gear"}
                url="#"
            ></Titlebar>
            {/* end widget */}

            {/* chart start*/}
            <Row>
                <Col sz={12} sm={12} lg={7}>
                    <Card title="properties" showHeader={true}>
                        <form id="formMain" onSubmit={onFormSubmit}>
                            <div className="form">
                                <div className="dx-fieldset">
                                    <div className="dx-fieldset-header">NAME</div>
                                    <div className="dx-field">
                                        <div className="dx-field-label">Test Name</div>
                                        <TextBox
                                            className="dx-field-value"
                                            placeholder="Name"
                                            value={testsName}
                                            disabled={error || saving}
                                            onValueChange={(text) => setTestsName(text)}
                                        >
                                             <Validator>
                                                <RequiredRule message="Name is Required" />
                                             </Validator>
                                        </TextBox>
                                    </div>
                                </div>

                                {/*Bench Selection Field*/}
                                <div className="dx-fieldset-header">BENCH</div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Select Bench</div>
                                    <SelectBox
                                        className="dx-field-value"
                                        dataSource={benchesList} //ponts to loaded list
                                        value={selectBenchId} //Binds to our state
                                        onValueChange={(val) => setSelectedBenchId(val)} //updates state on change
                                        displayExpr="name" //Display Bench Name
                                        valueExpr="id" //display bench ID as value
                                        placeholder="Select a Bench"
                                        showClearButton={true}
                                        searchEnabled={true}
                                        disabled={error || saving || loading}
                                    >
                                        <Validator>
                                            <RequiredRule message="Bench is required" />
                                        </Validator>
                                    </SelectBox>
                                </div>

                                <div className="dx-fieldset">
                                    <div className="dx-fieldset-header">DESCRIPTION</div>
                                    <div className="dx-field">
                                        <HtmlEditor
                                           height="225px"
                                           defaultValue={testsDescription}
                                           value={testsDescription}
                                           toolbar={toolbar}
                                           onValueChanged={(e) => setTestsDescription(e.value)}
                                        >
                                            <MediaResizing enabled={true} />
                                            <Validator>
                                                <RequiredRule message="Description is required"/>
                                            </Validator>
                                        </HtmlEditor>
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">
                                       <ValidationSummary id="summaryMain" />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label"></div>
                                    <Button
                                        width="100%"
                                        type={saving ? "normal" : "default"}
                                        disabled={loading || error || saving}
                                        useSubmitBehavior={true}
                                    >
                                        <LoadIndicator 
                                            className="button-indicator"
                                            visible={saving}
                                        />
                                        <span className="dx-button-text">
                                            {pageConfig.verb()} {pageConfig.Title}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ExpenseEarningGroupEdit;
