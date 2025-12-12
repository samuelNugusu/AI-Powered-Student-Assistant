import { saveAIQuery, getUserAIQueries } from "./models/aiModel.js";

const test = async () => {
  const ai = await saveAIQuery(1, "Hello AI?", "Hello user.");
  console.log("Saved AI Query:", ai);

  const queries = await getUserAIQueries(1);
  console.log("All AI Queries:", queries);
};

test();
