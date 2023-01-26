import React from 'react';
import { useLoaderData } from 'react-router-dom';

const News = () => {
    const news = useLoaderData();

    return (
        <div>
            <h1>this news page</h1>
        </div>
    )
}

export default News;
