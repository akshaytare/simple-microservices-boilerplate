FROM jboss/keycloak:16.1.1

# Add the realm-export.json file
ADD realm-export.json /tmp/realm-export.json

# Copy the custom themes files
COPY themes /opt/jboss/keycloak/themes

# Set the custom theme in Keycloak configuration
# RUN sed -i 's/<theme>keycloak<\/theme>/<theme>keywind<\/theme>/' /opt/jboss/keycloak/standalone/configuration/standalone.xml

# Set the system property for importing the realm-export.json
CMD ["-Dkeycloak.import=/tmp/realm-export.json"]

