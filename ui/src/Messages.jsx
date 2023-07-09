import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, sendMessage } from './redux/messageSlice';
import { Box, Input, Button, VStack, useToast } from '@chakra-ui/react';

function Messages() {
  const messages = useSelector((state) => state.messages.entities);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = async () => {
    try {
      await dispatch(sendMessage({ text }));
      setText(''); // Clear the input field after sending the message
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
  

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <VStack spacing={4} width="500px" maxW="90vw" margin="auto" marginTop="10vh">
      {messages.map((msg, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px">
          {msg.text}
        </Box>
      ))}
      <Input type="text" value={text} onChange={handleChange} placeholder="Type your message here" />
      <Button colorScheme="blue" onClick={handleSend}>Send</Button>
    </VStack>
  );
}

export default Messages;
