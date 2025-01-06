import styled from 'styled-components';

// Estilo do container principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.secondary});
`;


// Estilo do conteúdo (texto central)
const Content = styled.div`
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
`;

// Título principal
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

// Subtítulo
const Subtitle = styled.p`
  font-size: 1.5rem;
`;

const Welcome = () => {
  return (
    <Container>
      <Content>
        <Title>Chat App</Title>
        <Subtitle>Conecte-se com seus amigos</Subtitle>
      </Content>
    </Container>
  );
};

export default Welcome;
