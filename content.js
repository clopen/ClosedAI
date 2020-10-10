const DEFAULT_REPLACEMENT = "ClosedAI";

const walkDOMAndReplaceOpenAI = replacement => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, {
    acceptNode: node => {
      // Skip textarea.
      if ((node.tagName || "").toLowerCase() === "textarea") {
        return NodeFilter.FILTER_REJECT;
      }
      // Skip common web editors.
      if (
        node.classList &&
        (node.classList.contains("ace_editor") ||
          node.classList.contains("monaco-editor"))
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(/\bOpenAI\b/g, replacement);
    }
  }
};

chrome.storage.sync.get(["replacement"], result => {
  const replacement = (result && result.replacement) || DEFAULT_REPLACEMENT;
  document.title = document.title.replace(/\bOpenAI\b/g, replacement);
  walkDOMAndReplaceOpenAI(replacement);
});
