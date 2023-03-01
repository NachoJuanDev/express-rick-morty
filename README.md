# PINFLAG NODE JS CHALLENGE

## Requerimientos

- Node.js v16 https://nodejs.org/en/download/
- Yarn https://classic.yarnpkg.com/en/docs/install
- Docker o
- Postgres v15

## Ejecutar el proyecto

1. Configurar postgres. Si utilizas docker puedes usar el siguiente comando

```bash
docker pull postgres:15 && docker run --name pinflag_challenge_db -e POSTGRES_DB=pinflag_challenge -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

2. Crear un archivo `.env` a partir del archivo `.env.example`. Revisa que los datos de docker coincidan con el valor de las variables de entorno

3. Instalar dependencias

```bash
yarn install
```

4. Correr las migraciones

```bash
yarn sequelize db:migrate
```

Puedes revisar más comandos de sequelize ejecutando `yarn sequelize`

5. Ejecutar el servidor

```bash
# production
yarn start 

# development
yarn dev

# dev + nodemon
yarn dev:watch
```

## Tests

Para crear los tests se utilizo y jest y superserver. Las llamadas a la API y a la base de datos fueron cubiertas con Mocks de jest según las funcionalidades implementadas en el proyecto, por lo que no es necesario configurar ninguna base de datos para tests.

Para ejecutar los tests:

```bash
yarn test
```

## Notas extras

- El proyecto incialmente utilizaba NPM, sin embargo, al realizar `npm install` el comando arroja un error por conflictos con eslint. Debido a esto, y principalmenete por comodidad, decidi utilizar `yarn`.

- Intenté no modificar la estrucutra del proyecto y mantener dentro de las convenciones que utilizaban. Sin embargo, realicé cambios que me permitieron trabajar más cómodo.

- En algunas partes del proyecto utilicé JSDoc para tener autocompletado y sugerencia en VSCode.

- Antes de esta prueba técnica no había utilizado swagger, superagent ni había realizado Mock con Jest. Respecto a lo demás, tenía algo de experiencia trabajando con express y sequelize.

- Preferí utilizar query params para pasar los datos a los endpoints simplemente porque me resulta más natural que los url params
