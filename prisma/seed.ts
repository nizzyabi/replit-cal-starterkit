import { PrismaClient } from "@prisma/client";

const devDb = new PrismaClient();

async function main() {
  
}

main()
  .then(async () => {
    await devDb.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await devDb.$disconnect();
    process.exit(1);
  });
