import React, { createContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakContext = createContext();

const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = Keycloak({
        realm: 'myrealm',
        url: 'http://localhost:8080/auth/',
        sslRequired: 'external',
        resource: 'account',
        publicClient: true,
        confidentialPort: 0,
        redirectUri: 'http://localhost:5173/*',
        clientId: 'account',
      });

      await keycloakInstance.init({ onLoad: 'login-required' });

      setKeycloak(keycloakInstance);
    };

    if (!keycloak) {
      initKeycloak();
    }
  }, [keycloak]);

  useEffect(() => {
    if (keycloak) {
      const checkAuthentication = async () => {
        const authenticated = await keycloak.authenticated;
        setAuthenticated(authenticated);
      };

      checkAuthentication();
    }
  }, [keycloak]);

  const doLogin = () => keycloak?.login();
  const doLogout = () => keycloak?.logout();
  const getToken = () => keycloak?.token;
  const isLoggedIn = () => authenticated; // Use the local state for authentication status
  const getUsername = () => keycloak?.tokenParsed?.preferred_username;
  const hasRole = (role) => keycloak?.hasRealmRole(role);

  if (!keycloak) {
    return <div>Loading...</div>;
  }

  return (
    <KeycloakContext.Provider
      value={{ keycloak, authenticated, doLogin, doLogout, getToken, isLoggedIn, getUsername, hasRole }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export { KeycloakProvider, KeycloakContext };
