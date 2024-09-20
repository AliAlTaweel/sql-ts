import Fastify from "fastify";
import pg from "pg";

const { Client } = pg;
const client = new Client({
  database: "suomioy",
});
await client.connect();

console.log("connettore!");

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  const result = await client.query(
    "SELECT * FROM person ORDER BY id LIMIT 100"
  );
  reply.send(result.rows);
  reply.send({ hello: "world" });
});

fastify.listen({ port: 5678 }).then((address) => {
  console.log("hellorei!");
});

/*
const hello = (name: string) => {
  return `Hello,${name}!`;
};
const result = hello("peksuliini");
console.log(result);
*/
