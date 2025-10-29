// ===============================
// INTELLIWRITE – CHROME AI WRAPPER
// ===============================
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const action = btn.getAttribute("data-action");
    const text = inputEl.value.trim();
    if (!text) return alert("Please enter some text first!");

    outputEl.textContent = `⏳ Running ${action}...`;

    try {
      const ai = chrome.ai || {};
      let result = "";

      // ---- CASE 1: Chrome has specific API (future-proof)
      if (ai[action]) {
        const instance = await ai[action].create();
        switch (action) {
          case "summarizer":
            result = await instance.summarize(text);
            break;
          case "rewriter":
            result = await instance.rewrite(text);
            break;
          case "proofreader":
            const correction = await instance.proofread(text);
            result = correction.correctedText;
            break;
          case "translator":
            result = await instance.translate(text, "en", "es");
            break;
          case "writer":
            result = await instance.write(text);
            break;
          default:
            result = "❌ Unknown action";
        }
        instance.destroy?.();

      // ---- CASE 2: Fallback using prompt API (works today)
      } else if (ai.prompt?.create) {
        const session = await ai.prompt.create();
        const instruction = makePromptInstruction(action, text);
        result = await session.prompt(instruction);
        session.destroy?.();

      } else {
        result = "⚠️ chrome.ai APIs unavailable. Please enable flags or use Chrome Canary.";
      }

      outputEl.textContent = result;
    } catch (err) {
      console.error(err);
      outputEl.textContent = "⚠️ Error: " + err.message;
    }
  });
});

// Helper: build instruction for prompt fallback
function makePromptInstruction(action, text) {
  switch (action) {
    case "summarize":
      return `Summarize this text concisely:\n\n${text}`;
    case "rewrite":
      return `Rewrite this text for better clarity and tone:\n\n${text}`;
    case "proofread":
      return `Proofread and correct grammar and spelling in this text:\n\n${text}`;
    case "translate":
      return `Translate this text to Spanish:\n\n${text}`;
    case "write":
      return `Write a creative paragraph based on this idea:\n\n${text}`;
    case "prompt":
      return `Explain this text simply:\n\n${text}`;
    default:
      return text;
  }
}
