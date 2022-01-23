module.exports =  {
    // Sender Side
     SEND_MESSAGE: { value: 'SEND_MESSAGE', description: "Send message from client side", data: "recieverId = sent by sender client and received by receiver cient  ,  message =  sent by sender client and received by receiver cient"},
     RECEIVE_MESSAGE: { value: 'RECEIVE_MESSAGE', description: "Message received at client side ", data: "from =  sent by server and received by receiver cient , message =  sent by sender client and received by receiver cient" },
     REFRESH_CHAT: { value: 'REFRESH_CHAT', description: "refresh chat ", data: "" },
     REPLY_MESSAGE: { value: 'REPLY_MESSAGE' },
     TYPING_START: { value: 'TYPING_START', description: "Emit event from sender and receive event from receiver", data: "from = senderId sent by sender client and received by receiver cient"},
     TYPING_END: { value: 'TYPING_END', description: "Emit event from sender and receive event from receiver", data: "from = senderId sent by sender client and received by receiver cient "},
     USER_DISCONNECTED: { value: 'USER_DISCONNECTED', description: "A user is disconnected: event received on client side", data: "userId = sent from server and received by all clients"},
     USER_CONNECTED: { value: 'USER_CONNECTED', description: "A new user connected: event received on client side", data: "userId = sent from server and received by all clients"},
     MESSAGE_READ: { value: 'MESSAGE_READ', description: "Set message is seen by receiver: Event sent from receiver client side", data: "messageId = sent from receiver client side"},
     ALL_MESSAGE_READ: { value: 'ALL_MESSAGE_READ', description: "Set all conversation message is seen when a conversation is opened: event sent from receiver client side", data: "roomId = sent from receiver client side"}
}