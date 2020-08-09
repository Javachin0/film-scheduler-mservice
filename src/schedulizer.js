const util = require('./util.js');

module.exports = function (catalogue) {

  this.catalogue = catalogue;
  this.usedFilms = [];
  this.filmslots = 14; //TODO: get this from config
  this.dupsPerDay = 2; //TODO: get this from config
  this.uniqueSlots = (this.filmslots / this.dupsPerDay);
  this.populateDay = () => {   
    //local functions
    let recycleUsedFilms = () => {
      while(this.catalogue.length < this.uniqueSlots) {
        this.catalogue.push(this.usedFilms.shift());
      }
    }
    let updateCatelogue = () => {
      filmsOfTheDay.forEach(film => {
        this.usedFilms.push(film); //remove all commas, faster that str.replace
      });
    }
    let filmsOfTheDay = [];
    //recycle the used films if less than a days worth left (each film played twice)
    if(this.catalogue < this.uniqueSlots){
      recycleUsedFilms();
    }
    //shuffle the catelogue
    this.catalogue = util.shuffle(this.catalogue)
    //Fill unique slots for the day
    for (let i = 0; i < this.uniqueSlots; i++)
    {
        let film = this.catalogue[i].split(",").join("");
        filmsOfTheDay.push(film);
    }
    updateCatelogue();
    //return days films
    return filmsOfTheDay.concat(filmsOfTheDay);
  }
}