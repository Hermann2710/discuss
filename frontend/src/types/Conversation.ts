export default interface Conversation {
    _id?: string;
    receiverId?: string;
    senderId?: string;
    messages?: any;
    createdAt?: string;
    updatedAt?: string;
}