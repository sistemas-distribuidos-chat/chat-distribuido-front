import api from "../../services/api";
import IChatRepository from "../repository/chatRepository";

const chatService: IChatRepository = {

  //Groups
  createGroup: (name: string, members: string[]) => api.post(`/groups/create`, { name, members }),
  getMembersGroup: (groupId: number) => api.get(`/groups/members?groupId=${groupId}`),

  //Messages
  getConversations: (userId: number, contactId: number) => api.get(`/message/conversation?userId=${userId}&contactId=${contactId}`),
  getConversationsGroup: (groupId: number) => api.get(`/message/group-messages?groupId=${groupId}`),
  sendMessage: (sender: number, recipient: number, isGroup: boolean, message: string) => api.post(`/message/create`, { sender, recipient, isGroup, message }),

  //Contacts
  getContatos: (id: number) => api.get(`/contacts?userId=${id}`),
  sendResquest: (userId: number, target: number) => api.post(`/contacts/send`, { userId, target }),
  aceptResquest: (userId: number, requesterId: number) => api.post(`/contacts/accept`, { userId, requesterId }),
  getRequestsContacts: (id: number) => api.get(`/contacts/requests?userId=${id}`),
  declineRequest: (userId: number, requesterId: number) => api.post(`/contacts/decline`, { userId, requesterId }),
};

export default chatService;
