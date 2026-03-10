FROM oven/bun:1.3.10-alpine
RUN addgroup bunapp && adduser -S -G bunapp ESG
USER ESG

WORKDIR /backend/
COPY --chown=ESG:bunapp package.json bun.lock ./

RUN bun install

COPY --chown=ESG:bunapp . .

EXPOSE 8080

CMD [ "bun", "run", "dev" ]
