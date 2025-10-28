if (!document.getElementById("intelliwrite-button")) {

  const button = document.createElement("button");
  
  button.id = "intelliwrite-button";
  button.textContent = "✨ AI";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 14px",
    fontSize: "16px",
    background: "#1a73e8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    zIndex: "99999",
    cursor: "pointer",
  });
  document.body.appendChild(button);

  button.addEventListener("click", () => {
   
    if (!document.getElementById("intelliwrite-sidebar")) {
      const iframe = document.createElement("iframe");
      iframe.id = "intelliwrite-sidebar";
      iframe.src = chrome.runtime.getURL("sidebar/sidebar.html");
      Object.assign(iframe.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "400px",
        height: "100vh",
        border: "none",
        zIndex: "100000",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
      });
      document.body.appendChild(iframe);
    }
  });
}
