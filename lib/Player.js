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
};

Player.prototype.isAlive = function(){
    return this.health > 0;
};

Player.prototype.reduceHealth = function(damage){
    this.health = Math.max((this.health - damage), 0);
};

Player.prototype.getAttackValue = function(){
    const variation = 5
    const max = this.strength + variation;
    const min = this.strength - variation;

    return Math.floor(Math.random() * (max + 1 - min) + min);
}

Player.prototype.addPotion = function(potion){
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index){
    const potion = this.getInventory().splice(index, 1)[0];

    switch(potion.name){
        case "health":
            this.health += potion.value;
            break;
        case "strength":
            this.strength += potion.value;
            break;
        case "agility":
            this.strength += potion.value;
            break;
    }
};

module.exports = Player;