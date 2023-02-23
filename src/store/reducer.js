let login = sessionStorage.getItem('login') ? sessionStorage.getItem('login') : 0
let username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : null
let uid = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : -1
let email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : null
let password = sessionStorage.getItem('password') ? sessionStorage.getItem('password') : null
let sidebarOpen = sessionStorage.getItem('sidebarOpen') ? sessionStorage.getItem('sidebarOpen') : 1

const defaultState = {
    login,
    username,
    password,
    uid,
    email,
    sidebarOpen,
    routeName: '',
    server: 'http://localhost:8080'
}

export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case "userInfo":
            const user = action.value
            sessionStorage.setItem('login', 1)
            sessionStorage.setItem('username', user.Username)
            sessionStorage.setItem('uid', user.Id)
            sessionStorage.setItem('email', user.Email)
            sessionStorage.setItem('password', user.Password)
            newState.login = sessionStorage.getItem('login')
            newState.username = sessionStorage.getItem('username')
            newState.uid = sessionStorage.getItem('uid')
            newState.email = sessionStorage.getItem('email')
            newState.password = sessionStorage.getItem('password')
            break

        case "logout":
            sessionStorage.setItem('login', 0)
            sessionStorage.setItem('username', '')
            sessionStorage.setItem('uid', -1)
            sessionStorage.setItem('email', '')
            sessionStorage.setItem('password', '')
            newState.login = sessionStorage.getItem('login')
            newState.username = sessionStorage.getItem('username')
            newState.uid = sessionStorage.getItem('uid')
            newState.email = sessionStorage.getItem('email')
            newState.email = sessionStorage.getItem('password')
            break

        case "sidebar":
            sessionStorage.setItem('sidebarOpen', state.sidebarOpen === '1' ? '0' : '1')
            newState.sidebarOpen = sessionStorage.getItem('sidebarOpen')
            break

        case "setRouteName":
            newState.routeName = action.value
            break

        default:
            break
    }

    return newState
}