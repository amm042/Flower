import React, { Component } from 'react';
import '../../fonts.css';
import { Modal, Button, message, Icon, Row, Col, Form, Input, Divider, Select} from 'antd';
import Requests from '../../Requests.js'
const FormItem = Form.Item;
const Option = Select.Option;


export class AddProject extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loading: false,
      visible: false,
      otherProjects: [],
      activeProjectId: ""
    }

    this.createProject = Requests.createProject.bind(this);
    this.linkProject = Requests.linkProject.bind(this);
    this.getAllOtherProjects = Requests.getAllOtherProjects.bind(this);

    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleJoinProject = this.handleJoinProject.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount(){
    this.getAllOtherProjects()
  }

  showModal() {
    this.setState({ visible: true, projectName: "" });
  }

  handleOk() {
    this.props.changeMode(0)
  }
  handleCancel () {
    this.props.changeMode(0)
  }

  handleNameChange(e){
    this.setState({projectName: e.target.value})
  }

  handleCreateProject(){
    this.createProject(this.state.projectName);
  }

  handleJoinProject(){
    this.linkProject(this.state.activeProjectId);
  }

  handleProjectChange(value){
    this.setState({activeProjectId: value})
  }

  render() {
    const visible = (this.props.open === 1) ? true : false;

    const formLayout = "horizontal";
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;

    return (
      <div>
        <Modal
          visible={visible}
          title="Add Project"
          onCancel={this.handleCancel}
          style={{width: "100%"}}
          footer={null}
        >

        <Row type="flex" justify="space-around" align="top">
          <Col span={11} align="center">
              <Form layout={formLayout}>
                <FormItem
                  label="Choose Project Name"
                  {...formItemLayout}
                >
                  <Input placeholder="Enter Name" onChange={this.handleNameChange.bind(this)}/>
                  <Button type="primary" icon="plus" style={{marginTop:20}} onClick={this.handleCreateProject}>
                    Create Project
                  </Button>
                </FormItem>
              </Form>
          </Col>

          <Col span={11} align="center">
              <Form layout={formLayout}>
                <FormItem
                  label="Join an Existing Project"
                  {...formItemLayout}
                >
                  <Select defaultValue={this.state.activeProjectId} style={{ width: 200 }} onChange={this.handleProjectChange}>
                  {this.state.otherProjects.map((project, i) =>
                    <Option key={project.projectId} value={project.projectId}>{project.name}</Option>
                    )
                  }
                  </Select>
                  <Button type="primary" icon="link" style={{marginTop:20}} onClick={this.handleJoinProject}>Join Project</Button>
                </FormItem>
              </Form>
          </Col>

        </Row>

        </Modal>
      </div>
    );
  }
}
