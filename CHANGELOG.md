# Changelog

## [4.0.0](https://github.com/npm/read/compare/v3.0.1...v4.0.0) (2024-09-25)
### ⚠️ BREAKING CHANGES
* `read` now supports node `^18.17.0 || >=20.5.0`
### Bug Fixes
* [`eddeb02`](https://github.com/npm/read/commit/eddeb02b2a807a2e8112126c5c3aacccf134d9fc) [#124](https://github.com/npm/read/pull/124) align to npm 10 node engine range (@hashtagchris)
### Dependencies
* [`0641d3a`](https://github.com/npm/read/commit/0641d3a4f022d0d779a8cbd8d18c4e27a4054afd) [#124](https://github.com/npm/read/pull/124) `mute-stream@2.0.0`
### Chores
* [`1b07665`](https://github.com/npm/read/commit/1b076658be7170593a8796e2f0db2184c3a72831) [#109](https://github.com/npm/read/pull/109) bump c8 from 8.0.1 to 10.1.2 (#109) (@dependabot[bot])
* [`cdf4cd8`](https://github.com/npm/read/commit/cdf4cd81806f06062d0c106dc336c4d32ca725c4) [#122](https://github.com/npm/read/pull/122) bump @npmcli/eslint-config from 4.0.5 to 5.0.0 (#122) (@dependabot[bot])
* [`104dc92`](https://github.com/npm/read/commit/104dc924fa08142f5de1fdfd84fa8f33a0cd7556) [#116](https://github.com/npm/read/pull/116) bump tshy from 1.18.0 to 3.0.2 (#116) (@dependabot[bot])
* [`8f24ce4`](https://github.com/npm/read/commit/8f24ce489125cf44bba5022bc0474a7c097bdb07) [#124](https://github.com/npm/read/pull/124) run template-oss-apply (@hashtagchris)
* [`8a7ba09`](https://github.com/npm/read/commit/8a7ba0924f1850cb686de768ab83d7e65e1004e7) [#120](https://github.com/npm/read/pull/120) bump @typescript-eslint/parser from 7.18.0 to 8.0.1 (#120) (@dependabot[bot])
* [`d6beca8`](https://github.com/npm/read/commit/d6beca844bcc8c662ab2856c99a6312fd727e9e7) [#103](https://github.com/npm/read/pull/103) bump @npmcli/template-oss to 4.22.0 (@lukekarrys)
* [`ff55321`](https://github.com/npm/read/commit/ff55321ffe74704ac8be59e1519773f79ce039cf) [#100](https://github.com/npm/read/pull/100) bump @typescript-eslint/parser from 6.21.0 to 7.2.0 (#100) (@dependabot[bot])
* [`d30350d`](https://github.com/npm/read/commit/d30350d8d7eafe7ac1b476d1232e68bb22209308) [#123](https://github.com/npm/read/pull/123) postinstall for dependabot template-oss PR (@hashtagchris)
* [`8558668`](https://github.com/npm/read/commit/8558668dc1c9f02bd63360910389e04319980c1d) [#123](https://github.com/npm/read/pull/123) bump @npmcli/template-oss from 4.23.1 to 4.23.3 (@dependabot[bot])

## [3.0.1](https://github.com/npm/read/compare/v3.0.0...v3.0.1) (2023-11-20)

### Bug Fixes

* [`22cb8dc`](https://github.com/npm/read/commit/22cb8dc5c7b567cd2d890ca2d71fed1faaf52d29) [#84](https://github.com/npm/read/pull/84) only ship dist files (@lukekarrys)

## [3.0.0](https://github.com/npm/read/compare/v2.1.0...v3.0.0) (2023-11-16)

### ⚠️ BREAKING CHANGES

* `read` is now written in TypeScript and types are now shipped as part of this package.

### Features

* [`18cb7bd`](https://github.com/npm/read/commit/18cb7bd9f364a5cafabd9cb52942f048da7178af) [#77](https://github.com/npm/read/pull/77) convert to typescript and esm (#77) (@lukekarrys)

### Documentation

* [`ada826d`](https://github.com/npm/read/commit/ada826d2ded4e35a1e60d9f50dc31fda083d2a5d) [#59](https://github.com/npm/read/pull/59) remove unnecessary callback param (#59) (@igrep)

## [2.1.0](https://github.com/npm/read/compare/v2.0.0...v2.1.0) (2023-04-13)

### Features

* [`c149cf9`](https://github.com/npm/read/commit/c149cf998223e2ae45c013768038717bc4a1c543) [#51](https://github.com/npm/read/pull/51) add completer option to forward to readline (#51) (@wraithgar, @131)

### Bug Fixes

* [`c5932e8`](https://github.com/npm/read/commit/c5932e8d223990dd65a46226f560768c430d1888) [#35](https://github.com/npm/read/pull/35) Support rare \r line break (#35) (@NikxDa, @wraithgar, @wraithgar)
* [`f30fe66`](https://github.com/npm/read/commit/f30fe6640287cbd5a341b7a9f65a60e40558e389) [#52](https://github.com/npm/read/pull/52) extra newline on muted, replaced input (#52) (@wraithgar, @deed02392)

## [2.0.0](https://github.com/npm/read/compare/v1.0.7...v2.0.0) (2022-12-13)

### ⚠️ BREAKING CHANGES

* this module has been refactored to use promises
    - the API is now promise only and no longer accepts a callback
    - the Promise is resolved to a string and no longer returns `isDefault`
* this package is now compatible with the following semver range for node: `^14.17.0 || ^16.13.0 || >=18.0.0`

### Features

* [`c5b56f6`](https://github.com/npm/read/commit/c5b56f6242493173ded23a97f4fd2ffb4017310f) use async/await (@lukekarrys)
* [`5a7563b`](https://github.com/npm/read/commit/5a7563bf20ae1392ee0d0b29a4d0ac5c23df9a33) add template-oss (@lukekarrys)

### Documentation

* [`711d7cd`](https://github.com/npm/read/commit/711d7cd6a3d58472b88c7db1ab2129f37304d72c) [#30](https://github.com/npm/read/pull/30) Fix typo "Writeable" => "Writable" in README.MD (#30) (@vitalymak, @vitalymak)

### Dependencies

* [`6102578`](https://github.com/npm/read/commit/6102578bd1c9d192a1d6601564faa066af13b35d) [#42](https://github.com/npm/read/pull/42) bump mute-stream from 0.0.8 to 1.0.0 (#42)
