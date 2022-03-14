module.exports = {
  branches: [
    "main"
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        message: "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
