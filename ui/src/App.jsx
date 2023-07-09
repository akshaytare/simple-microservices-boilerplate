import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { ChakraProvider, Flex, Box, Text, extendTheme, Button } from '@chakra-ui/react';
import SendMessage from './components/SendMessage';
import MessageList from './components/MessageList';
import UserService from './services/UserService';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const App = () => {
  const handleLogin = () => {
    UserService.doLogin();
  };

  const handleSignOut = () => {
    UserService.doLogout();
  };

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
              {UserService.isLoggedIn() ? (
                <>
                  <Text fontSize="lg" mr={8} mt="1">
                    Hello, {UserService.getUsername()}!
                  </Text>
                  <Button colorScheme="red" variant="outline" mr={4} onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button mr={4} onClick={handleLogin}>
                    Sign In
                  </Button>
                </>
              )}
              <NavLink to="/" exact activeClassName="active">
                <Button colorScheme="teal" variant="outline" mr={4}>
                  Send Message
                </Button>
              </NavLink>
              <NavLink to="/messages" activeClassName="active">
                <Button colorScheme="teal" variant="outline" mr={4}>
                  Message List
                </Button>
              </NavLink>
            </Flex>
          </Flex>
        </Box>
        <Box py={8} px={4}>
          <Switch>
            <Route exact path="/" component={UserService.isLoggedIn() ? SendMessage : null} />
            <Route path="/messages" component={MessageList} />
          </Switch>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
