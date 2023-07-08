# Use the official Node.js 14 image as the base
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the application
# RUN npm run build

# Start dev server
CMD [ "npm", "run", "dev" ]

EXPOSE 5173

# # Use Nginx as the web server
# FROM nginx:alpine

# # Copy the built application to the Nginx web server directory
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx when the container starts
# CMD ["nginx", "-g", "daemon off;"]
