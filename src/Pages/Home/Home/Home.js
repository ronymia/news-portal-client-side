import React from 'react';
import { useLoaderData } from 'react-router-dom'
import NewsSummaryCard from '../../shared/NewsSummaryCard/NewsSummaryCard';

const Home = () => {
    const allNews = useLoaderData();

    return (
        <section>
            {
                allNews.map(news => <NewsSummaryCard
                    key={news._id}
                    news={news}
                ></NewsSummaryCard>)
            }
        </section>
    )
}

export default Home;
