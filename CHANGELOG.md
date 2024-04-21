# Changelog

## [3.0.2](https://github.com/npm/read/compare/v3.0.1...v3.0.2) (2024-04-21)

### Chores

* [`ff55321`](https://github.com/npm/read/commit/ff55321ffe74704ac8be59e1519773f79ce039cf) [#100](https://github.com/npm/read/pull/100) bump @typescript-eslint/parser from 6.21.0 to 7.2.0 (#100) (@dependabot[bot])
* [`fedd12b`](https://github.com/npm/read/commit/fedd12b7af71b40b7c0e47f937d865c3ca0bbed4) [#102](https://github.com/npm/read/pull/102) postinstall for dependabot template-oss PR (@lukekarrys)
* [`ee55340`](https://github.com/npm/read/commit/ee5534088f5c62ea009d856b2980423dcac360ec) [#102](https://github.com/npm/read/pull/102) bump @npmcli/template-oss from 4.21.3 to 4.21.4 (@dependabot[bot])

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
