import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Error from '../pages/Error'

const BaseRouter = () => (
    <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Projects />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/*" element={<Error />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter