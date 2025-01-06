import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Container Principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f9fc;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
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

// Área de Mensagens
const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

// Mensagem
const Message = styled.div`
  max-width: 60%;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  background: ${(props) => (props.isMine ? '#6a11cb' : 'white')};
  color: ${(props) => (props.isMine ? 'white' : '#333')};
  border-radius: 12px;
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Área de Input
const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

// Campo de Entrada
const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

// Botão de Enviar
const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin-left: 1rem;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4e0b9e;
  }
`;

const ChatWindow = () => {
  const { id } = useParams(); // Obter ID do chat da URL
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', isMine: false },
    { id: 2, text: 'Hi, how are you?', isMine: true },
    { id: 3, text: 'I’m good, thanks!', isMine: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, isMine: true }]);
      setNewMessage('');
    }
  };

  return (
    <Container>
      <Header>Chat with User {id}</Header>
      <MessagesContainer>
        {messages.map((msg) => (
          <Message key={msg.id} isMine={msg.isMine}>
            {msg.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </Container>
  );
};

export default ChatWindow;
