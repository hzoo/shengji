[![Dependency Status]](https://david-dm.org/hzoo/shengji)
[![devDependency Status]](https://david-dm.org/hzoo/shengji#info=devDependencies)

#### [Master]
[![Master Codeship Status]](https://codeship.com/projects/54845) [![Master Coverage Status]](https://coveralls.io/r/hzoo/shengji?branch=development)

#### [Dev]
[![Dev Codeship Status]](https://codeship.com/projects/54845) [![Dev Coverage Status]](https://coveralls.io/r/hzoo/shengji?branch=development)

**Sheng Ji** (Level Up) is a family of popular chinese trick-taking card games that has many variations.
It has dynamic trumps, fixed/dynamic teams, and multiple rounds.

You can think of it as a combination/variation of rules from:
- Spades/Hearts
  - Highest ranking hand wins the trick.
  - You need follow the leading player's suit when possible.
  - Gain points (5, 10, K) instead of avoiding hearts.
  - You want to become void/short in a suit to play off-suit.

These games include:
 - Sìshí Fēn (40 points), Bāshí Fēn (80 points), Dǎ Bǎi Fēn (100 points)
 - Tuō Lā Jī (Tractor)
 - Zhǎo Péngyǒu (Looking for Friends)

> Rules: https://en.wikipedia.org/wiki/Sheng_Ji

- Contributing: [CONTRIBUTING.md](https://github.com/hzoo/shengji/blob/development/CONTRIBUTING.md)

## [npm scripts]
> npm install

Development Server
> npm run dev

Tests
> npm test

Coverage
> npm run coverage

Linters (jshint, jscs)
> npm run lint

[Dependency Status]: https://img.shields.io/david/hzoo/shengji.svg?style=flat-square
[devDependency Status]: https://img.shields.io/david/dev/hzoo/shengji.svg?style=flat-square
[Master]: http://sheng-ji.herokuapp.com/
[Dev]: http://sheng-ji-dev.herokuapp.com/
[Master Codeship Status]: https://img.shields.io/codeship/9ded0240-72c2-0132-69bb-06c77d4bfcaa/master.svg?style=flat-square
[Master Coverage Status]: https://img.shields.io/coveralls/hzoo/shengji/master.svg?style=flat-square
[Dev Codeship Status]: https://img.shields.io/codeship/9ded0240-72c2-0132-69bb-06c77d4bfcaa/development.svg?style=flat-square
[Dev Coverage Status]: https://img.shields.io/coveralls/hzoo/shengji/development.svg?style=flat-square
[npm scripts]: package.json
