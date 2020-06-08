import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = ({ match }) => {
  const query = match.params.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      const searchResults = res.data.results.filter(
        (item) => item.media_type !== "person"
      );
      setResults(searchResults);
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <p>search results for {query}</p>
    </div>
  );
};

export default Results;
