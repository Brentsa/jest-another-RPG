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