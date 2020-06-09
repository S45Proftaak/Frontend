import React, { Component } from 'react';
import RoleChange from './subcomponents/Admin/RoleChange';
import PriceChange from './subcomponents/Admin/PriceChange';

class Admin extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <RoleChange></RoleChange>
                <PriceChange/>
            </div>
        );
    }
}

export default Admin;