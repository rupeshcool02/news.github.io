import React, { Component } from 'react'

const NewItem =(props)=> {
    
        let {title,description,imgUrl,url,author,date,source} = props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={imgUrl} />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <span className="badge badge-pill badge-primary">{source}</span>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">Submitted by {author} on {date} </small></p>
                            <a href={url} target="blank" className="btn btn-primary">Read more</a>
                        </div>
                </div>
            </div>
        )
    
}

export default NewItem
NewItem.defaultProps={
    title : "My Title",
    description :"my description",
    author : "Unknown",
    imgUrl : "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
}
