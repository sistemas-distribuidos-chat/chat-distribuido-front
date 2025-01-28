import { useState, useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import enviarIcon from "../assets/enviar.png";

// Conectar ao servidor WebSocket
const socket = io("http://localhost:3000"); // Porta do backend

// ID da sala fixa (mudar para dinâmica depois)
const ROOM_ID = "grupo1";

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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Entrar na sala quando o componente for montado
    socket.emit("join-room", ROOM_ID);

    // Receber mensagens em tempo real
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        roomId: ROOM_ID,
        message: newMessage,
        sender: "Usuário", // Mudar para usuário real depois
      };

      // Enviar a mensagem via WebSocket
      socket.emit("send-message", messageData);

      // Adicionar a mensagem na lista localmente (antes da resposta do servidor)
      setMessages((prev) => [...prev, { ...messageData, isMine: true }]);
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
        {messages.map((msg, index) => (
          <Message key={index} isMine={msg.isMine}>
            {msg.sender}: {msg.message}
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
