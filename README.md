# toast-me
[![npm version](https://badge.fury.io/js/toast-me.svg)](https://badge.fury.io/js/toast-me)
[![Build Status](https://travis-ci.org/a-kalinin/toast-me.svg?branch=master)](https://travis-ci.org/a-kalinin/toast-me)

Tiny, easy to use tool to show toast-like notifications on the web page.

![Demo](https://alexkalinin.ru/works/toast-me/toast-demo.gif)

## Table of Contents
* [Features](#features)
* [How to use](#how-to-use)
  * [Install](#install)
  * [Import module to your script](#import-module-to-your-script)
  * [Using](#using)
  * [Using with own customization](#using-with-own-customization)
* [Toast function arguments](#toast-function-arguments)
  * [Message argument](#message-argument)
  * [Options argument](#options-argument)
    * [Accepted options](#accepted-options)
    * [Options presets](#options-presets)
  * [Action argument](#action-argument)
* [Instance of ToastMeClass](#instance-of-toastmeclass)
* [class ToastMeClass](#class-toastmeclass)
* [Contributing](#contributing)
  * [Getting started](#getting-started)
  * [Scripts](#scripts)
  * [Structure](#structure)
  * [Readings](#readings)

## Features

* Exported in a [umd](https://github.com/umdjs/umd) format so works everywhere.
* Customizable
* Light-weight (15kB until gzip, 5kB zipped)
* Supports actions
* Pauses toast on hover

## How to use
#### Install
Install package from npm
```
yarn add toast-me
# or
npm install toast-me
```

#### Import module to your script
```javascript
import toast from 'toast-me';
```

#### Using
```javascript
toast('My message');
```

#### Using with own customization
```javascript
toast('My message', { duration: 3000, toastClass: 'my-toast-class' /* ... */ });
```

#### Using with own customization and action button
```javascript
toast(
  'My message',
  { duration: 1000 },
  {
    label: 'Confirm',
    action: () => alert('Cool!'),
    class: 'my-custom-class', // optional
  },
);
```

#### Using with action button but no customizations
```javascript
toast(
  'My message',
  null,
  {
    label: 'Confirm',
    action: () => alert('Cool!'),
  },
);
```

## Toast function arguments
```javascript
toast(message, [options, [action]]);
```
Function accepts three arguments:
* `message` - message to show in toast,
* `options` - toast customization options,
* `action` - some action button options.

Returns instance of ToastMeClass. You can learn method of it [here]()

#### Message argument

Accepts `string`, any message to put in toast.
Text shown in one line, no wraps allowed.
Overflowed text will be hidden with ellipsis.
Complete text shown on hover with the `title` attribute on toast node.

#### Options argument

**Optional** - Accepts `object` with any allowed fields, or `string` as a name of options preset, or `null`.
If you don't need to set options, but need to pass an action - pass `null` instead options.

##### Accepted options
Default options preset (all available options with their default values):
```javascript
{
  position: 'top',
  toastClass: '',
  removedToastClass: '',
  closeable: true,
  timeoutOnRemove: 1000,
  duration: 5000,
}
```
* `position` - *string*, one of `"top"` `"bottom"`. Default `"top"`.
* `toastClass` - *string*, CSS class name for toast node, can be used for custom toast styling.
Default `""` - empty string
* `closeable` - *boolean*, enables/hides "close" button on toast. Default `true`
* `timeoutOnRemove` - *number*, time in ms, till node should be removed from DOM after toast hides.
Can be useful when you change hide animation by CSS and set new animation duration.
To avoid element disappearing until animation ends set this option to larger or equal
value than animation duration. Default `1000`
* `duration` - *number*, time in ms, how long should toast be shown. Default `5000`

##### Options presets

* `default` - all default options,
* `error` - everything default, except background color - `#D40D00`

#### Action argument

**Optional** - Accepts object with three fields:
* `label` - *string*, text to put in button.
* `action` - callback *function* - to be called on button click.
* `class` - *string*, CSS class for button node.

## Instance of ToastMeClass
Has methods:
* `close()` - Closes current toast.
* `startTimer()` - Starts/restarts timer with timeout, set in options object on toast create.
* `stopTimer()` - Stops timer, the toast won't disappear. After calling this
                  you should handle toast's behavior by yourself
                  (i.e. with `close()` method).
```javascript
import toast from 'toast-me';

const message = toast('Something');
// ...
message.stopTimer();
// ...
message.close();
```

## class ToastMeClass
Has static methods:
* `removeAll(position)` - Closes all toasts in that position. Accepts one argument
                          `position`, default `"top"` (described in [options section](#accepted-options))
```javascript
import { ToastMeClass } from 'toast-me';

ToastMeClass.removeAll('bottom');
```

## Contributing

## Getting started
You will need [node.js](https://nodejs.org/en/) and preferred to have
[yarn](https://yarnpkg.com/lang/en/) to run the project.

Copy project to your local folder and then run in project's root
folder next command to load dependencies:
```
yarn
```

## Scripts
When you load all dependencies, you able to run several commands:

* `yarn build` - produces production pack of library under the `lib` folder
* `yarn run-dev`  - produces development version of your library, runs file watcher
   and http server on [http://localhost:3005](http://localhost:3005)
* `yarn watch`  - produces development version of your library, runs a file watcher
* `yarn test` - runs the tests

## Structure
* `Root folder`
  * `dev/` - Folder, containing development environment files. This folder is
             published with `yarn run-dev` command. `toast-me.js` and `taos-me.js.map`
             files inside are generated by webpack watcher from `/src` folder. You are
             able to change files in both folders and they are to be reloaded in browser.
  * `lib/` - The place production pack will be located after build. Usually you won't
             need it, until you wan't to compile library by yourself and insert in your
             project manually
  * `scripts/` - Node.js executable scripts' folder, such as `dev-server.js` or `test.js`.
    * `config/` - Configuration files' folder.
  * `src/` - Here is the code of library itself.

## Readings
1. [Git-flow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
1. [AirBnB Style Guide](https://airbnb.io/javascript/)
1. [Webpack](https://webpack.js.org/)
1. [Node.js](https://nodejs.org/en/)
1. [Yarn](https://yarnpkg.com/lang/en/)
1. [SASS](http://sass-lang.com/)
1. [Jest - main documentation](https://jestjs.io/docs/en/getting-started)
