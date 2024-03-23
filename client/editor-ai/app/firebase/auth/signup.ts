
import firebase_app from "../config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email:string, password:string, fullName:string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        if (result.user) {
            await updateProfile(result.user, { displayName: fullName });
            await result.user.reload(); // Reload the user's profile

        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}