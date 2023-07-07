import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/send', { message });
      setMessage('');
      toast({
        title: 'Message sent successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to send message.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb={4}>
        Send Message
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl id="message">
            <FormLabel>Message</FormLabel>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Send
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SendMessage;
