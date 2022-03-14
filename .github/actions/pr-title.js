const CONVENTIONAL_COMMIT_CHANGES = {
  FIX: 'fix',
  FEATURE: 'feat',
  BUILD: 'build',
  CHORE: 'chore',
  CI: 'ci',
  DOCS: 'docs',
  STYLE: 'style',
  REFACTOR: 'refactor',
  PERFORMANCE: 'perf',
  TEST: 'test',
  CHORE: 'chore'
};

const REGEX_CHANGE_TYPE = new RegExp(`(- \\[[x]\\] (${Object.keys(CONVENTIONAL_COMMIT_CHANGES).join('|')}).+)`, 'g');

module.exports.update = async function ({
  context,
  github
}) {
  if (!context.payload.pull_request) throw new Error(`Unsupported payload: ${JSON.stringify(context.payload)}`);


  let { title, body, labels = [] } = context.payload.pull_request;

  const scopes = labels.map(label => label.name).filter(label => label.startsWith('scope:')).map(label => label.substring(6));

  if (scopes.length > 1) throw new Error(`Too many scopes: ${scopes.join(', ')}`);

  const [ scope ] = scopes;

  for (const { 2: type } of body.matchAll(REGEX_CHANGE_TYPE)) {
    title = `${CONVENTIONAL_COMMIT_CHANGES[type]}${scope ? '(' + scope + ')' : ''}: ${title.replace(/^.*:(\s)?/g, '').trim()}`;
  }


  const [ match ] = body.match(/(- \[[x]\] (BREAKING CHANGE).+)/g) || [];

  title = title.replace(/(\n)?(BREAKING CHANGE).+/g, '');

  if(match) {
    const [, reason] = match.split(':');
    title = `${title}
    BREAKING CHANGE: ${reason}`;
  }


  const updateParams = {
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    title
  };

  await github.issues.update(updateParams);
}
