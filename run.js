import agent from "./agent.json" with { type: "json" };

// Minimal runner — plug in your own LLM provider.
export async function run(userMessage, callLLM) {
  const examples = agent.training_examples || [];
  const fewShot = examples.slice(-6).map(e => `User: ${e.input}\nAgent: ${e.output}`).join("\n\n");
  return callLLM({
    system: `${agent.system_prompt}\n\nExamples:\n${fewShot}`,
    prompt: userMessage,
  });
}

console.log(`${agent.name} — level ${agent.level}, ${agent.epochs} verified epochs`);
