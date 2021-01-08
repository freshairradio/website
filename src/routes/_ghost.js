export const api = (path, query = "", options = {}) =>
  fetch(
    `https://content.freshair.radio/ghost/api/canary/content/${path}?key=34b251f66e79e35d36bf9d1629${query}`,
    options
  ).then((r) => r.json());
