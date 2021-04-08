'use strict';

const body = document.body;

class Label {
  constructor(label, create = false) {
    if (create) {
      this.target = document.createElement(label);
    } else this.target = document.querySelector(label);
  }

  getElement() {
    return this.target;
  }

  setAttribute({name, value}){
    this.target.setAttribute(name, value)
  }

  addClass(className) {
    this.target.classList.add(className);
  }

  removeClass(className) {
    this.target.classList.remove(className);
  }

  addElement(element) {
    this.target.appendChild(element);
  }

  onClick(callback) {
    this.target.addEventListener("click", callback, false);
  }
}

function cardCreate(_title, url, des) {
  let card = new Label("div", true);
  card.addClass("card");

  let img = new Label("img", true);
  img.setAttribute({name: "src", value: url})
  img.addClass("card-img-top");

  let body = new Label("div", true);
  body.addClass("card-body");

  let title = new Label("h5", true);
  title.target.innerText = _title;
  title.addClass("card-title");

  let text = new Label("p", true);
  text.target.innerText = des;
  text.addClass("card-text");

  let button = new Label("a", true);
  button.target.innerText = "More info";
  button.addClass("btn");
  button.addClass("btn-primary");

  body.addElement(title.getElement());
  body.addElement(text.getElement());
  body.addElement(button.getElement());

  card.addElement(img.getElement());
  card.addElement(body.getElement());

  return card;
}

function init() {
  const main = new Label("#main");
  const home = new Label("#bt-home");
  const ram = new Label("#bt-ram");
  const character = new Label("#bt-characters");
  const episodes = new Label("#bt-episodes");

  function Home() {
    let section1 = new Label("div", true);
    section1.addClass("row");
    section1.addClass("py-4");
    main.addElement(section1.getElement());

    let section2 = new Label("div", true);
    section2.addClass("row");
    main.addElement(section2.getElement());

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {

        let list = data.results;

        for(let i = 0; i < list.length; i++) {
          let col = new Label("div", true);
          col.addClass("col-md-3");
          col.addClass("pb-4");
          let card = cardCreate(list[i].name, list[i].image, list[i].status);
          col.addElement(card.getElement());
          section1.addElement(col.getElement());
        }
      });
  }

  ram.onClick(Home);
  home.onClick(Home);

  character.onClick(() => {
    alert("en casa");
  });

  episodes.onClick(() => {
    alert("en casa");
  });

  Home();
}

window.addEventListener("load", init);
