FROM node:latest AS build
EXPOSE 3000
ENV PATH="/root/.cargo/bin:${PATH}"
WORKDIR /home/backend
CMD ["yarn", "run", "start"]
RUN apt-get -qq update &&\
    apt-get install -y -q build-essential curl golang-go &&\
    curl https://sh.rustup.rs -sSf | sh -s -- -y
COPY . .
RUN yarn --ignore-engines &&\
    yarn generate-postgresql-types &&\
    yarn generate-mongodb-types &&\
    yarn run build 