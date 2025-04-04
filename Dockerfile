FROM oven/bun:latest

WORKDIR /td1

COPY . .
RUN bun install


EXPOSE 3000

CMD ["bun", "index.ts"]