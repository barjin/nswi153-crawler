# nswi153-crawler

Semestral project for the NSWI153 class.

## dev setup

To start developing this project, run

```bash
npm ci
npm run build
```

to install the dependencies and build the prerequisites for the project.

Then you can run

```bash
/packages/backend$ npm run dev
```

to start the backend server and

```bash
/packages/frontend$ npm run dev
```

to start the frontend server.

## production setup

To build the production Dockerfile, run

```bash
docker build -t nswi153-crawler .
```

in the root of the project.

Run the container with

```bash
docker run -p 3000:3000 nswi153-crawler
```

---

Made by Viktória Hurtišová, Viktorija Panovska and Jindřich Bär. 2024
