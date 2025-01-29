import api from "../../services/api";
import IChatRepository from "../repository/chatRepository";

const chatService: IChatRepository = {

  //Messages
  getConversations: (userId: number, contactId: number) => api.get(`/message/conversation?userId=${userId}&contactId=${contactId}`),
  sendMessage: (sender: number, recipient: number, isGroup: boolean, message: string) => api.post(`/message/create`, { sender, recipient, isGroup, message }),

  //Contacts
  getContatos: (id: number) => api.get(`/contacts?userId=${id}`),
  sendResquest: (userId: number, target: number) => api.post(`/contacts/send`, { userId, target }),
  aceptResquest: (userId: number, requesterId: number) => api.post(`/contacts/accept`, { userId, requesterId }),
  getRequestsContacts: (id: number) => api.get(`/contacts/requests?userId=${id}`),
  declineRequest: (userId: number, requesterId: number) => api.post(`/contacts/decline`, { userId, requesterId }),
};

export default chatService;
