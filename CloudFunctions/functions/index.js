'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Deletes a user from auth when a user document is deleted
exports.deleteUser = functions
    .region('europe-west1')
    .firestore
    .document('users/{userID}')
    .onDelete((snapshot, context) => {
        const email = snapshot.data().email;

        return admin.auth().getUserByEmail(email)
            .then((userRecord) => {
                const userUID = userRecord.toJSON().uid;

                return admin.auth().deleteUser(userUID);
            });
    });

// Updates a user's email address in auth
exports.updateUserEmail = functions
    .region('europe-west1')
    .firestore
    .document('users/{userID}')
    .onUpdate((change, context) => {
        const emailBefore = change.before.data().email;
        const emailAfter = change.after.data().email;

        return (emailBefore === emailAfter) ? null
            : admin.auth().getUserByEmail(emailBefore)
                .then((userRecord) => {
                    const userUID = userRecord.toJSON().uid;

                    return admin.auth().updateUser(userUID, {email: emailAfter});
                });
    });

// Sends a notification to a topic with the name {appointmentID}
exports.sendNotification = functions
    .region('europe-west1')
    .firestore
    .document('appointments/{appointmentID}/messages/{messageID}')
    .onCreate((snapshot, context) => {
        const appointmentID = context.params.appointmentID;
        const notificationContent = {
            'notification': {
                'title': 'Prep',
                'body': appointmentID + ': You have a new message!',
            },
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'sound': 'default',
                'status': 'done',
            },
        };

        return (snapshot.data().isPatient) ? null
            : admin
            .messaging()
            .sendToTopic(appointmentID, notificationContent);
    });
