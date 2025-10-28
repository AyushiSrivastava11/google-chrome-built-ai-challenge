const input = document.getElementById("input");
const output = document.getElementById("output");

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", async () => {
    const action = btn.getAttribute("data-action");
    const text = input.value.trim();
    if (!text) return alert("Enter some text first!");

    output.textContent = "⏳ Processing...";

    try {
      let result = "";
      switch (action) {
        case "summarize":
          result = await summarizeText(text);
          break;
        case "rewrite":
          result = await rewriteText(text);
          break;
        case "proofread":
          result = await proofreadText(text);
          break;
        case "translate":
          result = await translateText(text);
          break;
        case "write":
          result = await writeText(text);
          break;
        case "prompt":
          result = await explainText(text);
          break;
      }
      output.textContent = result;
    } catch (err) {
      output.textContent = "⚠️ Error: " + err.message;
    }
  });
});

// --- Placeholder Functions (we’ll replace with Chrome AI APIs) ---
async function summarizeText(text) {
  return "🧠 [Summary generated locally for]: " + text.slice(0, 50) + "...";
}

async function rewriteText(text) {
  return "✍️ [Rewritten version of your text]";
}

async function proofreadText(text) {
  return "✅ [Proofread and corrected version]";
}

async function translateText(text) {
  return "🌍 [Translated version in Hindi]";
}

async function writeText(text) {
  return "🪄 [New creative text generated]";
}

async function explainText(text) {
  return "🎓 [Explanation of the text in simple terms]";
}
