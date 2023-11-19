import fs from "fs";

function getWebComponentsJs(): string {
  // eslint-disable-next-line no-undef
  const path = require.resolve("skytech-web-components/index.js");

  return fs.readFileSync(path).toString();
}

function getWebComponentsCss(): string {
  // eslint-disable-next-line no-undef
  const path = require.resolve("skytech-web-components/index.css");

  return fs.readFileSync(path).toString();
}

export { getWebComponentsJs, getWebComponentsCss };
