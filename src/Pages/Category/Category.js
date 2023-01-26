import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCard from '../shared/NewsSummaryCard/NewsSummaryCard';

const Category = () => {
    const categoryNews = useLoaderData();

    return (
        <section>
            {
                categoryNews.map(news => <NewsSummaryCard
                    key={news._id}
                    news={news}
                ></NewsSummaryCard>)
            }
        </section>
    )
}

export default Category;
