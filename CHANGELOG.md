# Changelog

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
