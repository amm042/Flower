import React, { Component } from 'react';
import './Dashboard.css';
import {ProjectNav} from './ProjectNav/ProjectNav.js'
import {ProjectContainer} from './ProjectContainer/ProjectContainer.js'
import {Row, Col} from 'react-bootstrap/lib/'


export class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.projectNavHandler = this.projectNavHandler.bind(this);
    this.deviceNavHandler = this.deviceNavHandler.bind(this);

    this.state = {
      activeProject: 0,
      activeDevice: 0,
      user: this.props.researcher
      }
    }

  componentDidMount(){
      var xhr = new XMLHttpRequest();
      var url = 'http://127.0.0.1:5000/read?table=device&fields=*&condition=projectId is null';
      xhr.open('GET', url);
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      const scope = this;
      xhr.onload = function() {
        scope.setState({unclaimedDevices: xhr.response, show: true});
      };
      xhr.send();
      //this.setState({show: true})
  }

  projectNavHandler(active) {
    this.setState({
      activeProject: active,
      activeDevice: 0
    })
  }

  deviceNavHandler(active){
    this.setState({
      activeDevice: active
    })
  }

  render() {
  	const projectNav = <ProjectNav user={this.state.user} handler={this.projectNavHandler}/>;
    const projectContainer = <ProjectContainer user={this.state.user} 
                                               handler={this.deviceNavHandler} 
                                               activeProject={this.state.activeProject} 
                                               activeDevice={this.state.activeDevice}
                                               token={this.props.token}/>

    return (
        <div className="dashboard-main">
            <Row>
              <Col id="navCol" xl={3} lg={3} md={3} sm={3}>
                  {projectNav}
              </Col>
              <Col id="projCol" xl={9} lg={9} md={9} sm={9}>
                  {projectContainer}
              </Col>
            </Row>
        </div>
    );
  }

}