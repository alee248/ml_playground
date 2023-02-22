import React, { useState } from 'react'
import '../css/SearchBar.css'
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import debounce from './Debounce';

function SearchBar() {

    const [input, setInput] = useState('')

    const updateInput = e => setInput(e.target.value)

    const handleInput = debounce(updateInput)

    const handleSearch = () => {
        // TODO
        console.log(input)
    }

    return (
        <div className='search-bar-content'>
            <div className="search-bar">
                <div className="search-icon">
                    <SearchOutlined />
                </div>
                <input className='search' placeholder='Search the website' onChange={handleInput} />
            </div>

            <div className="search-btn">
                <Button type='link' style={{fontSize: '18px'}} onClick={handleSearch}>Search</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        uid: state.uid,
        username: state.username,
        email: state.email,
        server: state.server
    }
}

export default connect(mapStateToProps)(SearchBar)