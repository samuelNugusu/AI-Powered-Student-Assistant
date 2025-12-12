import { createUser, getUserByEmail } from "./models/userModel.js";

async function test() {
  console.log("Creating test user...");
  const user = await createUser("Test User", "test@example.com", "password123");
  console.log("Created:", user);

  console.log("\nFetching same user...");
  const fetched = await getUserByEmail("test@example.com");
  console.log("Fetched:", fetched);
}

test().catch(err => console.error(err));
