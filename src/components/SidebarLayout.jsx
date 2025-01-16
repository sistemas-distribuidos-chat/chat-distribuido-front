import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar"; // Componente da barra lateral

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh; /* Ocupa a altura total da tela */
`;

const ContentArea = styled.div`
  flex-grow: 1; /* O conteúdo principal ocupa o espaço restante */
  margin-left: 250px; /* Espaço equivalente à largura da barra lateral */
  padding: 16px;
  background-color: ${(props) => props.theme.colors.background || "#29454D"};
  overflow-y: auto; /* Adiciona rolagem ao conteúdo, se necessário */
`;

const SidebarLayout = () => {
  return (
    <LayoutContainer>
      {/* Barra lateral fixa */}
      <Sidebar />

      {/* Área de conteúdo onde as rotas internas serão renderizadas */}
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutContainer>
  );
};

export default SidebarLayout;
