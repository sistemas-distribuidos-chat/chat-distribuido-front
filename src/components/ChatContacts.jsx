import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
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

// Ícone de Sino (Notificações)
const NotificationBell = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  margin-right: 1rem;

  &:hover {
    color: #ffcc00;
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

// Input para adicionar contato
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

const SolicitationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SolicitationInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SolicitationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const AcceptButton = styled.button`
  background: #4caf50;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #45a049;
  }
`;

const DeclineButton = styled.button`
  background: #d32f2f;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #b71c1c;
  }
`;

const ContactList = () => {
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalSolicitacoesAberto, setModalSolicitacoesAberto] = useState(false);
  const [modalAdicionarContatoAberto, setModalAdicionarContatoAberto] =
    useState(false);
  const [emailContato, setEmailContato] = useState("");
  const [erroSolicitacao, setErroSolicitacao] = useState("");

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

  const listarSolicitacoes = async () => {
    try {
      const response = await chatService.getRequestsContacts(jwtDados.id);

      if (Array.isArray(response.data.contactRequests)) {
        setSolicitacoes(response.data.contactRequests);
      } else {
        setSolicitacoes([]);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        alert(`Erro ao buscar solicitações: ${error.response.data.error}`);
      } else {
        console.log("Erro ao buscar solicitações. Tente novamente.");
      }
      setSolicitacoes([]);
    }
  };

  const enviarSolicitacaoContato = async () => {
    try {
      await chatService.sendResquest(jwtDados.id, emailContato);
      setModalAdicionarContatoAberto(false);
      setEmailContato("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        alert(`Erro ao enviar solicitação: ${error.response.data.error}`);
        setErroSolicitacao(error.response.data.error);
      } else {
        console.log("Erro ao enviar solicitação. Tente novamente.");
        setErroSolicitacao("Erro ao enviar solicitação. Tente novamente.");
      }
    }
  };

  const aceitarSolicitacao = async (id) => {
    try {
      await chatService.aceptResquest(jwtDados.id, id);
      listarSolicitacoes();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        alert(`Erro ao aceitar solicitação: ${error.response.data.error}`);
      } else {
        console.log("Erro ao aceitar solicitação. Tente novamente.");
      }
    }
  };

  const recusarSolicitacao = async (id) => {
    try {
      await chatService.declineRequest(id);
      listarSolicitacoes();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        alert(`Erro ao recusar solicitação: ${error.response.data.error}`);
      } else {
        console.log("Erro ao recusar solicitação. Tente novamente.");
      }
    }
  };

  useEffect(() => {
    listarContatos();
  }, []);

  return (
    <>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Container>
          <Header>
            <span>Contatos</span>

            <div>
              {/* Botão de adicionar contato */}
              <Button onClick={() => setModalAdicionarContatoAberto(true)}>
                Adicionar Contato
              </Button>

              {/* Ícone de notificações */}
              <NotificationBell
                onClick={() => {
                  setModalSolicitacoesAberto(true);
                  listarSolicitacoes();
                }}
              >
                🔔
              </NotificationBell>
            </div>
          </Header>

          {contatos?.map((contact) => (
            <ContactItem key={contact.id}>
              <Avatar src={userAvatar} alt={contact.name} />
              <ContactInfo>
                <ContactName>{contact.name}</ContactName>
              </ContactInfo>
            </ContactItem>
          ))}
        </Container>
      )}

      {/* Modal de Solicitações de Contato */}
{modalSolicitacoesAberto && (
  <>
    <Overlay onClick={() => setModalSolicitacoesAberto(false)} />
    <Modal>
      <h2>Solicitações de Contato</h2>
      {solicitacoes.length === 0 ? (
        <p>Nenhuma solicitação de contato.</p>
      ) : (
        solicitacoes.map((solicitacao) => (
          <SolicitationContainer key={solicitacao._id}>
            <SolicitationInfo>
              <Avatar src={userAvatar} alt={solicitacao.name} />
              <ContactInfo>
                <ContactName>{solicitacao.name}</ContactName>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  deseja te adicionar.
                </p>
              </ContactInfo>
            </SolicitationInfo>
            <SolicitationButtons>
              <AcceptButton onClick={() => aceitarSolicitacao(solicitacao._id)}>
                Aceitar
              </AcceptButton>
              <DeclineButton onClick={() => recusarSolicitacao(solicitacao._id)}>
                Recusar
              </DeclineButton>
            </SolicitationButtons>
          </SolicitationContainer>
        ))
      )}
      <Button onClick={() => setModalSolicitacoesAberto(false)}>Fechar</Button>
    </Modal>
  </>
)}

      {/* Modal de Adicionar Contato */}
      {modalAdicionarContatoAberto && (
        <>
          <Overlay onClick={() => setModalAdicionarContatoAberto(false)} />
          <Modal>
            <h2>Adicionar Contato</h2>

            {erroSolicitacao && <p style={{ color: "red" }}>{erroSolicitacao}</p>} {/* Exibe erro se houver */}

            <Input
              type="text"
              placeholder="Digite o e-mail ou username"
              value={emailContato}
              onChange={(e) => setEmailContato(e.target.value)}
            />
            <Button onClick={enviarSolicitacaoContato}>
              Enviar Solicitação
            </Button>
            <Button onClick={() => setModalAdicionarContatoAberto(false)}>
              Fechar
            </Button>
          </Modal>
        </>
      )}
    </>
  );
};

export default ContactList;
