
# OpenDataAPI

The Bewai open data api (ODA) is a project for importing large quantities of data from remotely downloaded files, mostly in csv format.

It enables data to be imported into a Postgres database and then retrieved via an Express API.

This project runs on Docker.

## How it works

The ODA comes with several scripts to create tables, download fresh data files from remote sources and parallel data import into Postgres databse without affecting the availability of the API.
You can either run these commands directly with npm (`npm run [...]`) or with the `./docker-service [...]` script file.

These scripts can be found in the `src/utils` directory.

### Available commands

> commands can be either executed with `npm run [command]` or with `./docker-service [command]`. If you are using the docker stack, you better use `./docker-service`.

| Command name | Description |
|--|--|
| `initTables` | Create all tables, their columns and indexes if not existing |
| `downloadAssets {entity}` | Download fresh data file for the given entity from configured remote source |
| `importData` | (Interactive) Imports the data for the given entity from a data file in the `assets` folder. Usually from `.csv` files. A custom CSV separator can be specified in the script file `dataSets` configuration object. |

> `unzip` **needs to be installed directly on the machine**. Because of some NodeJS limitations with Buffer size, extracting large `.zip` files with a NodeJS library can't be done properly.

## Run the stack

In order to run the project, if you're on a Unix-based kernel machine (Mac OS / Linux) you can run commands through the `./docker-service` file.

### Unix-based machine

#### Start all the stack (or reinstall existing stack)

```bash
./docker-service  initialize
```

#### Serve the API (for development purposes)

```bash
./docker-service  serve
```

#### Start the whole stack

```bash
./docker-service  start
```

#### Stop the whole stack

```bash
./docker-service  stop
```

#### Run test (lint, unit)

```bash
./docker-service  tests
```
