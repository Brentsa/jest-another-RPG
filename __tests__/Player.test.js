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

