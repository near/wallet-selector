const CHECKLIST_TYPES = {
  ALL: (completed, numberOfTasks) => completed === numberOfTasks,
  ONE: (completed) => completed === 1,
};

const REGEX_CHECKLIST_START = new RegExp(`^<!-- CHECKLIST_TYPE: (${Object.keys(CHECKLIST_TYPES).join('|')}) -->`, 'gm');
const REGEX_CHECKLIST_END = new RegExp('^<!-- /CHECKLIST_TYPE -->', 'gm');

const REGEX_COMPLETED_TASK = /(- \[[x]\].+)/g;
const REGEX_UNCOMPLETED_TASK = /(- \[[ ]\].+)/g;

module.exports.check = function({
  context
}) {
  if(!context.payload.pull_request) throw new Error(`Unsupported payload: ${JSON.stringify(context.payload)}`);
  // Making sure the body is a string
  const body = '' + context.payload.pull_request.body.split('\n').map(line => line.trim()).join('\n');
  // Finding all the checklist start points
  const matchIterator = body.matchAll(REGEX_CHECKLIST_START);

  for (const { 0 : matched, 1: type, index } of matchIterator) {
    const part = body.substring(index);
    // Finding the end of the checklist
    const endIndex = part.search(REGEX_CHECKLIST_END);
    if(endIndex === -1) throw new Error(`Syntax error: Could not find end of checklist`);

    // Getting the content of the checklist
    const list =  part.substring(0, endIndex);

    // Separating completed and uncompleted tasks
    const completed = list.match(REGEX_COMPLETED_TASK) || [];
    const uncompleted = list.match(REGEX_UNCOMPLETED_TASK) || [];

    // Ensuring conditions for each type of the checklist are met
    if(!CHECKLIST_TYPES[type](completed.length, [...completed, ...uncompleted ].length)) throw new Error(`Invalid checklist: ${matched}`);
  }
};
