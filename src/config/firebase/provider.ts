import { 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider 
} from "firebase/auth"
import { FirebaseAuth } from "./config"

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {

    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider ) 
        const user = result.user
        const { displayName, email, photoURL, uid } = user

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: (error as Error).message
        }
    }

}

export type RegisterUserWithEmail = {
    email: string,
    password: string,
    displayName: string,
}

export const registerUserWithEmail = async ({ email, password, displayName }: RegisterUserWithEmail) => {

    try {

        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = result.user

        await updateProfile( FirebaseAuth.currentUser!, { displayName } )

        return {
            ok: true,
            uid, displayName, email, photoURL
        }

    } catch ( error ) {
        console.log(error)
        return {
            ok: false,
            errorMessage: (error as Error).message
        }
    }

}

export type LoginWithEmailAndPassword = {
    email: string,
    password: string,
}

export const loginWithEmailAndPassword = async ({ email, password }: LoginWithEmailAndPassword) => {
    try {
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, displayName, photoURL } = result.user

        return {
            ok: true,
            uid, displayName, email, photoURL
        }

    } catch( error ) {
        console.log(error)
        return {
            ok: false,
            errorMessage: (error as Error).message 
        }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}