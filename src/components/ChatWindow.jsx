import { useState } from "react";
import styled from "styled-components";
import enviarIcon from "../assets/enviar.png";

// Container Principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 96vh;
  background: #f5f5f5;
  font-family: Arial, sans-serif;
`;

// Header com Gradiente
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

// Área de mensagens
const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: #f9fbfd;
`;

// Mensagem
const Message = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  border-radius: 12px;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  background: ${(props) => (props.isMine ? "#d9eaff" : "#ffffff")};
  color: #333;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
`;

// Área de Input
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #ffffff;
  border-top: 1px solid #ddd;
`;

// Campo de entrada
const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  background: #f0f4f8;

  &:focus {
    border-color: #6a11cb;
    outline: none;
  }
`;

// Botão de Enviar
const Button = styled.button`
  margin-left: 0.5rem;
  padding: 0.8rem;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #4e0b9e;
  }
`;

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! tudo bem?", isMine: false },
    { id: 2, text: "Tudo bem e com você?", isMine: true },
    {
      id: 3,
      text: "Estamos bem também! O que você está fazendo?",
      isMine: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, isMine: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Container>
      <Header>
        <span>Chat</span>
        <CloseButton>&times;</CloseButton>
      </Header>
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
          placeholder="Digite sua mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>
          <img src={enviarIcon} alt="Enviar" />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default ChatWindow;
