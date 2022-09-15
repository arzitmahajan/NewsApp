import React, { Component } from 'react'

export class News extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl} height="200px" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div> 
        </div>   
        
    )
  }
}

export default News;