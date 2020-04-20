import { getPrefs } from "./prefs";

function injectCss(path: string) {
  const link = document.createElement("link");
  link.href = chrome.extension.getURL(path);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

async function injectJs(path: string) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL(path);
    s.onload = function() {
      (this as any).remove();
      resolve();
    };
    (document.head || document.documentElement).appendChild(s);
  });
}

function sendCurrentPrefsToInjectedScripts() {
  getPrefs((prefs) => {
    console.log(prefs);
    document.dispatchEvent(new CustomEvent('prefs', { detail: prefs }));
  });
}

injectCss("src/index.css");
injectCss("src/spinner.css");
injectJs('src/index.js').then(sendCurrentPrefsToInjectedScripts);


chrome.runtime.onMessage.addListener((msg) => {
  if (msg.from === 'popup') {
    sendCurrentPrefsToInjectedScripts();
  }
});



