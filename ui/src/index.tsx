import ReactDOM from 'react-dom';
import './index.css';
import {MouseEvent} from "react";
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

function textToSpeech(event: MouseEvent) {

    const context = new AudioContext();

    function playByteArray(bytes: any) {
        var buffer = new Uint8Array(bytes.length);
        buffer.set(new Uint8Array(bytes), 0);
        context.decodeAudioData(buffer.buffer, play);
    }

    function play(audioBuffer: any) {
        var source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start(0);
    }

    let addWord = firebase.functions().httpsCallable('textToSpeech');
    addWord({word: "development"}).then((result) => {
        const audioContent = result.data[0].audioContent;
        playByteArray(Object.values(audioContent))
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
            <button onClick={textToSpeech}>
                Pronounce Word
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
