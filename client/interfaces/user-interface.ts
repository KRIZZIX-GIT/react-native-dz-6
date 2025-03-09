
interface UserInterface {
    isAuth: boolean
    user: {
        email: string
        login: string
        password: string
        _id: string
    } | null
    tokens: {
        accessToken: string
        refreshToken: string
    } | null
    registration: (email: string, login: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>

}
export default UserInterface