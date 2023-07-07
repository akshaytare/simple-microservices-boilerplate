import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Text, extendTheme, Button } from '@chakra-ui/react';
import SendMessage from './components/SendMessage';
import MessageList from './components/MessageList';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box bg="teal.500" py={4} color="white">
          <Flex justifyContent="center">
            <Box>
              <Text fontSize="xl" fontWeight="bold" mr={4}>
                My App
              </Text>
            </Box>
            <Flex>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  opacity: 0.8,
                  marginRight: '1rem',
                }}
              >
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  size="md"
                  isActive={(match, location) => location.pathname === '/'}
                >
                  Send Message
                </Button>
              </NavLink>
              <NavLink
                to="/messages"
                activeClassName="active"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  opacity: 0.8,
                }}
              >
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  size="md"
                  isActive={(match, location) => location.pathname === '/messages'}
                >
                  Message List
                </Button>
              </NavLink>
            </Flex>
          </Flex>
        </Box>
        <Box py={8} px={4}>
          <Switch>
            <Route exact path="/" component={SendMessage} />
            <Route path="/messages" component={MessageList} />
          </Switch>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
