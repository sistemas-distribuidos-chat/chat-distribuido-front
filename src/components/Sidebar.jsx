import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #29454d; /* Nova cor de fundo */
  color: ${(props) => props.theme.colors.text || "#fff"};
  display: flex;
  flex-direction: column;
  height: 100vh; /* Altura total da tela */
  position: fixed;
  left: 0;
  top: 0;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem; /* Mesma altura vertical que os itens do modelo */
  border-bottom: 1px solid #ddd; /* Linha inferior para separar itens */
  font-family: Arial, sans-serif; /* Mesma fonte usada no modelo */
  font-size: 1rem; /* Mesmo tamanho da fonte do modelo */
  font-weight: bold; /* Deixa o texto destacado */
  text-decoration: none; /* Remove sublinhado */
  color: #fff; /* Letra branca */
  background-color: #29454d; /* Fundo da barra lateral */
  cursor: pointer;
  transition: background 0.2s;

  /* Estado ativo (quando a rota está ativa) */
  &.active {
    background: #1f363d; /* Destaque para o item ativo */
  }

  /* Efeito de hover */
  &:hover {
    background: #1f363d; /* Destaque no hover */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <MenuItem to="/chats">Chats</MenuItem>
      <MenuItem to="/contatos">Contatos</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
