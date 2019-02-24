'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions
    .region('europe-west1')
    .firestore
    .document('appointments/{appointmentID}/messages/{messageID}')
    .onCreate((snapshot, context) => {
        if (!snapshot.data().isPatient) {
            const appointmentID = context.params.appointmentID;
            const messageID = context.params.messageID;

            const notificationContent = {
                notification: {
                    title: "/*App name */",
                    body: "You have a new message!",
                    icon: "default",
                    click_action: "/*Package */_TARGET_NOTIFICATION"
                }
            };

            return admin
                .messaging()
                .sendToTopic('/topics/' + appointmentID, notificationContent);
        }
        return null;
    })
