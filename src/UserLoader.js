import React, { Component } from 'react'
import User from "./User"
import { Row,Col } from 'antd';
import axios from "axios"
import './UserLoader.css';
import PopUp from './PopUp';

const USER_URL = "https://jsonplaceholder.typicode.com/users";

class UserLoader extends Component{
    constructor(props){
        super(props);

        this.state = {
            users: null,
            isLoaded : false,
            isEditing : false,
            selectedUser : null
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    async componentDidMount(){

        let user = await axios.get(USER_URL);
        // console.log(user);
        await setTimeout(()=>{
            this.setState(st=>({
                users : user.data,
                isLoaded: true
            }))
        },3000);

       
        
    }
    
    handleEdit(id){
        // console.log("in Edit",id)
        this.setState({
            isEditing: true,
            selectedUser: this.state.users.filter(user=> user.id===id)
        })
        
    }

    handleRemove(id){
        this.setState(st=>({
            users: st.users.filter(u=> u.id !== id)
        }))
    }

    handleSubmit(u,id){
        // console.log("changing state")
        const updatedUsers = this.state.users.map(user => {
            if(user.id === id){
                return {
                    ...user,
                    email: u.email,
                    name: u.name,
                    phone: u.phone,
                    website: u.website
                }
            }
            return user;
        });
        this.setState({
            users: updatedUsers,
            isEditing: false,
            selectedUser: null
        });
    }
    
    handleToggle(){
        this.setState({
            isEditing: false,
            selectedUser: null
        })
    }

    render(){
            // console.log(this.state.users);
            let result;
            if(!this.state.isLoaded){
                result=(
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                )
            }
            else{
                if(this.state.users !== null){
                        let row = this.state.users.map(user=>(
                        <Col key={user.id} >
                            <User 
                            key={user.id} 
                            id={user.id} 
                            name={user.name} 
                            username={user.username} 
                            email={user.email} 
                            phone={user.phone} 
                            website={user.website}
                            edit={this.handleEdit}
                            remove={this.handleRemove}
                            >
                            </User>
                        </Col>
                        
                    ))

                    result=(<Row justify='start' gutter={[16,16]} xs={1} sm={2} md={3} lg={6} >{row}</Row>)
                }
            }
            let u;
            if(this.state.selectedUser !== null){
                u=(
                    <PopUp toggle={this.handleToggle} submit={this.handleSubmit} visible={this.state.isEditing} user={this.state.selectedUser} />
                )
            }
           

        return(
            <div>
                {u}
                {result}
            </div>
        )
    }
}

export default UserLoader;