import { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Stack,
  Box,
  Text,
  Center
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { Eye, EyeOff } from 'react-feather';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validatePasswordFormat = (pwd: any) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    return hasUpperCase && hasNumber && hasSpecial;
  };

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Empty field validation
    if (!trimmedUsername && !trimmedPassword) {
      setErrorMessage('Username and password are required');
      return;
    }

    if (!trimmedUsername) {
      setErrorMessage('Username is required');
      return;
    }

    if (!trimmedPassword) {
      setErrorMessage('Password is required');
      return;
    }

    // Password format validation
    if (!validatePasswordFormat(trimmedPassword)) {
      setErrorMessage('Password must contain at least one capital letter, one number, and one special character');
      return;
    }

    // Credentials check
    if (trimmedUsername !== 'admin' || trimmedPassword !== 'Admin@123') {
      setErrorMessage('Invalid credentials');
      return;
    }

    // Success
    setErrorMessage('');
    login('mock-token-123');
    navigate('/dashboard/launches');
  };

  return (
    <Center h="100vh" bg="#f4f7fa">
      <Paper maw={400} h={450} w="100%" mx="auto" shadow="md" radius="md" withBorder p={'lg'}>
        <Title
          order={2}
          color="#232F53"
          align="center"
          style={{ fontSize: '35px', marginTop: '25px' }}
        >
          SpaceX Dashboard
        </Title>
        <Text align="center" size="sm" color="#555" style={{ fontSize: '20px', marginBottom: '20px' }}>
          Please login to continue
        </Text>

        <Box p="lg">
          <Stack spacing="md">
            <TextInput
              label="Username"
              placeholder="Enter your email"
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter you passsword"
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
              rightSection={
                <Box
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </Box>
              }
            />


            {errorMessage && (
              <Text color="red" size="sm" align="left">
                {errorMessage}
              </Text>
            )}

            <Button fullWidth onClick={handleLogin} style={{ marginTop: '10px' }}>
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Center>
  );
};

export default Login;
