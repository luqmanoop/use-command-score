# use-command-score

> Simple, fast fuzzy search hook

## Install

```sh
npm install use-command-score
```

## Usage

```ts
useCommandScore("al", ["Ronaldo", "Messi", "Neymar", "Haaland"]); // ['Ronaldo', 'Haaland']
```

```ts
useCommandScore("vsc", ["Vim", "Google chrome", "Visual studio code"]); // ['Visual studio code']
```

### Match object key path

```ts
const movies = [
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    meta: {
      actors: ["Marlon Brando", "Al Pacino", "James Caan"],
      director: "Francis Ford Coppola"
    }
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    meta: {
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan"
    }
  }
];

useCommandScore("hger", movies, ["title", "meta.actors", "meta.director"]);
```
