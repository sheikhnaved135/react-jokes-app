import React, { useCallback, useEffect, useState } from "react";
import Loader from "react-top-loading-bar";
function Jokes() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [progress, setProgress] = useState(0);
  const [res, setres] = useState({});

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);
  const getData = async () => {
    setProgress(10);
    const res = await fetch("https://api.chucknorris.io/jokes/categories");
    setProgress(50);
    const data = await res.json();
    setCategories(data);
    {
      console.log(categories);
    }
    setProgress(100);
  };
  useEffect(() => {
    getData();
    fetchRes();
    onSearch();
  }, [selected, setSelected]);
  const fetchRes = async () => {
    setProgress(10);
    const res = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${selected}`
    );
    setProgress(50);
    const data = await res.json();
    setProgress(100);
    setres(data);
  };
  const fetchApi = async () => {
    setProgress(30);
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    setProgress(70);
    const data = await res.json();
    setProgress(100);
    setres(data);
  };
  const onSearch = async (e) => {
    e.preventDefault();
    setProgress(10);
    const res = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${search}`
    );
    setProgress(40);
    const data = await res.json();
    setProgress(70);
    setQuery(data?.result);
    setProgress(100);
  };
  {
    console.log(`category = ${query}`);
  }
  return (
    <>
      <Loader progress={progress} />
      <div className="container">
        <div className="data">
          {categories?.map((item, id) => (
            <button
              type="button"
              className="btn btn-outline-success"
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
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={onSearch}
            >
              Search
            </button>
          </form>
          {selected || search ? <h1>You Searched {selected || search}</h1> : ""}
          {selected || search ? (
            <>
              <h4>Joke:-</h4>
              {!search ? (
                <>
                  <div className="card bg-dark mb-3">
                    <div className="card-body">{res.value}</div>
                  </div>
                </>
              ) : (
                <div className="card-body mobile">
                  {query.length > 0 ? (
                    <>
                      <div className="clear">
                        <h1>Total Jokes- {query.length}</h1>
                        <button
                          type="button"
                          className="btn btn-outline-success mb-2"
                          onClick={() => {
                            setSelected("");
                            setSearch("");
                            setQuery([]);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {query.length > 0 ? (
                    query.map((e) => (
                      <>
                        <div className="card bg-dark mb-3">
                          <div className="card-body">{e.value}</div>
                        </div>
                      </>
                    ))
                  ) : (
                    <h3>Press enter to search</h3>
                  )}
                </div>
              )}
            </>
          ) : (
            "Search or Select something"
          )}
          <div className="center1">
            {selected || search ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    setSelected("");
                    setSearch("");
                    setQuery([]);
                  }}
                >
                  Clear
                </button>
              </>
            ) : (
              <></>
            )}
            {selected ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={fetchApi}
                >
                  Next
                </button>
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
