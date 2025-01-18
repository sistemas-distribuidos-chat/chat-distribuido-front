import styled from "styled-components";
import userAvatar from "../assets/user.png";

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

// Item da Lista de Contatos
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

// Avatar do Contato
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

// Nome e Mensagem
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// Nome do Contato
const ContactName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

// Última Mensagem
const LastMessage = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ContactList = () => {
  const contacts = [
    {
      id: 1,
      name: "João Silva",
      avatar: userAvatar,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      avatar: userAvatar,
    },
    {
      id: 3,
      name: "Pedro Santos",
      avatar: userAvatar,
    },
    {
      id: 4,
      name: "Hugo Santos",
      avatar: userAvatar,
    },
    {
      id: 5,
      name: "Antonio Ribeiro",
      avatar: userAvatar,
    },
  ];

  return (
    <Container>
      <Header>
        <span>Contatos</span>
        <CloseButton>&times;</CloseButton>
      </Header>
      {contacts.map((contact) => (
        <ContactItem key={contact.id}>
          <Avatar src={contact.avatar} alt={contact.name} />
          <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <LastMessage>{contact.lastMessage}</LastMessage>
          </ContactInfo>
        </ContactItem>
      ))}
    </Container>
  );
};

export default ContactList;
