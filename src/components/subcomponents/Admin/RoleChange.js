import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { withTranslation } from "react-i18next";
import { makeHttpCall, requestTypes } from '../../../helpers/httpHelper';
import {
    fetchAdminData,
    fetchedAdminData,
    changeUserRole
} from "../../../redux/actions/AdminActions";
import { compose } from "redux";
import { connect } from "react-redux";
import "./CSS/RoleChangeStyle.css";
import "../CSS/Default.css";

class RoleChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: this.props.users,
            posting: false,
            posted: false,
            postAdress: "http://localhost:8020/admin/updateUserRole",

            submitted: false,
        }
    }

    handleSelect(role, roleId, Id) {

        {/* Change role to new role */}
        var elementsIndex = this.props.users.findIndex(element => element.id === Id)
        var newArray = this.props.users
        newArray[elementsIndex].role.name = role;
        newArray[elementsIndex].role.id = roleId;

        this.setState({

            userArray: newArray,
        });
        console.log(this.state.userArray);

        changeUserRole(newArray);
    }

    handleRoleName(role) {
        switch (role) {
            case "ROLE_EMPLOYEE":
                return "Admin.Employee";
            case "ROLE_SECRETARY":
                return "Admin.Secretary";
            case "ROLE_ADMIN":
                return "Admin.Admin";
            default:
                return "Admin.Employee";
        }
    }

    componentDidMount() {
        makeHttpCall("http://localhost:8020/admin/getAllUsers", this.props.token, requestTypes.GET).then
            ((res) => {
                this.props.fetchedAdminData(res);

                return res;
            })
    }

    loadPage() {
        this.setState({
            loadPage: true
        });
    }

    checkProps() {
        console.log(this.props.users);
    }

    handleSubmit = () => {
        console.log(this.state.userArray);

        this.submitRoleChanges();
    }

    submitRoleChanges() {
        if(this.state.userArray != null){

            for (var i = 0; i < this.state.userArray.length; i++) {
                this.PostValues(this.state.postAdress, i);
            }
        }
    }

    PostValues = (postAdress, userId) => {
        this.setState({
                      posting: true,
                      });
        makeHttpCall(
            postAdress,
            this.props.token,
            requestTypes.PUT,
            {userID: this.state.userArray[userId].id,
             roleID: this.state.userArray[userId].role.id,}
        ).then(() => {
            this.setState({
                posting: false,
                posted: true,
            });
        });
    }

    render() {
        const { t, users } = this.props;
        
        let postFeedback;
        if(this.state.posted){
            postFeedback = <div>Roles updated successfully</div>;
        }
        else{
            postFeedback = <div></div>;
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                {t("Admin.Email")}
                            </th>
                            <th>
                                {t("Admin.Name")}
                            </th>
                            <th>
                                {t("Admin.Role")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users !== undefined ? this.props.users.map(user =>
                            <tr key={user.id}>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    <Dropdown>
                                                <Dropdown.Toggle>
                                                    {t(this.handleRoleName(user.role.name))}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_EMPLOYEE", 1, user.id)}>{t("Admin.Employee")}</Dropdown.Item>
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_SECRETARY", 3, user.id)}>{t("Admin.Secretary")}</Dropdown.Item>
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_ADMIN", 2, user.id)}>{t("Admin.Admin")}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                </td>
                            </tr>
                        ) : <div></div>}
                    </tbody>
                </table>
                    <input className="SubmitButton" type="submit" value="submit" onClick={this.handleSubmit}/>
                    {postFeedback}
            </div>
        );
    }
}

const MyComponent = compose(
    withTranslation(),
    connect(
        (state) => {
            return {
                links: state.loginReducer.payload.links,
                token: state.loginReducer.payload.token,
                adminfetched: state.AdminReducer.fetchedAdminData,
                users: state.AdminReducer.payload.users
            };
        },
        {
            fetchAdminData,
            fetchedAdminData,
            changeUserRole
        }
    )
)(RoleChange);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
    return (
        <React.Suspense fallback="loading">
            <MyComponent />
        </React.Suspense>
    );
}