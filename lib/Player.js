const Potion = require("../lib/Potion");

function Player(name = 'Hero'){
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
};

Player.prototype.getStats = function(){
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

Player.prototype.getInventory = function(){
    if(this.inventory.length > 0){
        return this.inventory;
    }
    else{
        return false;
    }
};

Player.prototype.getHealth = function(){
    return `${this.name}'s health is ${this.health}!`;
}

Player.prototype.isAlive = function(){
    return this.health > 0;
};

Player.prototype.reduceHealth = function(damage){
    this.health = Math.max((this.health - damage), 0);
}

module.exports = Player;