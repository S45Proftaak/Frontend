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

class RoleChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [{ Id: "1", Email: "rico@test.nl", Name: "Rico Muijtjens", Role: "ROLE_ADMIN" },
            { Id: "2", Email: "duncan@test.nl", Name: "Duncan Schoenmakers", Role: "ROLE_EMPLOYEE" }],
            loadPage: false
        }
    }

    handleSelect(role, Id) {

        var elementsIndex = this.props.users.findIndex(element => element.id === Id)
        var newArray = this.props.users
        newArray[elementsIndex].role.name = role;

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
        makeHttpCall("http://localhost:8020/admin/getAllUsers", this.props.token, requestTypes.GET, null).then
            ((res) => {
                this.props.fetchedAdminData(res);
                return res;
            })
    }

    loadPage(){
        this.setState({
            loadPage: true
        });
    }

    checkProps(){
        console.log(this.props.users);
    }

    render() {
        const { t, users } = this.props;
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
                            {this.props.users.map(user =>
                                <tbody key={user.id}>
                                    <tr>
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
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_EMPLOYEE", user.id)}>{t("Admin.Employee")}</Dropdown.Item>
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_SECRETARY", user.id)}>{t("Admin.Secretary")}</Dropdown.Item>
                                                    <Dropdown.Item onSelect={() => this.handleSelect("ROLE_ADMIN", user.id)}>{t("Admin.Admin")}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
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