const Potion = require("./Potion");

function Enemy(name, weapon){
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion; 

    this.health = Math.floor(Math.random() * 11 + 85);
    this.strength = Math.floor(Math.random() * 6 + 5);
    this.agility = Math.floor(Math.random() * 6 + 5);
}

Enemy.prototype.getHealth = function(){
    return `${this.name}'s health is ${this.health}!`;
}

Enemy.prototype.isAlive = function(){
    return this.health > 0;
};

Enemy.prototype.reduceHealth = function(damage){
    this.health = Math.max((this.health - damage), 0);
}

Enemy.prototype.getAttackValue = function(){
    const variation = 5
    const max = this.strength + variation;
    const min = this.strength - variation;

    return Math.floor(Math.random() * (max + 1 - min) + min);
}

Enemy.prototype.getDescription = function(){
    return `A ${this.name} holding a ${this.weapon} appeared!`;
}

module.exports = Enemy;