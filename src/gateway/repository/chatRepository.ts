import { AxiosPromise } from "axios";

export default interface IChatRepository {
    //AUTH
    login(email: string, password: string): AxiosPromise<any>;
    register(name: string, email: string, password: string): AxiosPromise<any>;

    //GROUPS
    createGroup(name: string, members: string[]): AxiosPromise<any>;
    getMembersGroup(groupId: number): AxiosPromise<any>;


    //MESSAGES
    getConversations(userId: number, contactId: number): AxiosPromise<any>;
    getConversationsGroup(groupId: number): AxiosPromise<any>;
    sendMessage(sender: number, recipient: number, isGroup: boolean, message: string): AxiosPromise<any>;

    //CONTACTS
    getContatos(id: number): AxiosPromise<any>;
    sendResquest(userId: number, target: number): AxiosPromise<any>;
    aceptResquest(userId: number, requesterId: number): AxiosPromise<any>;
    getRequestsContacts(id: number): AxiosPromise<any>;
    declineRequest(userId: number, requesterId: number): AxiosPromise<any>;



}
