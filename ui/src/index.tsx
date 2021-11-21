import ReactDOM from 'react-dom';
import './index.css';
import React, {MouseEvent} from "react";
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDV419qkjUg5lYSYb02Ox6iv_W8rlUR8CY",
    authDomain: "spell-master-265103.firebaseapp.com",
    projectId: "spell-master-265103",
    storageBucket: "spell-master-265103.appspot.com",
    messagingSenderId: "503751202761",
    appId: "1:503751202761:web:2a381b726a4f880d3fba18",
    measurementId: "G-Z66WGTMSWG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function addWord(event: MouseEvent) {
    console.log(event);
    let addWord = firebase.functions().httpsCallable('addWord');
    addWord({word: "ABCD"}).then((result) => {
        const text = result.data.text;
        console.log(text);
    }).catch(function (error) {
        console.error(error);
    });
}


function Game() {
    return (
        <div className="game">
            <button onClick={signIn}>
                Sign In
            </button>
            <button onClick={addWord}>
                Add Word
            </button>
            <div className="game-board">
                abcd123
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

ReactDOM.render(<Game/>, document.getElementById("root"));
