const Player = require("../lib/Player");
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

test('creates a player object', ()=>{
    var player = new Player('Sean');

    expect(player.name).toBe('Sean');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
})

test("gets the player's stats as an object", ()=>{
    var player = new Player('Sean');

    expect(player.getStats()).toHaveProperty("potions");
    expect(player.getStats()).toHaveProperty("health");
    expect(player.getStats()).toHaveProperty("strength");
    expect(player.getStats()).toHaveProperty("agility");
});

test("gets inventory from player or returns false", ()=>{
    var player = new Player('Sean');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test("get the players health value", () =>{
    var player = new Player;

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("checks if the player is alive or not", () =>{
    var player = new Player;

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test("reduce the player health", () =>{
    const player = new Player;
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(9999);

    expect(player.health).toBe(0);
});

test("get the player's attack value", ()=>{
    const player = new Player;
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("add a potion to the player's inventory", ()=>{
    const player = new Player;
    const oldCount = player.inventory.length;

    player.addPotion(new Potion);

    expect(player.inventory.length).toBe(oldCount + 1);
});

test("uses a potion from inventory", ()=>{
    const player = new Player;
    player.inventory = [new Potion, new Potion, new Potion];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBe(oldCount - 1);
});