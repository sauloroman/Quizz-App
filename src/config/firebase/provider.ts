import { 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider 
} from "firebase/auth"
import { FirebaseAuth } from "./config"
import type { LoginWithEmailAndPassword, RegisterUserWithEmail } from "../../interfaces/auth.interface"
import type { User } from "../../interfaces/quizzly.interface"

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

export const registerUserWithEmail = async ({ email, password, name }: RegisterUserWithEmail): Promise<Omit<User, 'password'>> => {
    try {
        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid } = result.user

        await updateProfile( FirebaseAuth.currentUser!, { displayName: name } )

        return {
            id: uid, 
            name, 
            email,
            createdAt: new Date(result.user.metadata.creationTime!)
        }

    } catch ( error ) {
        console.error(error)
        throw error  
    }
}

export const loginWithEmailAndPassword = async ({ email, password }: LoginWithEmailAndPassword): Promise<Omit<User, 'password'>> => {
    try {
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, displayName: name } = result.user

        console.log(result.user)

        return {
            id: uid, 
            name: name ?? 'Usuario sin nombre', 
            email,
            createdAt: new Date(result.user.metadata.creationTime!)
        }

    } catch( error ) {
        console.log(error)
        throw error
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}