# Step 1: Use official Node.js LTS Alpine base image (satisfies engines >= 18.0.0)
FROM node:20-alpine

# Set non-root environment & working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Step 2: Copy dependency manifests for layer caching
COPY package*.json ./

# Step 3: Install production dependencies using clean install
RUN npm ci --omit=dev

# Step 4: Copy application source files
COPY . .

# Set non-root user permissions (Node.js Alpine best practice)
USER node

# Step 5: Expose application port (IBM Cloud Code Engine default: 8080)
EXPOSE 8080

# Step 6: Start the Express server
CMD ["npm", "start"]
