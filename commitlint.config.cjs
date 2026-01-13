module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => message.includes('Version Packages'),
    (message) => message.includes('[skip ci]'),
    (message) => message.startsWith('RELEASING:'),
  ],
};
