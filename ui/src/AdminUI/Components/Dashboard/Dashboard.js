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
        //backgroundSize: 'cover',
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


                    <div className="content">
                        <div className="row">
                            <div className="col-lg-4" >
                                <div className="card bg-green-400" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10</h3>
                                            <div className="list-icons ml-auto"><i className="icon-man-woman mr-3 icon-2x"></i>
                                            </div>
                                        </div>

                                        <div>
                                            Total Donors
								 </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4" >
                                <div className="card bg-indigo-400" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10</h3>
                                            <div className="list-icons ml-auto"><i className="icon-collaboration mr-3 icon-2x"></i>
                                            </div>
                                        </div>
                                        <div>
                                            Total Receivers
								 </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card bg-pink-400" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10</h3>
                                            <div className="list-icons ml-auto"><i className="icon-users mr-3 icon-2x"></i>
                                            </div>
                                        </div>

                                        <div>
                                            Total Volunteers
								 </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4" >
                                <div className="card bg-teal-400" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10 </h3>
                                            <div className="list-icons ml-auto"><i className="icon-coins mr-3 icon-2x"></i>
                                            </div>
                                        </div>

                                        <div>
                                            Total Money Donation
								 </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4">
                                <div className="card bg-danger-400" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10</h3>
                                            <div className="list-icons ml-auto"><i className="icon-calendar3 mr-3 icon-2x"></i>
                                            </div>
                                        </div>

                                        <div>
                                            Total Charity Events
								 </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card bg-primary-600" style={style}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <h3 className="font-weight-semibold mb-0">10</h3>
                                            <div className="list-icons ml-auto"><i className="icon-coffee mr-3 icon-2x"></i>
                                            </div>
                                        </div>

                                        <div>
                                            Total Food Donation
								 </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;