import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom';
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
                    <NaviBar handleRoute={props.handleRoute} routeName={props.routeName}/>
                    <div className="outlet">
                        <Outlet />
                    </div>
                    
                </div>

            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: parseInt(state.login),
        uid: state.uid,
        username: state.username,
        sidebarOpen: state.sidebarOpen,
        email: state.email,
        routeName: state.routeName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRoute(name) {
            const action = {
                type: 'setRouteName',
                value: name
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)