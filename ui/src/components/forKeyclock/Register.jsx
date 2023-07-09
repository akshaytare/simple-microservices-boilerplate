import { Box, Button } from '@chakra-ui/react';
import Keycloak from 'keycloak-js';

const Register = () => {
  const handleRegister = async () => {
    const keycloak = Keycloak('../../../keyclock.json');

    try {
      await keycloak.init({ onLoad: 'login-required' });
      const registrationUrl = keycloak.createRegisterUrl();
      window.location.href = registrationUrl;
      console.log(registrationUrl)
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
    }
  };

  return (
    <Box>
      <Button colorScheme="teal" variant="outline" mr={4} onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
