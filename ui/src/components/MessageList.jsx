import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/messages');
        console.log(response.data)
        setMessages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast({
          title: 'Failed to fetch messages.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchMessages();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb={4}>
        Message List
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <List>
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <ListItem key={i}>
                {i+1} - {message.text} (By: {message.username}, Email: {message.email})
              </ListItem>
            ))
          ) : (
            <ListItem>No messages found.</ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default MessageList;
