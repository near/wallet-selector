const REGEX_CHANGE_TYPE = /(- \[[x]\] (PATCH|MINOR|MAJOR).+)/g;
module.exports.update = async function({
  context,
  github
}) {
  if(!context.payload.pull_request) throw new Error(`Unsupported payload: ${JSON.stringify(context.payload)}`);
  let { title, body } = context.payload.pull_request;

  for(const { 2: type } of body.matchAll(REGEX_CHANGE_TYPE)) {
    title = `[${type}] ${title.replace(/^\[(PATCH|MINOR|MAJOR)\]/g, '').trim()}`;
  }

  const updateParams = {
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    title
  };

  await github.issues.update(updateParams);

}
