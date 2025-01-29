import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userAvatar from "../assets/user.png";
import chatService from "../gateway/services/chatService";

// Container Principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 96vh;
  background: #f5f5f5;
  font-family: Arial, sans-serif;
`;

// Header
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #29454d;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

// Botão fechar
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

// Lista de Chats
const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

// Chat Item
const ChatItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

// Avatar
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

// Texto do Chat
const ChatText = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  .lastMessage {
    font-size: 0.9rem;
    color: #666;
  }
`;

const ChatList = () => {
  const navigate = useNavigate();
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState([]);

  const { "token-chat": token } = parseCookies();
  const jwtDados = jwtDecode(token);

  const listarContatos = async () => {
    try {
      const response = await chatService.getContatos(jwtDados.id);

      if (Array.isArray(response.data.contacts)) {
        setContatos(response.data.contacts);
      } else {
        console.error("Dados recebidos não são um array:", response.data);
        setContatos([]);
      }
    } catch (error) {
      alert("Erro ao buscar contatos:", error);
      setContatos([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar as mensagens do backend
  useEffect(() => {
    listarContatos();
  }, []);

  const openChat = (id) => {
    sessionStorage.setItem("contactId", id);
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <Header>
        <span>Mensagens</span>
        <CloseButton>&times;</CloseButton>
      </Header>
      <ChatListContainer>
        {loading ? (
          <p>Carregando...</p>
        ) : contatos.length > 0 ? (
          contatos.map((msg) => (
            <ChatItem key={msg._id} onClick={() => openChat(msg._id)}>
              <Avatar src={userAvatar} alt={msg.name} />
              <ChatText>
                <span className="name">{msg.name}</span>
                <span className="lastMessage">{msg.message}</span>
              </ChatText>
            </ChatItem>
          ))
        ) : (
          <p>Nenhuma mensagem encontrada.</p>
        )}
      </ChatListContainer>
    </Container>
  );
};

export default ChatList;
