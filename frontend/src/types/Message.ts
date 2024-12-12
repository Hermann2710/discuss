export default interface Message {
  _id?: string;
  receiverId?: string;
  senderId?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}
