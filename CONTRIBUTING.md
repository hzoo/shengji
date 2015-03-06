Contributing
==================

Thanks for checking out the project!

1. [Pull Requests](#pull-requests)
1. [Filing Bugs](#filing-bugs)
1. [Codebase](#codebase)
1. [Setting up Your Environment](#setting-up-your-environment)
1. [Commit Message Format](#commit-message-format)
1. [Coding Style](#coding-style)

Pull-requests
-------------
1. Please review our suggested [commit message format](#commit-message-format).
1. Please add tests for your changes.
 - Tests are located in `test/`.
 - Run `npm test` to catch failing tests.
1. Run `npm run lint` locally to catch any JSHint and JSCS errors.
1. Test the app with `npm run dev`

Filing Bugs
----

If you found an error, typo, or any other issues,
please report it using [GitHub Issues](https://github.com/hzoo/shengji/issues).
Try searching the issues to see if there is an existing report of your bug or feature request.

Provide as much detail as possible and if possible the steps to reproduce the problem. You could also include:

1. A failing test
1. Your environment: browser, operating system, etc
1. Screenshot/gif (you can ctrl+v a clipboard picture to the github textarea)
1. console error output

Codebase
--------

You will need to be familar with some javascript/node for logic/server code, react for front-end development, and of course the game itself!

- The core logic of the game is in the `lib/` directory: starting with `lib/ShengJi.js`.
- There is a corresponding folder called `test/` which contains tests for all the `lib/` files.
- Check npm commands in the `package.json` file (listed in the README).

Setting up your environment
-------

1. [Fork](https://github.com/hzoo/shengji/fork) the shengji repository
1. Clone your fork to your local machine
 - `git clone git@github.com:YOUR_NAME/shengji.git`
 - `git clone https://github.com/YOUR_NAME/shengji.git`
1. Run `npm install` in your local fork
1. Create a new branch for your fix: `git checkout -b my-fix-branch master`
1. Implement your bug fix or feature request
1. Implement the tests for your fix or feature
1. Run `npm run lint; npm test` a lot
1. Commit your code with a commit message that follows our [commit message format](#commit-message-format) if possible (otherwise we can do it)
1. Push your branch to GitHub
 - `git push origin my-fix-branch`
1. In GitHub, send a pull request to `hzoo:development`
2. If more changes are needed (from people's feedback)
 - Make the required changes
 - Run the tests/linters again
 - Rebase your branch and then force push it to Github (updating the PR)
 - `git rebase master -i`
 - `git push origin my-fix-branch -f`

> If there were changes pushed to the development branch while you were updating your PR, you will have to rebase your changes on top of the previous ones.

`git pull --ff upstream master`

Commit Message Format
-------

We are using the [angular.js commit message](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) guidelines.

This format can be achieved via:

* `git commit` to open your editor to create a multi-line commit message

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
Closes gh-<pullRequestNumber>
Fixes #<issueNumber>
```

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

Example:

```
test(ShengJi.isStronger): add another test
```

You can find other examples of this format by [viewing recent commits](https://github.com/hzoo/shengji/commits/development) made to the dev branch.

### Coding Style
- We are using jscs to check for coding style. Our config is [here](https://github.com/hzoo/shengji/blob/development/.jscsrc).
