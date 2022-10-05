set windows-shell := ["cmd.exe", "/c"]

install:
  yarn
audit-dependencies:
  yarn run audit-dependencies
build:
  yarn run build
build-docs:
  yarn run build-docs
check-dependencies:
  yarn run check-dependencies
depcheck:
  yarn run depcheck
dev:
  yarn run dev
postinstall:
  yarn run postinstall
licence-checker:
  yarn run licence-checker
lint:
  yarn run lint
remove-build:
  yarn run remove-build
start:
  yarn run start
setup-husky:
  yarn run setup-husky
test:
  yarn run test
update-dependencies:
  yarn run update-dependencies:
build-and-start:
  yarn run build-and-start