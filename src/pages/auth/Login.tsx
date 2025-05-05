import { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      login('mock-token-123'); // Simulated token
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Paper maw={400} mx="auto" mt={80} p="lg" shadow="sm">
      <Title order={3} align="center" mb="md">Login</Title>
      <Stack>
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth onClick={handleLogin}>Login</Button>
      </Stack>
    </Paper>
  );
};

export default Login;
