# backend

## Requirements

- [Docker](https://www.docker.com/) (optional)
- [FaunaDB](https://fauna.com/)
- [NATS Server](https://github.com/nats-io/nats-server/releases)

### Windows

- [NVM](https://github.com/coreybutler/nvm-windows) or [Vanilla Node.JS](https://nodejs.dev/en/)
- [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)
- [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
- [Prometheus](https://prometheus.io/)
- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/#windows) (optional)
- [IPFS CLI](https://docs.ipfs.tech/install/command-line/#windows) (optional)
- [Chocolatey](https://chocolatey.org/) (optional, because of autoinstall script)
- [Rust](https://www.rust-lang.org/tools/install) (optional, because of autoinstall script)
- [Go](https://community.chocolatey.org/packages/golang) (optional, because of autoinstall script)
- [Pulumi](https://community.chocolatey.org/packages/pulumi) (optional, because of autoinstall script)
- [GCC](https://community.chocolatey.org/packages/mingw) (optional, because of autoinstall script)

### MacOS

- [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition)
- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/#macos) (optional)
- [IPFS CLI](https://docs.ipfs.tech/install/command-line/#macos) (optional)

### Linux

- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
- [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/#ubuntu) (optional)
- [IPFS CLI](https://docs.ipfs.tech/install/command-line/#linux) (optional)

### MacOS & Linux

- [NVM](https://github.com/nvm-sh/nvm) or [Vanilla Node.JS](https://nodejs.dev/en/)
- [PostgreSQL](https://formulae.brew.sh/formula/postgresql@14)
- [Redis](https://formulae.brew.sh/formula/redis)
- [Prometheus](https://formulae.brew.sh/formula/prometheus)
- [Brew](https://brew.sh/) (optional, because of autoinstall script)
- [Rust](https://formulae.brew.sh/formula/rustup-init) (optional, because of autoinstall script)
- [Go](https://formulae.brew.sh/formula/go) (optional, because of autoinstall script)
- [Pulumi](https://formulae.brew.sh/formula/pulumi) (optional, because of autoinstall script)

### Environmental variables

To successfully run project you have to set environmental variables in `.env` file.

```env
POSTGRESQL_URL="postgresql://login:password@address:port/database?schema=databaseSchema"
MONGODB_URL="mongodb+srv://login:password@address:port/database?retryWrites=true&w=majority"
FAUNADB_KEY="key"
EMAIL="email"
EMAIL_PASSWORD="emailPassword"
AWS_ACCESS_KEY_ID="id"
AWS_SECRET_ACCESS_KEY="key"
DISCORD_TOKEN="token"
DISCORD_SERVER_ID="id"
```

## Commands

### To install dependencies

```sh
yarn
```

or

```sh
just install
```

### To install dependencies when you meet any problems with engine version

```sh
yarn --ignore-engines
```

### To generate PostgreSQL database typescript

```sh
yarn run generate-postgresql-types
```

or

```sh
just generate-postgresql-types
```

### To generate MongoDB database typescript

```sh
yarn run generate-mongodb-types
```

or

```sh
just generate-mongodb-types
```

### To build production-ready project

```sh
yarn run build
```

or

```sh
just build
```

### To run project

```sh
yarn run start
```

or

```sh
just start
```

### To run command that builds project in development mode with hot reloading on save

```sh
yarn run dev
```

or

```sh
just dev
```

### To run tests (unit & integration tests)

```sh
yarn run test
```

or

```sh
just test
```
