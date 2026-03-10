FROM oven/bun:1.3.10-alpine
RUN addgroup reactapp && adduser -S -G reactapp ESG
USER ESG

WORKDIR /frontend/
COPY --chown=ESG:reactapp package.json bun.lock ./

RUN bun install

COPY --chown=ESG:reactapp . .

EXPOSE 5173

CMD [ "bun", "run", "dev", "--host", "0.0.0.0" ]
