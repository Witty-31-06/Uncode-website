# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install --no-package-lock

# Copy the entire backend directory
COPY . .

# Install build tools (make & g++)
RUN apt-get update && apt-get install -y build-essential

# Run the Makefile to compile all C++ files into ELF executables
RUN make all

# Expose port 5000
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
