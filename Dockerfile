FROM node:latest AS build
ADD . /home/backend
WORKDIR /home/backend
RUN apt update
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh -s -- -y
RUN . "$HOME/.cargo/env"

#RUN /bin/bash source .bash_profile
#RUN echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.profile
#RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -y | sh -s -- --default-toolchain nightly --component clippy 
#RUN export PATH="$PATH/.cargo/bin:$PATH",
#RUN rustup toolchain install nightly
#RUN rustup default nightly 
#RUN brew install rustup-init
#RUN rustup update
RUN apt install -y golang-go 
#RUN apt install -y rustc cargo
RUN yarn --ignore-engines
RUN npx prisma generate --schema=./source/server/prisma/schema.prisma
RUN yarn test
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "run", "run"]
