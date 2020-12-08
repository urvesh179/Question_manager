import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';



function Dashboard(props) {


    var style = {
        height: "150px"
    }

    var path = "../assets/images/bottom-bg.png";
    var bgImageStyle = {
        backgroundImage: "url(" + path + ")",
        height: "100%",
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />

                <div className="content-wrapper" style={bgImageStyle}>
                    <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                        <div className="d-flex">
                            <div className="breadcrumb">
                                <a href="/admin" className="breadcrumb-item"><i className="icon-home2 mr-2"></i> Home</a>
                                <span className="breadcrumb-item active">Dashboard</span>
                            </div>
                            <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
}

export default Dashboard;