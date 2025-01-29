import cookies from "nookies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import chatService from "../gateway/services/chatService";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1d1d1d;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;
const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 93%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #4e0b9e;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RegisterLink = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;

  a {
    color: #6a11cb;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await chatService.login({ email, password });
      // localStorage.setItem("token", response.data.token);
      cookies.set(null, "token-chat", response.data.token, {
        path: "/",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
      });
      navigate("/chats");
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
        </form>
        <RegisterLink>
          Não tem uma conta? <a href="/register">Cadastre-se</a>
        </RegisterLink>
      </FormWrapper>
    </Container>
  );
};

export default Login;
