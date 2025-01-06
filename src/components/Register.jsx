import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
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
  color: #333;
`;

const Input = styled.input`
  width: 100%;
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
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #4e0b9e;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LoginLink = styled.p`
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Cadastro</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button type="submit">Cadastrar</Button>
        </form>
        <LoginLink>
          Já tem uma conta? <a href="/">Entre</a>
        </LoginLink>
      </FormWrapper>
    </Container>
  );
};

export default Register;
