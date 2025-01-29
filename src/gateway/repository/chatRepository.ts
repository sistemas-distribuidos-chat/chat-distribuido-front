import { AxiosPromise } from "axios";

export default interface IChatRepository {

    //GROUPS

    //AUTH

    //MESSAGES
    getConversations(userId: number, contactId: number): AxiosPromise<any>;
    sendMessage(sender: number, recipient: number, isGroup: boolean, message: string): AxiosPromise<any>;

    //CONTACTS
    getContatos(id: number): AxiosPromise<any>;
    sendResquest(userId: number, target: number): AxiosPromise<any>;
    aceptResquest(userId: number, requesterId: number): AxiosPromise<any>;
    getRequestsContacts(id: number): AxiosPromise<any>;
    declineRequest(userId: number, requesterId: number): AxiosPromise<any>;



}
