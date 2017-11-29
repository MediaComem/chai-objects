# chai-objects

[Chai](http://chaijs.com) assertion to check an array of objects.

[![npm version](https://badge.fury.io/js/chai-objects.svg)](https://badge.fury.io/js/chai-objects)
[![Dependency Status](https://gemnasium.com/badges/github.com/MediaComem/chai-objects.svg)](https://gemnasium.com/github.com/MediaComem/chai-objects)
[![Build Status](https://travis-ci.org/MediaComem/chai-objects.svg?branch=master)](https://travis-ci.org/MediaComem/chai-objects)
[![Coverage Status](https://coveralls.io/repos/github/MediaComem/chai-objects/badge.svg?branch=master)](https://coveralls.io/github/MediaComem/chai-objects?branch=master)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.txt)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Developed at the [Media Engineering Institute](http://mei.heig-vd.ch) ([HEIG-VD](https://heig-vd.ch)).



## Installation

```bash
$> npm install --save-dev chai-objects
```



## Usage

```js
const chai = require('chai');

chai.use(require('chai-objects'));

chai.expect([
  { corge: 'grault' }, // this object is expected
  { qux: 'warply' }    // this object is not expected
]).to.have.objects([
  { foo: 'bar' },          // this object is missing
  { bar: { baz: 'qux' } }, // this object is missing
  { corge: 'grault' },
]);

// AssertionError: expected to find the following missing objects:
// - {"foo":"bar"}
// - {"bar":{"baz":"qux"}}
//
// The following extra objects were found:
// - {"qux":"warply"}
```
