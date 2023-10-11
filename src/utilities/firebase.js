import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';

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