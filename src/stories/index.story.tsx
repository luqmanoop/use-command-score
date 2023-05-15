import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { useCommandScore } from "../index";
import "./style.css";

const movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    meta: {
      actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      director: "Frank Darabont"
    }
  },
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
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    rating: 8.9,
    meta: {
      actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
      director: "Peter Jackson"
    }
  },
  {
    title: "The Irishman",
    year: 2019,
    rating: 7.9,
    meta: {
      actors: ["Robert De Niro", "Al Pacino", "Joe Pesci"],
      director: "Martin Scorsese"
    }
  },
  {
    title: "Marriage Story",
    year: 2019,
    rating: 8.0,
    meta: {
      actors: ["Adam Driver", "Scarlett Johansson", "Julia Greer"],
      director: "Noah Baumbach"
    }
  },
  {
    title: "The Two Popes",
    year: 2019,
    rating: 7.6,
    meta: {
      actors: ["Anthony Hopkins", "Jonathan Pryce", "Juan Minujín"],
      director: "Fernando Meirelles"
    }
  },
  {
    title: "The King",
    year: 2019,
    rating: 7.2,
    meta: {
      actors: ["Tom Glynn-Carney", "Gábor Czap", "Tom Fisher"],
      director: "David Michôd"
    }
  },
  {
    title: "The Laundromat",
    year: 2019,
    rating: 6.3,
    meta: {
      actors: ["Gary Oldman", "Antonio Banderas", "AJ Meijer"],
      director: "Steven Soderbergh"
    }
  }
];

const Movies = ({
  searchKeys,
  limit
}: {
  searchKeys: string[];
  limit?: number;
}) => {
  const [query, setQuery] = useState("");

  const moviesResult = useCommandScore(query, movies, searchKeys, { limit });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
      />
      <ul className="movies">
        {moviesResult.length ? (
          moviesResult.map(movie => (
            <li key={movie.title} className="movie">
              <div className="flex">
                <h3 className="movie-title">{movie.title}</h3>
                <p>{movie.year}</p>
              </div>
              <pre>
                Actors: {movie.meta.actors.map(actor => actor).join(", ")}
                <br />
                Director: {movie.meta.director}
              </pre>
            </li>
          ))
        ) : (
          <p className="no-result">No result</p>
        )}
      </ul>
    </div>
  );
};

const meta: Meta = {
  title: "MoviesFuzzySearch",
  component: Movies
};

export default meta;

export const Default: StoryObj<typeof Movies> = {
  args: {
    searchKeys: ["title"]
  }
};

export const WithNestedKeys: StoryObj<typeof Movies> = {
  args: {
    searchKeys: ["title", "meta.actors", "meta.director"]
  }
};

export const WithLimit: StoryObj<typeof Movies> = {
  args: {
    searchKeys: ["title", "meta.actors", "meta.director"],
    limit: 1
  }
};
