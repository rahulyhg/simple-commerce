import React, { Component } from 'react';

import Header from "./Header";
import SideMenu from "./SideMenu";

import routes from '../routes';

class AdminPanel extends Component {
    render() {
        return (
            <div class="admin-panel-wrapper">
                <Header />
                <SideMenu />
                <div className="content-wrapper">
                    {routes}
                </div>
            </div>
        );
    }
}

export default AdminPanel;