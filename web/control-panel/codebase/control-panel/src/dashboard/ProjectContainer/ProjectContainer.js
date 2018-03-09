import React, { Component } from 'react';
import './ProjectContainer.css';
import {DeviceNav} from './Device/DeviceNav.js'
import {DeviceContainer} from './Device/DeviceContainer.js'
import {CreateVis} from './CreateVis.js';
import {ClaimDevice} from './ClaimDevice.js';
import {Button, ButtonGroup, Panel, Form, FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap/lib/';

export class ProjectContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showVis: false,
      showClaimDevice: false
    };

  }


  render() {
    const currProject = this.props.user.projects[this.props.activeProject];
    console.log(currProject.devices)
    return (
          <div>

                <Panel className="project-info-panel" bsStyle="primary">
                  <Panel.Heading className="project-info-panel-header">
                    <Panel.Title >
                        <Row>
                          <Col lg={6} md={6} sm={6} lgOffset={1} mdOffset={1} smOffset={0}>
                              <h3 className="project-info-title concert bold"> Project Information: {currProject.name} </h3>
                          </Col>
                          <Col lg={5} md={5} sm={6}>
                            <div className="rowC">
                              <ClaimDevice activeProject={currProject} token={this.props.token}/>
                              <CreateVis activeProject={currProject}/>
                            </div>
                          </Col>
                        </Row>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body className="project-info-body">
                        <Row>
                          <Col md={12}>
                                <Form horizontal>
                                  <FormGroup controlId="projectName">
                                      <Col componentClass={ControlLabel} md={3}> Project Name </Col>
                                      <Col md={8}> <FormControl type="text" placeholder={currProject.name} /> </Col>
                                  </FormGroup>

                                  <FormGroup controlId="adminEmail">
                                      <Col componentClass={ControlLabel} md={3}> Admin Email </Col>
                                      <Col md={8}> <FormControl type="text" placeholder={currProject.email} /> </Col>
                                  </FormGroup>

                                  <FormGroup controlId="projectDescription">
                                      <Col componentClass={ControlLabel} md={3}> Project Description </Col>
                                      <Col componentClass="textarea" md={7}></Col>
                                  </FormGroup>

                                  <Button type="submit">Submit</Button>
                                </Form>
                            </Col>
                          </Row>

                          </Panel.Body>
                          <Panel.Body>

                          <Row>
                              <Col md={3}>
                                <DeviceNav devices={currProject.devices} device={this.props.activeDevice} handler={this.props.handler}></DeviceNav>
                              </Col>
                              <Col md={9}>
                                   <DeviceContainer device={currProject.devices[this.props.activeDevice]}/>
                              </Col>

                          </Row>

                    </Panel.Body>
                  </Panel>

          </div>
    );
  }
}