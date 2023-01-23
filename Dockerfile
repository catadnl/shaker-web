### STAGE 1: Install dependencies ###

FROM node:18.13-alpine AS dependencies
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy sources ignoring the dependencies
COPY . .


### STAGE 2: Build Web App ###

FROM dependencies as build

# Build the applicaiton for environment
RUN npm run build


### STAGE 3: Run Web App ###

FROM nginx:1.23.3-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy app resources
COPY --from=build /usr/src/app/dist/shaker-web /usr/share/nginx/html
