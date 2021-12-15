import React, { Component } from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteFilled, HeartOutlined , HeartFilled, GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const {Meta} = Card;
const style = {
    color: "rgb(255,0,0)",
    fontSize: '1.5em'
}

class User extends Component{

    constructor(props){
        super(props);
        this.state={
            liked:false
        }
        this.editHandler = this.editHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }


    imgUrlGen(username){
        return `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`
    }

    editHandler(){
        this.props.edit(this.props.id);
    }

    removeHandler(){
        this.props.remove(this.props.id);
    }

    handleLike(){
        this.setState({
            liked:!this.state.liked
        })
    }

    render(){
        let heartIcon;
        if(this.state.liked){
            heartIcon = (<HeartFilled style={style} onClick={this.handleLike}/>)
        }
        else{
            heartIcon = (<HeartOutlined style={style} onClick={this.handleLike}/>)
        }

        return(
            <div>
                <Card
                    headStyle={{color:"black"}}
                    style={{ width:350,textAlign:"left"}}
                    cover={
                    <img
                        alt="example"
                        src={this.imgUrlGen(this.props.username)}
                    />
                    }
                    actions={[<div>{heartIcon}</div>,
                    <EditOutlined key="edit" style={{fontSize:"1.5em"}} onClick={this.editHandler}/>,
                    <DeleteFilled key="ellipsis" style={{fontSize:"1.5em"}} onClick={this.removeHandler}/>,
                    ]}
                    >
                    <Meta
                    title={this.props.name}
                    style={{marginBottom:10, color:"grey"}}
                    />

                    <MailOutlined /><span className='card-desc'> {this.props.email} </span><br/>
                    <PhoneOutlined /><span className='card-desc'> {this.props.phone} </span><br />
                    <GlobalOutlined /><span className='card-desc'> {this.props.website} </span><br />
                    
                </Card>
            </div>
        )
    }
}

export default User;