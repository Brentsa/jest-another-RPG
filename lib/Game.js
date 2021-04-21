const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");


function Game(){
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function(){
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'hammer'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        .then( ({name}) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function(){
    if(this.player.agility >= this.currentEnemy.agility){
        this.player.isPlayerTurn = true;
    }
    else{
        this.player.isPlayerTurn = false;
    }

    console.log('Your stats are as follows: ');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function(){
    if(this.player.isPlayerTurn){
        inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use Potion']
            })
            .then(({action}) =>{
                if(action === 'Attack'){
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`\nYou attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth(), '\n');

                    this.checkEndOfBattle();
                }
                else{
                    if(!this.player.getInventory()){
                        console.log("\nYou don't have any potions! \n");
                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}` )
                        })
                        .then(({action}) =>{
                            const potionDetails = action.split(": ");

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`\nYou used a ${potionDetails[1]} potion.\n` );

                            this.checkEndOfBattle();
                        });
                }
            });
    }
    else{
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth(), '\n');

        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function(){
    if(this.player.isAlive() && this.currentEnemy.isAlive()){
        this.player.isPlayerTurn = !this.player.isPlayerTurn;
        this.battle();
    }
    else if(this.player.isAlive() && !this.currentEnemy.isAlive()){

        console.clear();

        console.log(`You have defeated the ${this.currentEnemy.name} `);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} has found: ${this.currentEnemy.potion.name} potion \n`);

        this.roundNumber++;

        if(this.roundNumber < this.enemies.length){
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else{
            console.clear();
            console.log('You win!\n');
        }
    }
    else{
        console.clear();
        console.log("You have been defeated...\n");
    }
};

module.exports = Game;

//