/* Your code goes here */

let playerOne = new Fighter({
  name: 'Maximus',
  damage: 25,
  hp: 100,
  strength: 30,
  agility: 15
});

let playerTwo = new Fighter({
  name: 'Manus',
  damage: 55,
  hp: 150,
  strength: 50,
  agility: 25
});

function Fighter(player) {
  const maxHealth = player.hp;
  const minHealth = 0;
  player.wins = 0;
  player.losses = 0;
  player.getName = function () {
    return this.name;
  };
  player.getDamage = function () {
    return this.damage;
  };
  player.getStrength = function () {
    return this.strength;
  };
  player.getAgility = function () {
    return this.agility;
  };
  player.getHealth = function () {
    return this.hp;
  };
  player.dealDamage = function (dmg) {
    const newHp = this.hp -= dmg;
    newHp < minHealth ? this.hp = minHealth : this.hp = newHp;
    return this.hp;
  };
  player.heal = function (hpToAdd) {
    const newHp = this.hp += hpToAdd;
    newHp > maxHealth ? this.hp = maxHealth : this.hp = newHp;
    return this.hp;
  };
  player.addWin = function () {
    return this.wins++;
  };
  player.addLoss = function () {
    return this.losses++;
  };
  player.attack = function (enemy) {
    const chance = Math.floor(Math.random() * 100);
    const stats = this.strength + this.agility;
    const successProbability = 100 - stats;

    if (chance < successProbability) {
      enemy.dealDamage(this.damage);
      return `${this.name} makes ${this.damage} damage to ${enemy.name}`;
    } else {
      return `${this.name} attack missed`;
    }
  };
  player.logCombatHistory = function () {
    return `Name: ${this.getName()},Wins: ${this.wins},Losses: ${this.losses}`;
  };

  return player;
}

function battle(fighterOne, fighterTwo) {
  console.log(fighterTwo.attack(fighterOne));
  console.log(fighterOne.attack(fighterTwo));

  if (fighterOne.getHealth() > 0 && fighterTwo.getHealth() > 0) {
    battle(fighterOne, fighterTwo);
  } else {
    if (fighterOne.getHealth() <= 0) {
      fighterOne.addLoss();
      fighterTwo.addWin();
      console.log(`${fighterTwo.getName()} has won!`);
      console.log(`${fighterOne.getName()} is dead and can't fight.`);
    }
    if (fighterTwo.getHealth() <= 0) {
      fighterTwo.addLoss();
      fighterOne.addWin();
      console.log(`${fighterOne.getName()} has won!`);
      console.log(`${fighterTwo.getName()} is dead and can't fight.`);
    }
  }
}

battle(playerOne, playerTwo);

console.log(playerOne.logCombatHistory(), '|', playerTwo.logCombatHistory());
