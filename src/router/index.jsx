import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Error from '../pages/Error'
import Models from '../pages/Models'
import ProjectPage from '../pages/ProjectPage'

const BaseRouter = () => (
    <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Projects />}></Route>
                <Route path='/projects' element={<Projects />}></Route>
                <Route path='/projects/:pid' element={<ProjectPage />}></Route>
                <Route path='/models' element={<Models />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/*" element={<Error />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter