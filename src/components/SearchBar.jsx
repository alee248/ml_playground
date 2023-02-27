import React, { useState } from 'react'
import '../css/SearchBar.css'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'
import debounce from './Debounce';

function SearchBar(props) {

    const navigate = useNavigate()

    const [input, setInput] = useState('')
    const [changed, setChanged] = useState(true)

    const updateInput = e => {
        setInput(e.target.value)
        setChanged(true)
    }

    const handleInput = debounce(updateInput, 200)

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            if (changed) {
                if (input !== '') {
                    setChanged(false)
                    navigate(`/search?input=${input}`)
                } else {
                    setChanged(true)
                    if (window.location.pathname === '/search') {
                        navigate('/')
                    }
                }
    
            } else {
                if (input === '') {
                    navigate('/')
                } else {
                    setInput('')
                    document.getElementById('search-input').value = ''
                    setChanged(true)
                }
    
            }
        }

    }

    return (
        <div className='search-bar-content'>
            <div className="search-bar">
                <div className="search-icon" style={{color: props.login ? '' : 'rgb(245, 245, 245)'}}>
                    <SearchOutlined />
                </div>
                <input id='search-input' className='search-space' placeholder={props.login ? 'Search the website' : ''} disabled={!props.login} onChange={handleInput} onKeyDown={handleSearch} />
            </div>

            <div className="searchbar-btn">
                <Button type='link' style={{ fontSize: '18px' }} onClick={handleSearch} disabled={!props.login}>{changed ? 'Search' : 'Clear'}</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: parseInt(state.login),
        uid: state.uid,
        username: state.username,
        email: state.email,
        server: state.server
    }
}

export default connect(mapStateToProps)(SearchBar)