import React, { useEffect } from "react";
import axios from "axios";

const Details = ({ match }) => {
  const { type, id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      console.log(res.data);
    };
    fetchData();
  }, [type, id]);

  return (
    <div>
      <p>
        This is the detail page for {type} {id}
      </p>
    </div>
  );
};

export default Details;
