import React from 'react';
import Logo from './Logo.js';
import './App.css';

/////////////////
/// COMPONENTS //
/////////////////

// Container
var App = React.createClass({ displayName: "App",
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function () {
    return { mylistData: [], recommendedList: [], mounted: false };
  },
  loadContent: function () {
    var requestUrl = 'https://api.themoviedb.org/3/' + 'discover/movie?sort_by=popularity.desc&page=1' + '&api_key=' + this.apiKey;
   
    fetch(requestUrl).then((response)=>{
        return response.json();
    }).then((data)=>{
        this.setState({mylistData : data.results.slice(0, 5)});
        this.setState({recommendedList : data.results.slice(5, 10)});
    }).catch((err)=>{
        console.log("There has been an error");
    });
  },
  performSearch: function (e) {
    // stop form from submitting
    e.preventDefault();
  },
  componentDidMount: function () {
    this.loadContent();
    this.setState({ mounted: true });
  },
  componentWillUnmount: function () {
    this.setState({ mounted: false });
  },
  addToMyList: function(id){
    for (let i = 0; i < this.state.recommendedList.length; ++i){
      if (this.state.recommendedList[i].id === id){
        this.state.mylistData.push(this.state.recommendedList[i]);
        break;
      }
    }
    this.setState({mylistData : this.state.mylistData});
  },
                                   
  removeFromMyList: function(id){
    for (let i = 0; i < this.state.mylistData.length; ++i){
      if (this.state.mylistData[i].id === id){
        this.state.mylistData.splice(i, 1);
        break;
      }
    }
    this.setState({mylistData : this.state.mylistData});
  },
  render: function () {
    return (
      <div>
        <TitleList title="My List" listData={ this.state.mylistData} removal={this.removeFromMyList}/>
        <TitleList title="Recommended" listData = {this.state.recommendedList} addition={this.addToMyList}/>
      </div>);
  } });

  var TitleList = React.createClass({ displayName: "TitleList",
  getInitialState: function () {
    return { data: [], mounted: false};
  },
  loadContent: function () {
    //this.setState({ data: this.props. });
  },
  componentDidMount: function () {
    this.loadContent();
    this.setState({ mounted: true });
  },

  componentWillUnmount: function () {
    this.setState({ mounted: false });
  },

  clickItem: function(id){
    if (this.props.title === "My List")
      this.removeFromMyList(id);
    else
      this.addToMyList(id);
  },
  addToMyList: function(id){
    this.props.addition(id);
  },
                                   
  removeFromMyList: function(id){
    this.props.removal(id);
  },
  render: function () {
    if (this.props.listData) {
      var titles = this.props.listData.map( (title, i) =>{
        var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
        if (!title.name) {
          var name = title.original_title;
        } else {
          var name = title.name;
        }
        return (
          React.createElement(Item, { key: title.id, movieId: title.id, title: name, score: title.vote_average, overview: title.overview, backdrop: backDrop, itemFun: this.clickItem}));
      });

    } else {
      var titles = '';
    }

    return (
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    );
  } });


// Title List Item
var Item = React.createClass({ displayName: "Item",
   clickToggle: function (id) {
    this.props.itemFun(id);
  },
  render: function() {
    return (
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
          <ListToggle toggleFun = {this.clickToggle} id = {this.props.movieId}/>
        </div>
      </div>
    );
  } });


// ListToggle
var ListToggle = React.createClass({ displayName: "ListToggle",
  getInitialState: function () {
    return { toggled: false };
  },
  handleClick: function () {
    if (this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true });
    }
    this.props.toggleFun(this.props.id);
  },
  render: function() {
    return (
      <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    );
  }
                                   
  });


export default App;
