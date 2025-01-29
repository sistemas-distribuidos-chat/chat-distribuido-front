import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import enviarIcon from "../assets/enviar.png";
import chatService from "../gateway/services/chatService";

// Conectar ao servidor WebSocket
const socket = io("http://localhost:3000"); // Porta do backend

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
  display: flex;
  flex-direction: column;
`;

// Nome do remetente
const SenderName = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  /* color: ${(props) => (props.isMine ? "#6a11cb" : "#333")}; */
  color: ${(props) => props.color};
  margin-bottom: 4px;
`;

// Horário da mensagem
const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #888;
  margin-top: 4px;
  text-align: right;
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

// Botão "Ver Participantes"
const ParticipantsButton = styled.button`
  background: #ff9800;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 0.5rem;

  &:hover {
    background: #e68900;
  }
`;

// Modal Estilizado
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 500px;
  max-width: 400px;
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Overlay do Modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Lista de participantes (escondendo a barra de rolagem)
const ParticipantList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Esconde a barra de rolagem para navegadores modernos */
  scrollbar-width: none; /* Firefox */
  
  /* Esconde a barra de rolagem para Chrome, Edge e Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Cartão do participante
const ParticipantCard = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  gap: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

// Avatar do participante
const ParticipantAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #6a11cb;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Nome do participante
const ParticipantName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

// Botão de fechar
const CloseModalButton = styled.button`
  background: #6a11cb;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background: #4e0b9e;
  }
`;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [colorMap, setColorMap] = useState({});
  const [participants, setParticipants] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { "token-chat": token } = parseCookies();
  const jwtDados = jwtDecode(token);
  const userId = jwtDados.id; // ID do usuário logado
  const isGroup = sessionStorage.getItem("isGroup") === "true";

  useEffect(() => {
    // Entrar na sala quando o componente for montado
    socket.emit("join-room", userId);

    // Receber mensagens em tempo real
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: { _id: userId, name: "Você" },
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Enviar a mensagem via WebSocket
      socket.emit("send-message", messageData);

      // Adicionar a mensagem na lista localmente
      setMessages((prev) => [...prev, { ...messageData, isMine: true }]);
      setNewMessage("");
    }

    // Enviar a mensagem para o servidor
    sendToServer();
  };

  const sendToServer = async () => {
    const contactId = sessionStorage.getItem("contactId");
    const isGroup = sessionStorage.getItem("isGroup") === "true" ? true : false;
    try {
      await chatService.sendMessage(userId, contactId, isGroup, newMessage);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        alert(`Erro ao aceitar solicitação: ${error.response.data.error}`);
      } else {
        console.log("Erro ao aceitar solicitação. Tente novamente.");
      }
    }
  };

  const fetchMessages = async () => {
    const contactId = sessionStorage.getItem("contactId");
    try {
      const response = await chatService.getConversations(userId, contactId);

      if (Array.isArray(response.data.messages)) {
        const formattedMessages = response.data.messages.map((msg) => ({
          _id: msg._id,
          sender: msg.sender,
          message: msg.message,
          timestamp: msg.timestamp,
          isMine: msg.sender._id === userId,
        }));
        setMessages(formattedMessages);
      } else {
        console.error("Formato inválido de mensagens:", response.data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchMessagesGroup = async () => {
  //   const groupId = sessionStorage.getItem("contactId");
  //   try {
  //     const response = await chatService.getConversationsGroup(groupId);

  //     if (Array.isArray(response.data.messages)) {
  //       const formattedMessages = response.data.messages.map((msg) => ({
  //         _id: msg._id,
  //         sender: msg.sender,
  //         message: msg.message,
  //         timestamp: msg.timestamp,
  //         isMine: msg.sender._id === userId,
  //       }));
  //       setMessages(formattedMessages);
  //     } else {
  //       console.error("Formato inválido de mensagens:", response.data);
  //       setMessages([]);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao buscar mensagens:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMessagesGroup = async () => {
    const groupId = sessionStorage.getItem("contactId");
    try {
      const response = await chatService.getConversationsGroup(groupId);
      processMessages(response.data.messages);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const processMessages = (messagesData) => {
    if (!Array.isArray(messagesData)) {
      setMessages([]);
      return;
    }

    const formattedMessages = messagesData.map((msg) => ({
      _id: msg._id,
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp,
      isMine: msg.sender._id === userId,
    }));

    const colors = {};
    formattedMessages.forEach((msg) => {
      if (!colors[msg.sender._id]) {
        colors[msg.sender._id] = getRandomColor();
      }
    });

    setColorMap(colors);
    setMessages(formattedMessages);
  };

  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A8",
      "#FFD700",
      "#FF4500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Função para abrir modal
  const openParticipantsModal = async () => {
    const groupId = sessionStorage.getItem("contactId");
    try {
      const response = await chatService.getMembersGroup(groupId);
      setParticipants(response.data.members);
      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar participantes:", error);
    }
  };

  // useEffect(() => {
  //   if (sessionStorage.getItem("isGroup") === "true") {
  //     fetchMessagesGroup();
  //   } else {
  //     fetchMessages();
  //   }
  // }, []);

  useEffect(() => {
    isGroup ? fetchMessagesGroup() : fetchMessages();
  }, []);

  return (
    <>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Container>
          <Header>
            <span>Chat</span>
            {isGroup && (
              <ParticipantsButton onClick={openParticipantsModal}>
                Ver Participantes
              </ParticipantsButton>
            )}
            <CloseButton>&times;</CloseButton>
          </Header>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={msg._id || index} isMine={msg.isMine}>
                <SenderName
                  color={colorMap[msg.sender._id]}
                  isMine={msg.isMine}
                >
                  {msg.sender.name}
                </SenderName>
                {msg.message}
                <MessageTime>
                  {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </MessageTime>
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
      )}

      {modalOpen && (
        <>
          <Overlay onClick={() => setModalOpen(false)} />
          <Modal>
            <h2 style={{ color: "#6a11cb", marginBottom: "10px" }}>
              Participantes
            </h2>
            <ParticipantList>
              {participants.map((p) => (
                <ParticipantCard key={p._id}>
                  <ParticipantAvatar>
                    {p.name.charAt(0).toUpperCase()}
                  </ParticipantAvatar>
                  <ParticipantName>{p.name}</ParticipantName>
                </ParticipantCard>
              ))}
            </ParticipantList>
            <CloseModalButton onClick={() => setModalOpen(false)}>
              Fechar
            </CloseModalButton>
          </Modal>
        </>
      )}
    </>
  );
};

export default ChatWindow;
