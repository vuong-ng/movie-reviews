// import { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

const Card = ({ id, title, img }) => {
    // const abs = __dirname
    return (
        <div className='card' key={id}>
            <img src={img} alt="" className="movie-img" width="200px" height="300px" />
            <h2>{title}</h2>
            <br />
            <a href={`Users/vuongnguyen/Documents/movie-fullstack-backend/frontend/movie-frontend/src/movie.html?id=${id}&title=${title}`}>Reviews</a>
            {/* <Link to={`./movie.html?id=${id}&title=${title}`}>Reviews</Link> */}

        </div>

    )
};
export default Card;