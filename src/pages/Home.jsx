import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import '../css/Home.css'
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import NaviBar from '../components/NaviBar';

function Home(props) {

    return (
        <>
            <div className="home">
                <div className="side-bar">
                    <Sidebar />
                </div>
                <div className="main-page">
                    <SearchBar />
                    <NaviBar />
                    <Outlet />
                </div>
                
            </div>
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        uid: state.uid,
        username: state.username,
        sidebarOpen: state.sidebarOpen,
        email: state.email
    }
}

export default connect(mapStateToProps)(Home)