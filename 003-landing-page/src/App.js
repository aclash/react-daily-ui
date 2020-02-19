import React from 'react';
import Logo from './Logo.js';
import './App.css';

/////////////////
/// COMPONENTS //
/////////////////

// Container
var App = React.createClass({ displayName: "App",
  getInitialState: function () {
    return { data: [] };
  },
  performSearch: function (e) {
    // stop form from submitting
    e.preventDefault();
  },
  componentDidUpdate: function () {

  },
  render: function () {
    return (
      <div>
        <TitleList title="Recommended List" url='discover/movie?sort_by=popularity.desc&page=1' />
        <TitleList title="My List" url='discover/movie?sort_by=popularity.desc&page=1' />
      </div>);
  } });

  var TitleList = React.createClass({ displayName: "TitleList",
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function () {
    return { data: [], mounted: false};
  },
  loadContent: function () {
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
   
    fetch(requestUrl).then((response)=>{
        return response.json();
    }).then((data)=>{
        if (this.props.title == "Recommended List"){
          this.setState({data : data.results.slice(0, 5)});
        }
        else{  
          this.setState({data : data.results.slice(5, 10)});
        }
    }).catch((err)=>{
        console.log("There has been an error");
    });
  },
  componentDidMount: function () {
    this.loadContent();
    this.setState({ mounted: true });
  },
  componentWillUnmount: function () {
    this.setState({ mounted: false });
  },
  
  addToMyList: function(id){
    console.log(id);
  },
                                   
  removeFromMyList: function(id){
    console.log("removeFromMyList");
    let index = -1;
    for (let i = 0; i < this.states.data.length; ++i){
      if (this.states.data[i].id == id)
        index = i;
    }
    this.props.data.splice(index, 1);
    this.setState({data : this.states.data});
    console.log(id);
  },

  clickItem: function(id){
    if (this.props.title == "My List"){
      console.log("clickItem");
      this.removeFromMyList(id);
    }
    else{
      console.log("clickItem");
      let a = 444;
      this.addToMyList(id);
    }
  },
  
  
  render: function () {
    if (this.state.data) {
      console.log()
      var titles = this.state.data.map( (title, i) =>{
        if (i < 6 ) {

          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if (!title.name) {
            var name = title.original_title;
          } else {
            var name = title.name;
          }

          return (
            React.createElement(Item, { key: title.id, movieId: title.id, title: name, score: title.vote_average, overview: title.overview, backdrop: backDrop, itemFun: this.clickItem}));
        }
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
