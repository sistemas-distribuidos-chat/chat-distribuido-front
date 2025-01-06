import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Container Principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f9fc;
`;

// Header
const Header = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
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
const Avatar = styled.div`
  background: #ddd;
  color: #6a11cb;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Let’s catch up soon!' },
    { id: 3, name: 'Work Group', lastMessage: 'Meeting tomorrow at 10AM' },
  ];

  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <Header>Chats</Header>
      <ChatListContainer>
        {chats.map((chat) => (
          <ChatItem key={chat.id} onClick={() => openChat(chat.id)}>
            <Avatar>{chat.name.charAt(0)}</Avatar>
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
