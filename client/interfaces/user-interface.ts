
interface UserInterface {
    //store
    // nicknameChange: (nickname: string, userId: string) => Promise<void>
    // surnameChange: (surname: string, userId: string) => Promise<void>
    // nameChange: (name: string, userId: string) => Promise<void>
    // logout: () => Promise<void>
    // deleteUser: () => Promise<void>
    // ForgotPassword: (email: string) => Promise<void>
    // veryfyResetCode: (email: string, code: string) => Promise<void>
    // changePassword: (email: string, password: string) => Promise<void>
    // newPassword: (oldPassword: string, newPassword: string, email: string) => Promise<void>

    user: {
        email: string
        login: string
        password: string
        id: string
    } | null
    tokens: {
        accessToken: string
        refreshToken: string
    } | null
    registration: (email: string, login: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>

}
export default UserInterface