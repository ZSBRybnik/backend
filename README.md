# backend

## Requirements

- [Docker](https://www.docker.com/) (optional)

### Windows

- [NVM](https://github.com/coreybutler/nvm-windows) or [Vanilla Node.JS](https://nodejs.dev/en/)
- [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Chocolatey](https://chocolatey.org/) (optional, because of autoinstall script)
- [Rust](https://www.rust-lang.org/tools/install) (optional, because of autoinstall script)
- [Go](https://community.chocolatey.org/packages/golang) (optional, because of autoinstall script)
- [Pulumi](https://community.chocolatey.org/packages/pulumi) (optional, because of autoinstall script)
- [GCC](https://community.chocolatey.org/packages/mingw) (optional, because of autoinstall script)

### MacOS & Linux

- [NVM](https://github.com/nvm-sh/nvm) or [Vanilla Node.JS](https://nodejs.dev/en/)
- [Brew](https://brew.sh/) (optional, because of autoinstall script)
- [Rust](https://formulae.brew.sh/formula/rustup-init) (optional, because of autoinstall script)
- [Go](https://formulae.brew.sh/formula/go) (optional, because of autoinstall script)
- [Pulumi](https://formulae.brew.sh/formula/pulumi) (optional, because of autoinstall script)

### Environmental variables

To successfully run project you have to set environmental variables in `.env` file.

```env
POSTGRESQL_URL="postgresql://login:password@address:port/database?schema=databaseSchema"
MONGODB_URL="mongodb+srv://login:password@address:port/database?retryWrites=true&w=majority"
EMAIL="email"
EMAIL_PASSWORD="emailPassword"
AWS_ACCESS_KEY_ID="id"
AWS_SECRET_ACCESS_KEY="key"
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
