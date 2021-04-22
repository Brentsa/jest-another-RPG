const Potion = require("../lib/Potion");
const Character = require("../lib/Character");

class Player extends Character {
    constructor(name = 'Hero'){ 
        super(name);
    
        this.inventory = [new Potion('health'), new Potion()];
    }

    getStats(){
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }
    
    getInventory(){
        if(this.inventory.length > 0){
            return this.inventory;
        }
        else{
            return false;
        }
    }
    
    addPotion(potion){
        this.inventory.push(potion);
    }
    
    usePotion(index){
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
    }
}

module.exports = Player;