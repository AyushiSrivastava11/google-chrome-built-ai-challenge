// const input = document.getElementById("input");
// const output = document.getElementById("output");

// document.querySelectorAll("button").forEach(btn => {
//   btn.addEventListener("click", async () => {
//     const action = btn.getAttribute("data-action");
//     const text = input.value.trim();
//     if (!text) return alert("Enter some text first!");

//     output.textContent = "⏳ Processing...";

//     try {
//       let result = "";
//       switch (action) {
//         case "summarize":
//           result = await summarizeText(text);
//           break;
//         case "rewrite":
//           result = await rewriteText(text);
//           break;
//         case "proofread":
//           result = await proofreadText(text);
//           break;
//         case "translate":
//           result = await translateText(text);
//           break;
//         case "write":
//           result = await writeText(text);
//           break;
//         case "prompt":
//           result = await explainText(text);
//           break;
//       }
//       output.textContent = result;
//     } catch (err) {
//       output.textContent = "⚠️ Error: " + err.message;
//     }
//   });
// });

// // --- Placeholder Functions (we’ll replace with Chrome AI APIs) ---
// async function summarizeText(text) {
//   return "🧠 [Summary generated locally for]: " + text.slice(0, 50) + "...";
// }

// async function rewriteText(text) {
//   return "✍️ [Rewritten version of your text]";
// }

// async function proofreadText(text) {
//   return "✅ [Proofread and corrected version]";
// }

// async function translateText(text) {
//   return "🌍 [Translated version in Hindi]";
// }

// async function writeText(text) {
//   return "🪄 [New creative text generated]";
// }

// async function explainText(text) {
//   return "🎓 [Explanation of the text in simple terms]";
// }

const input = document.getElementById("input");
const output = document.getElementById("output");

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", async () => {
    const action = btn.getAttribute("data-action");
    const text = input.value.trim();
    if (!text) return alert("Enter some text first!");

    output.textContent = "⏳ Processing with " + action + "...";

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
        default:
          result = "❌ Unknown action.";
      }

      output.textContent = "✅ Result:\n\n" + result;
    } catch (err) {
      console.error(err);
      output.textContent = "⚠️ Error: " + err.message;
    }
  });
});


// --- ✅ Actual Chrome Built-In AI API Implementations ---
async function summarizeText(text) {
  const summarizer = await chrome.ai.summarizer.create();
  return await summarizer.summarize(text);
}

async function rewriteText(text) {
  const rewriter = await chrome.ai.rewriter.create();
  return await rewriter.rewrite(text);
}

async function proofreadText(text) {
  const proofreader = await chrome.ai.proofreader.create();
  const result = await proofreader.proofread(text);
  return result.correctedText || "No corrections found.";
}

async function translateText(text) {
  const translator = await chrome.ai.translator.create();
  return await translator.translate(text, "en", "hi"); // English → Hindi
}

async function writeText(text) {
  const writer = await chrome.ai.writer.create();
  return await writer.write(`Generate creative content about: ${text}`);
}

async function explainText(text) {
  const session = await chrome.ai.prompt.create();
  return await session.prompt(`Explain in simple words: ${text}`);
}
