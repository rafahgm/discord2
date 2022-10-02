import { FirebaseError, initializeApp } from 'firebase/app';
import {
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
} from 'firebase/firestore';

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    browserLocalPersistence,
} from 'firebase/auth';

import Swal from 'sweetalert2';

const firebaseConfig = {
    apiKey: 'AIzaSyDLtURgwmUDemrN__i3wkYDT9Oah9-W5Q4',
    authDomain: 'discord2-ae037.firebaseapp.com',
    projectId: 'discord2-ae037',
    storageBucket: 'discord2-ae037.appspot.com',
    messagingSenderId: '98849128398',
    appId: '1:98849128398:web:626f3d322fb6bfcd74b59f',
};

export const app = initializeApp(firebaseConfig);

export const getMessages = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(
        query(collection(db, 'chat'), orderBy('timestamp', 'asc'))
    );
    return querySnapshot.docs;
};

export const subscribeMessages = (callback: Function) => {
    const db = getFirestore(app);
    return onSnapshot(
        query(collection(db, 'chat'), orderBy('timestamp', 'asc')),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            callback(messages);
        }
    );
};

export const sendMessage = async (message: Message) => {
    const db = getFirestore(app);
    try {
        await addDoc(collection(db, 'chat'), {
            ...message,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const auth = getAuth(app);
        const { user } = await auth
            .setPersistence(browserLocalPersistence)
            .then(() => signInWithEmailAndPassword(auth, email, password));

        return user;
    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/user-not-found':
                    Swal.fire({
                        icon: 'error',
                        text: 'Usuário não encontrado',
                    });
                    break;

                case 'auth/wrong-password':
                    Swal.fire({
                        icon: 'error',
                        text: 'Senha incorreta',
                    });
                    break;
            }
        }

        return null;
    }
};

export const createUser = async (
    email: string,
    password: string,
    displayName: string
) => {
    try {
        const auth = getAuth(app);

        // Create user for authentication
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Insert user into database for message exchanging
        const db = getFirestore(app);
        const discordUser: DiscordUser = {
            uid: user.uid,
            displayName: displayName,
            email: user.email ?? '',
            friends: [],
        };

        await addDoc(collection(db, 'users'), {
            ...discordUser,
            createdAt: serverTimestamp(),
        });

        return user;
    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    Swal.fire({
                        icon: 'error',
                        text: 'Email já cadastrado',
                    });
                    break;
                case 'auth/invalid-email':
                    Swal.fire({
                        icon: 'error',
                        text: 'Email inválido',
                    });
                    break;
                case 'auth/weak-password':
                    Swal.fire({
                        icon: 'error',
                        text: 'Senha fraca',
                    });
                    break;
            }
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Erro desconhecido',
            });
        }

        return null;
    }
};

export const logout = async () => {
    const auth = getAuth(app);
    const obj = await auth.signOut();
    console.log(obj);
};
