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

function listIteamCreate(_name, _date){
  let item = new Label("a", true);
  item.addClass("list-group-item");
  item.addClass("list-group-item-action");

  let main = new Label("div", true);
  main.addClass("d-flex");
  main.addClass("w-100");
  main.addClass("justify-content-between");

  let title = new Label("h5", true);
  title.addClass("mb-1");
  title.target.innerText = _name;

  let date = new Label("small", true);
  date.target.innerText = _date;

  main.addElement(title.getElement());
  main.addElement(date.getElement());
  item.addElement(main.getElement());

  return item;
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
    let s1title = new Label("h1", true);
    s1title.addClass("py-4");
    s1title.target.innerText = "Characters";
    section1.addElement(s1title.getElement());

    let section2 = new Label("div", true);
    section2.addClass("row");
    section2.addClass("py-4");
    main.addElement(section2.getElement());
    let s2title = new Label("h1", true);
    s2title.addClass("py-4");
    s2title.target.innerText = "Episodes";
    section2.addElement(s2title.getElement());

    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {

        let info = data.info;
        let list = data.results;

        for(let i = 0; i < list.length; i++) {
          let col = new Label("div", true);
          col.addClass("col-md-3");
          col.addClass("col-sm-4");
          col.addClass("col-6");
          col.addClass("pb-4");
          let card = cardCreate(list[i].name, list[i].image, list[i].status);
          col.addElement(card.getElement());
          section1.addElement(col.getElement());
        }
      });

    fetch("https://rickandmortyapi.com/api/episode")
      .then((response) => response.json())
      .then((data) => {

        let info = data.info;
        let list = data.results;

        let listGroup = new Label("div", true);
        listGroup.addClass("list-group");

        for(let i = 0; i < list.length; i++) {
          let item = listIteamCreate(list[i].name, list[i].air_date);
          listGroup.addElement(item.getElement());
        }

        section2.addElement(listGroup.getElement());
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
