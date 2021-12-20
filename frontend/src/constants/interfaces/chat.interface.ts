export interface ChatListInterface {
    bookmarked: boolean;
    username: string;
    lastMessage: string;
    unreadCount: number,
    lastMessageTime: string;
}

export interface ChatMessageInterface {
    username: string;
    time: string;
    companyName: string;
    messageText: string;
    seen: boolean;
    myMessage: boolean;
    files?: any
}