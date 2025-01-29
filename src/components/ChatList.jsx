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

// Botão Criar Grupo
const CreateGroupButton = styled.button`
  background: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

// Modal de Criar Grupo
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 300px;
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

// Checkbox Estilizado
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

// Botão Estilizado
const Button = styled.button`
  background: #4caf50;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 0.5rem;

  &:hover {
    background: #45a049;
  }
`;

const ChatList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [modalGrupoAberto, setModalGrupoAberto] = useState(false);
  const [grupoNome, setGrupoNome] = useState("");
  const [contatosSelecionados, setContatosSelecionados] = useState([]);

  const { "token-chat": token } = parseCookies();
  const jwtDados = jwtDecode(token);

  const listarContatos = async () => {
    try {
      const response = await chatService.getContatos(jwtDados.id);
      if (Array.isArray(response.data.contacts || response.data.groups)) {
        setContatos(response.data.contacts);
        setGrupos(response.data.groups);
      } else {
        setContatos([]);
      }
    } catch (error) {
      alert("Erro ao buscar contatos:", error);
      setContatos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listarContatos();
  }, []);

  const openChat = (id) => {
    sessionStorage.setItem("contactId", id);
    navigate(`/chat/${id}`);
  };

  const toggleSelecionarContato = (id) => {
    setContatosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const criarGrupo = async () => {
    if (!grupoNome.trim()) {
      alert("Por favor, insira um nome para o grupo.");
      return;
    }

    if (contatosSelecionados.length < 2) {
      alert("Selecione pelo menos dois contatos para criar um grupo.");
      return;
    }

    try {
      await chatService.createGroup(grupoNome, [
        jwtDados.id,
        ...contatosSelecionados,
      ]);

      alert("Grupo criado com sucesso!");
      setModalGrupoAberto(false);
      setGrupoNome("");
      setContatosSelecionados([]);
    } catch (error) {
      alert(`Erro ao criar um grupo: ${error.response.data.error}`);
    }
  };

  return (
    <Container>
      <Header>
        <span>Mensagens</span>
        <CloseButton>&times;</CloseButton>
      </Header>

      <ChatListContainer>
        {/* Botão para abrir o modal de criação de grupo */}
        <CreateGroupButton onClick={() => setModalGrupoAberto(true)}>
          Criar Grupo
        </CreateGroupButton>
        <br />

        <h2>Contatos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : contatos.length > 0 ? (
          contatos.map((msg) => (
            <ChatItem key={msg._id} onClick={() => {openChat(msg._id); sessionStorage.setItem("isGroup", "false")}}>
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

      {/* listar os grupos */}

      <ChatListContainer>
        <h2>Grupos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : grupos.length > 0 ? (
          grupos.map((grupo) => (
            <ChatItem key={grupo._id} onClick={() => {openChat(grupo._id);sessionStorage.setItem("isGroup", "true")}}>
              <Avatar src={userAvatar} alt={grupo.name} />
              <ChatText>
                <span className="name">{grupo.name}</span>
                <span className="lastMessage">
                  {grupo.lastMessage || "Sem mensagens"}
                </span>
              </ChatText>
            </ChatItem>
          ))
        ) : (
          <p>Nenhum grupo encontrado.</p>
        )}
      </ChatListContainer>

      {/* Modal para Criar Grupo */}
      {modalGrupoAberto && (
        <>
          <Overlay onClick={() => setModalGrupoAberto(false)} />
          <Modal>
            <h2>Criar Grupo</h2>

            <input
              type="text"
              placeholder="Nome do grupo"
              value={grupoNome}
              onChange={(e) => setGrupoNome(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <h4>Selecione os membros:</h4>
            {contatos.map((contato) => (
              <CheckboxContainer key={contato._id}>
                <input
                  type="checkbox"
                  checked={contatosSelecionados.includes(contato._id)}
                  onChange={() => toggleSelecionarContato(contato._id)}
                />
                <span>{contato.name}</span>
              </CheckboxContainer>
            ))}

            <CreateGroupButton onClick={criarGrupo}>
              Confirmar Grupo
            </CreateGroupButton>
            <Button onClick={() => setModalGrupoAberto(false)}>Cancelar</Button>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default ChatList;
