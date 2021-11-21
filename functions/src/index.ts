import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {CallableContext} from "firebase-functions/lib/common/providers/https";

admin.initializeApp();
const https = functions.https;

// https://github.com/firebase/quickstart-js/blob/master/functions/public/scripts/main.js
const addWord = https.onCall((data: any, context: CallableContext) => {
    const word = data.word;

    if (!context.auth) {
        throw new https.HttpsError('failed-precondition', 'Authentication Error');
    }

    // TODO add word validation
    if (!(typeof word === 'string') || word.length === 0) {
        throw new https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }

    // Saving the new message to the Realtime Database.
    return admin.database().ref(`users/${context.auth.uid}/words`)
        .push({
            word: word,
        })
        .then(() => ({word: word}))
        .catch((error) => {
            throw new https.HttpsError('unknown', error.message, error);
        });
});

export {addWord};
