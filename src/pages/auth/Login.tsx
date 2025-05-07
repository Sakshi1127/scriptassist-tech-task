import { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack, Box, Text, Center } from '@mantine/core';
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
      navigate('/dashboard/launches');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Center h="100vh" bg="#f4f7fa">
      <Paper maw={400} h={400} w="100%" mx="auto" shadow="md" radius="md" withBorder p={'lg'}>
          <Title order={2} color="#232F53" align="center" style={{fontSize:'35px',marginTop:'25px'}}>
            SpaceX Dashboard
          </Title>
          <Text align="center" size="sm" color="#555" style={{fontSize:'20px',marginBottom:'20px'}}>
            Please login to continue
          </Text>

        <Box p="lg">
          <Stack spacing="md">
            <TextInput
              label="Username"
              placeholder="Enter admin"
              value={username}
              labelProps={{
                style: {
                  color: '#232F53',   
                  fontSize: '16px',   
                  fontWeight: 500,    
                },
              }}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter admin123"
              value={password}
              labelProps={{
                style: {
                  color: '#232F53',   
                  fontSize: '16px',   
                  fontWeight: 500,    
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button fullWidth onClick={handleLogin} style={{marginTop:'10px'}}>
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Center>
  );
};

export default Login;
