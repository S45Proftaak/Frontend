import React, { Component } from 'react';
import RoleChange from './subcomponents/Admin/RoleChange';

class Admin extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <RoleChange></RoleChange>
            </div>
        );
    }
}

export default Admin;