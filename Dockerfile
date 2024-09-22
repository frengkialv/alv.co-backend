# Reproduced from https://www.tomray.dev/nestjs-docker-production
# Base image
FROM node:lts-alpine3.15 as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .


# Creates a "dist" folder with the production build
RUN npm run build

# set environment to production
ENV NODE_ENV production

# set user to node
USER node


FROM node:lts-alpine3.15 as production

# Create app directory
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist


# set user to node
USER node

# Start the server using the production build
CMD [ "node", "dist/main" ]