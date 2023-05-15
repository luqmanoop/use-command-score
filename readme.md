# use-command-score

> Simple, fast fuzzy search hook

Live demo https://use-command-score.vercel.app

## Install

```sh
npm install use-command-score
```

## Usage

```ts
import { useCommandScore } from "use-command-score";

useCommandScore("vsc", ["Vim", "Google chrome", "Visual studio code"]); // ['Visual studio code']
```

## Examples

Match object keys in an array & limit result. [Live demo](https://use-command-score.vercel.app/?path=/story/moviesfuzzysearch--with-limit)

```ts
useCommandScore("hger", movies, {
  limit: 3,
  keys: ["title", "meta.actors", "meta.director"]
});
```

## API

`useCommandScore(query, data, keys, options)`

### query

Type: `string`

Required: `true`

Search query string

### data

Type: `Array<T>`

Required: `true`

The data containing items to search

### options

Type: `object`

Requred: `false`

#### options.keys

Type: `Array<string>`

Required: `false`

Optional array of object paths if provided `data` is of type `Array<object>`

e.g.

```ts
const data = [
  { name: "a", address: { code: "123" } },
  { name: "b", address: { code: "456" } }
];

useCommandScore("4", data, { keys: ["name", "address.code"] });
```

#### options.limit

Type: `number`

Required: `false`

Limit the total results returned

e.g.

```ts
useCommandScore(query, data, { limit: 5 });
```
