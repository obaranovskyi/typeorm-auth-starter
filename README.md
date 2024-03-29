# Awesome Project Build with TypeORM

Steps to run this project:

- Run `npm i` command
- Rename `.env.example` to `.env`
- Update property values inside of `.env` file
- Update db name in `data-source.ts` and `postgresql-db/props.sh`
- Run postgresql in docker container by running command `npm run start:db`
- Run `npm run dev` command


Note: When adding a new entity, don't forget to add it in `data-source.ts` file.
