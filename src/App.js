import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form.js";
import Recipes from "./components/recipes.js";

const API_KEY = "aa45802caeaa36ed087c5d917c3ba52e";

class App extends Component {
  state = {
    recipes: []
  };

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  };

  getRecepie = async e => {
    e.preventDefault();
    const recepieName = e.target.elements.recepieName.value;
    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recepieName}&count=10`
    );
    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form getRecepie={this.getRecepie} />
          <Recipes recipes={this.state.recipes} />
        </header>
      </div>
    );
  }
}

export default App;
