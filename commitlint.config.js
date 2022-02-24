module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.includes('chore(release): set `package.json` to')],
}
