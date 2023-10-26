export interface AuthResponse {
    body: {
        user: UserActivation
        accessToken: string
        refreshToken: string
    }
}
export interface AuthResponseError {
    body: {
        error: string
        
    }
}
export interface User {
    id: string
    name: string
    userName: string
}