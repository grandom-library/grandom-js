module.exports = {
  types: [
    {
      value: 'feat',
      name: 'A new feature'
    },
    {
      value: 'fix',
      name: 'A bug fix'
    },
    {
      value: 'perf',
      name: 'A code change that improves performance'
    },
    {
      value: 'refactor',
      name: 'A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'test',
      name: 'Adding of missing tests or fixing existing tests'
    },
    {
      value: 'style',
      name: 'Changes that do not affect the meaning of the code (e.g.: linting issues, white-space, formatting, ...)'
    },
    {
      value: 'docs',
      name: 'Documentation only changes'
    },
    {
      value: 'build',
      name:
        'Changes that affect the build system or external dependencies (e.g.: npm, webpack, gulp, ...)'
    },
    {
      value: 'ci',
      name:
        'Changes to CI/CD configuration files and scripts (e.g.: GitHub Actions, BrowserStack, SauceLabs, ...)'
    },
    {
      value: 'chore',
      name: 'Other changes that don\'t modify src or test files'
    }
  ],
  scopes: [
    { name: 'root' },
    { name: 'bigint' },
    { name: 'boolean' },
    { name: 'core' },
    { name: 'data' },
    { name: 'engines' },
    { name: 'grandom' },
    { name: 'number' },
    { name: 'pick' },
    { name: 'shuffle' },
    { name: 'string' },
    { name: 'weighted' }
  ],
  messages: {
    type: 'Select the type of change that you\'re committing',
    customScope: 'Denote the SCOPE of this change',
    customScopeEntry: 'Custom scope...',
    scope: 'Denote the SCOPE of this change (optional)',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line',
    breaking: 'List any BREAKING CHANGES (optional)',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34'
  },
  allowCustomScopes: true,
  subjectLimit: 100,
}
