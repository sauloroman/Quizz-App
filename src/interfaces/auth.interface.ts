export type AuthStatus = 'authenticated' | 'unauthenticated' | 'pending'
export const AuthStatus = {
    authenticated: 'authenticated' as AuthStatus,
    unauthenticated: 'unauthenticated' as AuthStatus,
    pending: 'pending' as AuthStatus
}

export interface RegisterUserWithEmail {
    email: string,
    password: string,
    name: string
}

export interface LoginWithEmailAndPassword {
    email: string,
    password: string,
}