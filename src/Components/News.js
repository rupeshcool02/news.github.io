import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import NewItem from './NewItem'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalResults, setTotalResults] = useState(0)
    //document.title = "My news : " + FirstLetterCapital(props.category);

    const FirstLetterCapital = (string) => {
        return string.slice(0, 1).toUpperCase() + string.slice(1)
    }

    const updateNews = async()=>{
        props.setProgress(10)
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        props.setProgress(30)
        let parceData = await data.json();
        props.setProgress(70)
        setArticles(parceData.articles);
        setTotalResults(parceData.totalResults);
        setLoading(false);
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        setLoading(true)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parceData = await data.json();
        setArticles(articles.concat(parceData.articles))
        setLoading(false)
    };

    let { pageSize, country, category } = props;
    return (
        <>
            <div className='container'>
                <h3> My News {FirstLetterCapital(props.category)} Top Heading</h3></div>
            {loading && <Loader />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length != totalResults}
                loader={<Loader />}
            >
                <div className='container'>
                    <div className="row my-3">
                        {articles.map((element) => {
                            return <div className="col m-3" key={element.url}>
                                <NewItem title={element.title ? element.title.length < 50 ? element.title : element.title.slice(0, 50) + "..." : ""} description={element.description ? element.description.length < 65 ? element.description : element.description.slice(0, 65) + "..." : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"} url={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )

}

export default News
News.defaultProps = {
    pageSize: 9,
    country: "in",
    category: "general"
}

