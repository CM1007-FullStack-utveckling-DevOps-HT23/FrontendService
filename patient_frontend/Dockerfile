FROM node:14

# This command sets the working directory for any commands you add in the Dockerfile.
# So, while building the image, the commands will be executed in this directory.
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]