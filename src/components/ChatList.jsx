import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // Para chamadas de API
import userAvatar from "../assets/user.png";

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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar as mensagens do backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/messages"); // Ajuste a rota correta
        setMessages(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const openChat = (id) => {
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
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <ChatItem key={msg._id} onClick={() => openChat(msg._id)}>
              <Avatar src={userAvatar} alt={msg.username} />
              <ChatText>
                <span className="name">{msg.username}</span>
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
