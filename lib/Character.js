
class Character {
    
    constructor(name = 'unknown'){
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }

    getHealth(){
        return `${this.name}'s health is ${this.health}!`;
    };

    isAlive(){
        return this.health > 0;
    };

    reduceHealth(damage){
        this.health = Math.max((this.health - damage), 0);
    };

    getAttackValue(){
        const variation = 5
        const max = this.strength + variation;
        const min = this.strength - variation;

        return Math.floor(Math.random() * (max + 1 - min) + min);
    };
}

module.exports = Character;
