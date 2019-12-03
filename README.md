

# Installation
`$ yarn add @nexapp/debounce-await`

or

`$ npm install @nexapp/debounce-await --save`

# Usage

Like `debounce`, but instead of using a delay, it's based on promises' resolve status.

Eg: If you execute a promise twice, but the first promise has not resolved, it won't trigger the second one.

For code examples, please refer to the [tests](./test/debounceAwait.test.ts).
