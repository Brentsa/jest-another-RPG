const Potion = require("./Potion");

function Enemy(name, weapon){
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion; 

    this.health = Math.floor(Math.random() * 11 + 85);
    this.strength = Math.floor(Math.random() * 6 + 5);
    this.agility = Math.floor(Math.random() * 6 + 5);
}

module.exports = Enemy;