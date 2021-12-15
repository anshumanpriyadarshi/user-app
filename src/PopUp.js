import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { Component } from 'react'
import 'antd/dist/antd.css';

class PopUp extends Component{


    constructor(props){
        super(props);
        this.state={
            name: this.props.user[0].name,
            email: this.props.user[0].email,
            phone: this.props.user[0].phone,
            website: this.props.user[0].website
        }

        this.field = [
            {
                name: ['name'],
                value: this.state.name,
              },
              {
                name: ['email'],
                value: this.state.email,
              },{
                name: ['phone'],
                value: this.state.phone,
              },{
                name: ['website'],
                value: this.state.website,
              },
        ];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.setField = this.setField.bind(this);

    }

    setField(){
        this.field = [
            {
                name: ['name'],
                value: this.state.name,
              },
              {
                name: ['email'],
                value: this.state.email,
              },{
                name: ['phone'],
                value: this.state.phone,
              },{
                name: ['website'],
                value: this.state.website,
              },
        ];
    }

    handleSubmit(evt){
        evt.preventDefault();
        this.props.submit(this.state,this.props.user[0].id);
    }

    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    handleOk(){
        this.props.submit(this.state,this.props.user[0].id);
        this.setField();
    }

    handleCancel(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
        this.props.toggle();
    }

    render(){
        // console.log(this.field)
        return(
            <Modal title="Basic Modal" visible={this.props.visible} 
            okButtonProps={{ form:"form", key:"submit", htmlType:"submit"}}
            cancelButtonProps={{visible: "false"}}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
                <Form 
                preserve={false} 
                fields={this.field}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                id="form"  onSubmit={this.handleSubmit} >
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input type="text" name='name' onChange={this.handleChange} value={this.state.name}/>
                    </Form.Item>
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input type="text" name='email' onChange={this.handleChange} value={this.state.email}/>
                    </Form.Item>
                    <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input type="text" name='phone' onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                    label="Website"
                    name="website"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input className='my-input-style' type="text" name='website' onChange={this.handleChange} value={this.state.website}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }


}

export default PopUp;