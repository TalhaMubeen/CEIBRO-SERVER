import { ChatListInterface, ChatMessageInterface } from "./interfaces/chat.interface";

export const CHAT_LIST: ChatListInterface[] = [
    {
        bookmarked: false,
        username: 'Paul Mets',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 0,
        lastMessageTime: '10:24pm'
    },
    {
        bookmarked: true,
        username: 'Indrek Lumnai',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 4,
        lastMessageTime: 'Sun'
    },
    {
        bookmarked: false,
        username: 'Mart Partel',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 3,
        lastMessageTime: '10:24pm'
    },
    {
        bookmarked: false,
        username: 'Paul',
        lastMessage: "Pellentesque Adipiscing",
        unreadCount: 0,
        lastMessageTime: 'Sat'
    },
    {
        bookmarked: true,
        username: 'Margus Pirkmets',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 0,
        lastMessageTime: 'Sat'
    }
]

export const CHAT_MESSAGE:ChatMessageInterface[] = [
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        messageText: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: false
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        messageText: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: true
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        messageText: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: false
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        messageText: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: true
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        messageText: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: false,
        myMessage: false,
        files: []
    }
]