export const api = (path, query = "", options = {}) =>
  fetch(
    `https://content.freshair.org.uk/ghost/api/canary/content/${path}?key=335cdc08c8018af3c8cbb85c64${query}`,
    options
  ).then((r) => r.json());
