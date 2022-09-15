import React, { Component } from 'react'
import News from './News';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
export class Newscomp extends Component {
  static defaultProps = {
    country: 'in',
    pSize: 8,
    category: 'general',

  }
  static propTypes = {
    country: PropTypes.string,
    psize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("Hello");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      nextDisable: false,
      totalResults: 0
    }
    console.log("props = " + this.props.category);
    document.title = `${this.capitalize(this.props.category)}-Monkey`;

  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=862f8e4f91a246a5850ae86e852dcd41&page=${this.state.page}&pageSize=${this.props.pSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    this.props.setProgress(40);
    const parsedData = await data.json();
    // console.log("PSIZE = "+this.state.pSize);
    console.log(parsedData)
    console.log("After = " + this.state.page);
    this.setState(
      {
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      }
    );
    this.props.setProgress(100);
  }
  //It is a Life Cycle Method and run after the execution of render method
  async componentDidMount() {
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=862f8e4f91a246a5850ae86e852dcd41&page=1&pageSize=${this.props.pSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log("PSIZE = "+this.state.pSize);
    // this.setState(
    //     {   articles: parsedData.articles,
    //         totalResults:parsedData.totalResults,
    //         loading:false
    //     }
    // );
    // console.log("Present" + this.state.page);
    this.updateNews();

  }
  onPrevious = async () => {                                                                                                  //changing page number
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=862f8e4f91a246a5850ae86e852dcd41&page=${this.state.page-1}&pageSize=${this.props.pSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //       //for changing page number
    //       page:this.state.page-1,
    //       articles: parsedData.articles,
    //       nextDisable:false,
    //       loading:false
    //   })
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }
  onNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pSize)) {
      this.setState({
        nextDisable: true
      })
      console.log("Worked");
    }
    else {
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=862f8e4f91a246a5850ae86e852dcd41&page=${this.state.page+1}&pageSize= ${this.props.pSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // this.setState({
      //     //for changing page number
      //     page:this.state.page+1,
      //     articles: parsedData.articles,
      //     loading:false,
      // });
      console.log("Before = " + this.state.page);
      this.setState({
        page: this.state.page + 1
      });
      this.updateNews();
    }
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=862f8e4f91a246a5850ae86e852dcd41&page=${this.state.page}&pageSize=${this.props.pSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    // console.log("PSIZE = "+this.state.pSize);
    console.log("After = " + this.state.page);
    this.setState(
      {
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      }
    );
  };

  render() {
    console.log("ren")
    return (
      <>
        <h1 className='text-center'>Monkey - Top Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        {this.state.loading &&<Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading &&<Spinner />}
        >
          <div className="container  my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <News title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={new Date(element.publishedAt).toGMTString()} author={element.author ? element.author : "Unknown"}></News>
                  </div>
                )
              })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.onPrevious}>Previous &larr;</button>
          <button disabled={this.state.nextDisable === true} type='button' className="btn btn-dark" onClick={this.onNext}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default Newscomp;