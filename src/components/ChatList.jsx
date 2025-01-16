import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userAvatar from "../assets/user.png";

// Container Principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  const navigate = useNavigate(); // Para navegação

  const chats = [
    { id: 1, name: "Carlos Silva", lastMessage: "Oi, tudo bem?" },
    { id: 2, name: "Ana Souza", lastMessage: "Vamos marcar um café!" },
    { id: 3, name: "Grupo de Trabalho", lastMessage: "Reunião amanhã às 10h." },
  ];

  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <Header>
        <span>Chats</span>
        <CloseButton>&times;</CloseButton>
      </Header>
      <ChatListContainer>
        {chats.map((chat) => (
          <ChatItem key={chat.id} onClick={() => openChat(chat.id)}>
            <Avatar src={userAvatar} alt={chat.name} />
            <ChatText>
              <span className="name">{chat.name}</span>
              <span className="lastMessage">{chat.lastMessage}</span>
            </ChatText>
          </ChatItem>
        ))}
      </ChatListContainer>
    </Container>
  );
};

export default ChatList;
