import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator, onValue, ref, update } from 'firebase/database';
import { connectAuthEmulator, signInWithCredential, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
// import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9zQTkAgTk3lzVIxl-rmasd28uoed0DUM",
    authDomain: "react-tutorial-93c37.firebaseapp.com",
    databaseURL: "https://react-tutorial-93c37-default-rtdb.firebaseio.com",
    projectId: "react-tutorial-93c37",
    storageBucket: "react-tutorial-93c37.appspot.com",
    messagingSenderId: "532780532992",
    appId: "1:532780532992:web:947c24356b6d273f661fe5",
    measurementId: "G-9B1BRSGK5T"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

if (window.location.href != "https://react-tutorial-93c37.web.app/") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectDatabaseEmulator(database, "127.0.0.1", 9000);

    signInWithCredential(auth, GoogleAuthProvider.credential(
        '{"sub": "pshH0bG443mPoN7EEHbYdv8wJRZA", "email": "benmagevney2024@u.northwestern.edu", "displayName":"test user", "email_verified": true}'
    ));

    // set flag to avoid connecting twice, e.g., because of an editor hot-reload
    window.EMULATION = true;
}

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
            .then(() => setResult(makeResult()))
            .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(getAuth(firebase), setUser)
    ), []);

    return [user];
};