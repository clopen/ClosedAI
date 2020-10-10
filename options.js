const DEFAULT_REPLACEMENT = "ClosedAI";

const restoreOptions = () => {
  chrome.storage.sync.get(["replacement"], result => {
    document.getElementById("replacement").value =
      (result && result.replacement) || DEFAULT_REPLACEMENT;
  });
};

restoreOptions();

document.getElementById("options").addEventListener("submit", event => {
  chrome.storage.sync.set(
    {
      replacement:
        document.getElementById("replacement").value.trim() ||
        DEFAULT_REPLACEMENT,
    },
    restoreOptions
  );
  event.preventDefault();
});
