FROM jmfirth/webpack:8

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Install Node.js dependencies
RUN yarn --ignore-engines --network-timeout 1000000

# Bundle app source
COPY . /usr/src/app

RUN yarn run build -- --release
