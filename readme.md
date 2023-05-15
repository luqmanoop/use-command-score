# use-command-score

> Simple, fast fuzzy search hook

Live demo https://use-command-score.vercel.app

## Install

```sh
npm install use-command-score
```

## Usage

```ts
useCommandScore("vsc", ["Vim", "Google chrome", "Visual studio code"]); // ['Visual studio code']
```

## Examples

Match object keys in an array & limit result. [Live demo](https://use-command-score.vercel.app/?path=/story/moviesfuzzysearch--with-nested-keys)

```ts
useCommandScore("hger", movies, ["title", "meta.actors", "meta.director"], { limit: 3 });
```
