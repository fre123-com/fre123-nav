"use strict";

// src/client.ts
function post(data) {
  return fetch("__POST_PATH__", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
function include(set, v) {
  for (const i of v)
    set.add(i);
}
console.log(
  "%c[windicss] devtools support enabled %c\nread more at https://windicss.org",
  "background:#0ea5e9; color:white; padding: 1px 4px; border-radius: 3px;",
  ""
);
var visitedClasses = /* @__PURE__ */ new Set();
var pendingClasses = /* @__PURE__ */ new Set();
var _timer;
function schedule() {
  if (_timer != null)
    clearTimeout(_timer);
  _timer = setTimeout(() => {
    if (pendingClasses.size) {
      post({ type: "add-classes", data: Array.from(pendingClasses) });
      include(visitedClasses, pendingClasses);
      pendingClasses.clear();
    }
  }, 10);
}
var mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class" && mutation.target) {
      Array.from(mutation.target.classList || []).forEach((i) => {
        if (!visitedClasses.has(i))
          pendingClasses.add(i);
      });
      schedule();
    }
  });
});
mutationObserver.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true,
  attributes: true
});
