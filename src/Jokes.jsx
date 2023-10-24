import React, { useCallback, useEffect, useState } from "react";
function Jokes() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [res, setres] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
    setLoading(false);
  }, []);
  useEffect(() => {
    fetch(`https://api.chucknorris.io/jokes/random?category=${selected}`)
      .then((res) => res.json())
      .then((data) => setres(data));
  }, [selected, setSelected]);
  const fetchApi = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((data) => setres(data));
  };
  const onSearch = (e) => {
    e.preventDefault();
    fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
      .then((res) => res.json())
      .then((data) => setQuery(data?.result));
  };
  {
    console.log(`category = ${query}`);
  }
  return (
    <>
      <div className="container">
        <div className="data">
          {categories.map((item, id) => (
            <button
              key={id}
              onClick={() => {
                setSelected(item);
                setSearch("");
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="center">
          <form className="search" onSubmit={onSearch}>
            <input
              onSubmit={onSearch}
              className="search"
              type="text"
              placeholder="search jokes....like-hacker,danger"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected("");
              }}
            />
          </form>
          <h1>You Selected {selected || search}</h1>
          {selected || search ? (
            <>
              <h4>Joke:-</h4>
              {!search ? (
                <>
                  <h1>{res.value}</h1>
                </>
              ) : (
                <>
                  <h1> total results are - {query.length}</h1>
                  {query.map((e) => (
                    <>
                      <ul>
                        <li>{e.value}</li>
                      </ul>
                    </>
                  ))}
                </>
              )}
            </>
          ) : (
            "You have not selected anything"
          )}
          <div className="center1">
            <button
              type="reset"
              onClick={() => {
                setSelected("");
                setSearch("");
                setQuery([]);
              }}
            >
              reset
            </button>
            {selected ? (
              <>
                <button onClick={fetchApi}>newJoke</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jokes;
