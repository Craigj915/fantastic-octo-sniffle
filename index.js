class Player {
  constructor(playername, icon, health, weapon, gold, potions, key) {
    this._playername = playername;
    this._icon = icon;
    this._health = health;
    this._weapon = weapon;
    this._gold = gold;
    this._potions = potions;
    this._key = key;
  }

  get username() {
    return this._username;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
  }

  updateHealth(damage) {
    this._health -= damage;
    // if (this._health <= 0) {
    //   document.getElementById("playerdied").classList.remove("hidden");
    //   document.getElementById("playerdiedvid").play();
    // }
  }

  healHealth(heal) {
    this._health += heal;
  }

  get weapon() {
    return this._weapon;
  }

  get gold() {
    return this._gold;
  }

  get potions() {
    return this._potions;
  }

  get key() {
    return this._key;
  }
}

class Room {
  constructor(name, description, background) {
    this._name = name;
    this._description = description;
    this._background = background;
    this._linkedRooms = {};
    this._character = [];
    // this._loot = [];
    // this._weapon = [];
  }

  set character(value) {
    this._character.push(value);
  }

  get character() {
    return this._character;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get background() {
    return this._background;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  describe() {
    return this._description;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("That way is blocked.");
      return this;
    }
  }
}

class Character {
  constructor(name, description, conversation, enemyicon, health, enemydamage) {
    this._name = name;
    this._description = description;
    this._conversation = conversation;
    this._enemyicon = enemyicon;
    this._health = health;
    this._enemydamage = enemydamage;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  get enemyicon() {
    return this._enemyicon;
  }

  describe() {
    return (
      "You have met " +
      this._name +
      ", " +
      this._name +
      " is " +
      this._description
    );
  }

  talk() {
    return this._name + " | " + this.description + " : " + this._conversation;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
  }

  updateHealth(damage) {
    this._health -= damage;
    // if (this._health <= 0) {
    //   document.getElementById("enemy1").classList.add("hidden");
    // }
  }

  get enemydamage() {
    return this._enemydamage;
  }
}

function performAttack() {
  if (currentRoom.character.length > 0 && currentRoom.character[0].health > 0) {
    const playerDamage = calculateWeaponDamage(player._weapon);
    let enemy;
    let enemyDamage;
    for (index in currentRoom.character) {
      enemy = currentRoom.character[index];
      enemyDamage = currentRoom.character[index]._enemydamage;
    }

    enemy.health -= playerDamage;
    player.updateHealth(enemyDamage);
    if (enemy == "Boss" && enemy.health <= 0) {
      alert("You have defeated the Boss and Won!!")
      document.getElementById("enemy1").classList.add("hidden");
      document.getElementById("enemyhp").classList.add("h-[0]");
    } else if (enemy.health <= 0) {
      document.getElementById("enemy1").classList.add("hidden");
      document.getElementById("enemyhp").classList.add("h-[0]");
    } else {
      const playerNewHealth = player.health - enemyDamage;
      if (playerNewHealth <= 0) {
        document.getElementById("playerhp").classList.add("h-[0]");          
        document.getElementById("playerIcon").classList.add("hidden");
          document.getElementById("playerDied").classList.remove("hidden");
        let delayInMilliseconds = 3000; //3 second
        setTimeout(function () {
          //your code to be executed after 3 second
          document.getElementById("playerdied").classList.remove("hidden");
          document.getElementById("playerdiedvid").play();

        }, delayInMilliseconds);
      } else {
        player.health = playerNewHealth;
      }
    }

    playerHealth();
    displayRoomInfo(currentRoom);
  } else {
    // There is no enemy or the enemy is already defeated
    alert("There is no enemy in this room.");
  }
}

let username;
let icon;
let health;
let playerWeapon;
let playerGold;
let playerPotion;
let playerKey;
// username, icon, health, weapon, gold, potions, key

let currentEnemy;
let player = new Player(
  "User",
  icon,
  100,
  playerWeapon,
  0,
  playerPotion,
  playerKey
);
let Enemy = new Character(
  "Enemy",
  "Knight",
  "Who goes there!?!?",
  "Assets/VampireMale.png",
  20,
  10
);
let Boss = new Character(
  "Big-Boss",
  "Hobgoblin",
  "YOU DARE CHALLENGE ME?",
  "Assets/GoblinMale.png",
  100,
  32
);

let Roxy = new Character(
  "Roxy",
  "Vampire",
  "Hey there~",
  "Assets/VampireFemale.png",
  40,
  50
);
let Bill = new Character(
  "Bill",
  "",
  "What do you want?",
  "Assets/GoblinMale.png",
  63,
  24
);

playerHealth = () => {
  health = player._health;
  document.getElementById("playerhp").classList.add(`h-[${health}%]`);
};

let currentRoom;

const startRoom = new Room(
  "Start Room",
  "You wake up in a dark room.</br> There is a door: right",
  "Assets/Background/startRoom.jpg"
);
const roomOne = new Room(
  "roomOne",
  "A large room.</br> There is a door: down and right",
  "Assets/Background/Prison.jpg"
);
const roomTwo = new Room(
  "roomTwo",
  "A small cell</br> There is a door: up",
  "Assets/Background/DoorRoomDestroyed.jpg"
);
const roomThree = new Room(
  "roomThree",
  "A large room full of boxes</br> There is a door: left",
  "Assets/Background/Room4.jpg"
);
const roomFour = new Room(
  "roomFour",
  "A room </br> There is a door: up and right",
  "Assets/Background/DoorRoom.jpg"
);
const roomFive = new Room(
  "roomFive",
  "A large room with 3 doors</br> There is a door: down and right",
  "Assets/Background/Corridor.jpg"
);
const roomSix = new Room(
  "roomSix",
  "A large room with 3 doors",
  "Assets/Background/DoorRoom2.jpg"
);
const roomSeven = new Room(
  "roomSeven",
  "A large room with 3 doors",
  "Assets/Background/CellDoor2.jpg"
);
const roomShop = new Room(
  "roomShop",
  "A large room with 3 doors",
  "Assets/Background/Shop.jpg"
);
const bossRoom = new Room(
  "BOSS ROOM",
  "A room full of gold",
  "Assets/Background/bossRoom.jpg"
);

const hallwayOne = new Room(
  "hallwayOne",
  "a long dark hallway with 3 doors infront of you</br> There is a door: up, down and right",
  "Assets/Background/DoorRoom.jpg"
);
const hallwayTwo = new Room(
  "hallwayTwo",
  "A short corridor</br> There is a door: left and up",
  "Assets/Background/DoorRoom2.jpg"
);
const hallwayThree = new Room(
  "hallwayThree",
  "A short corridor</br> There is a door: up and down",
  "Assets/Background/hallway.jpg"
);
const hallwayBoss = new Room(
  "Boss Corridor",
  "A long corridor</br> There is a door: right and a huge door up",
  "Assets/Background/DoorRoom.jpg"
);

startRoom.linkRoom("right", hallwayOne);

hallwayOne.linkRoom("left", startRoom);
hallwayOne.linkRoom("up", roomOne);
roomOne.linkRoom("down", hallwayOne);
hallwayOne.linkRoom("down", roomTwo);
roomTwo.linkRoom("up", hallwayOne);
hallwayOne.linkRoom("right", roomThree);
roomThree.linkRoom("left", hallwayOne);

roomOne.linkRoom("right", hallwayTwo);
hallwayTwo.linkRoom("left", roomOne);
hallwayTwo.linkRoom("up", roomFour);

roomFour.linkRoom("down", hallwayTwo);
roomFour.linkRoom("up", roomShop);
roomShop.linkRoom("down", roomFour);
roomFour.linkRoom("right", hallwayThree);

hallwayThree.linkRoom("left", roomFour);
hallwayThree.linkRoom("up", roomFive);
roomFive.linkRoom("down", hallwayThree);
hallwayThree.linkRoom("down", roomSix);
roomSix.linkRoom("up", hallwayThree);
roomFive.linkRoom("right", roomSix);
roomSix.linkRoom("left", roomFive);
roomSix.linkRoom("right", hallwayBoss);

hallwayBoss.linkRoom("left", roomSix);
hallwayBoss.linkRoom("right", roomSeven);
roomSeven.linkRoom("left", hallwayBoss);
hallwayBoss.linkRoom("up", bossRoom);

hallwayOne.character = Enemy;
roomFive.character = Roxy;
roomTwo.character = Bill;
bossRoom.character = Boss;

const displayRoomInfo = (room) => {
  let occupantMsg = "";
  let weaponInRoom = "";
  let itemInRoom = "";

  if (room.character.length > 0 && room.character[0].health > 0) {
    // If there is an enemyalive
    let enemy;
    for (index in room.character) {
      enemy = room.character[index];
    }
    document.getElementById("enemy1").classList.remove("hidden");
    document.getElementById("enemy1icon").src = enemy.enemyicon;
    document.getElementById("enemyhp").classList.add(`h-[${enemy.health}%]`);
  } else {
    document.getElementById("enemy1").classList.add("hidden");
  }

  if (room?.character == []) {
    //Somestuff
    occupantMsg = "There is nobody in this room";
  } else {
    //someotherstuff
    for (index in room.character) {
      occupantMsg += `${room.character[index].talk()}</br>`;
    }
  }

  if (weapon !== undefined && weapon !== "") {
    weaponInRoom += `lay in the dusty you can see a ${weapon}</br>`;
  }

  if (loot !== undefined && loot !== "") {
    itemInRoom += `You see a glimmer in the corner of your eye</br>
    You may take ${loot}`;
  }

  let textContent =
    "<p>" +
    room?.describe() +
    "</p>" +
    "<p>" +
    occupantMsg +
    weaponInRoom +
    itemInRoom +
    "</p>";

  document.getElementById("roomname").innerHTML = room?.name;
  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("userinput").value = "";
  document.getElementById("userinput").focus();
};

let weaponsShining = [
  "Shining Greatsword",
  "Shining Longsword",
  "Shining Shortsword",
  "Shining Mace",
  "Shining War Hammer",
  "Shining Greataxe",
  "Shining Battle Axe",
  "Shining Pickaxe",
  "Shining Handaxe",
  "Shining Spear",
  "Shining Short Spear",
  "Shining Glaive",
  "Shining Halberd",
  "Shining Dagger",
  "Shining Long Bow",
  "Shining Short Bow",
];

let weaponsSturdy = [
  "Sturdy Greatsword",
  "Sturdy Longsword",
  "Sturdy Shortsword",
  "Sturdy Mace",
  "Sturdy War Hammer",
  "Sturdy Greataxe",
  "Sturdy Battle Axe",
  "Sturdy Pickaxe",
  "Sturdy Handaxe",
  "Sturdy Spear",
  "Sturdy Short Spear",
  "Sturdy Glaive",
  "Sturdy Halberd",
  "Sturdy Dagger",
  "Sturdy Long Bow",
  "Sturdy Short Bow",
];

let weaponsShattered = [
  "Shattered Greatsword",
  "Shattered Longsword",
  "Shattered Shortsword",
  "Shattered Mace",
  "Shattered War Hammer",
  "Shattered Greataxe",
  "Shattered Battle Axe",
  "Shattered Pickaxe",
  "Shattered Handaxe",
  "Shattered Spear",
  "Shattered Short Spear",
  "Shattered Glaive",
  "Shattered Halberd",
  "Shattered Dagger",
  "Shattered Long Bow",
  "Shattered Short Bow",
];

let weapon;
let loot;

weaponGenerator = () => {
  let wepGen = Math.random();
  let weapon;

  if (wepGen < 0.15) {
    weapon = weaponsShining[Math.floor(Math.random() * weaponsShining.length)];
  } else if (wepGen < 0.6) {
    weapon = weaponsSturdy[Math.floor(Math.random() * weaponsSturdy.length)];
  } else {
    weapon =
      weaponsShattered[Math.floor(Math.random() * weaponsShattered.length)];
  }

  return weapon;
};

lootGenerator = () => {
  let lootGen = Math.random();
  let loot;

  if (lootGen < 0.15) {
    let key = Math.random();
    if (key < 0.3) {
      loot = "Special key";
    } else {
      loot = "Rusty key";
    }
  } else if (lootGen < 0.5) {
    let potion = Math.random();
    if (potion < 0.2) {
      loot = "Mystery potion";
    } else if (potion < 0.6) {
      loot = "Health potion";
    } else {
      loot = "Useless potion";
    }
  } else {
    money = Math.random();
    if (money < 0.2) {
      n = Math.floor(Math.random() * 25);
      loot = `${n} Gold`;
    } else {
      n = Math.floor(Math.random() * 10);
      loot = `${n} Gold`;
    }
  }

  return loot;
};
function calculateWeaponDamage() {
  let playerWeapon = player._weapon;
  enemy = currentRoom.character[0];
  let enemyWeapon = enemy._weapon;
  let playerWepDmg;
  let enemyWepDmg;
  if (!enemyWeapon) {
    if (playerWeapon.includes("Shattered")) {
      playerWepDmg = Math.floor(Math.random() * 10) + 10;
    } else if (playerWeapon.includes("Sturdy")) {
      playerWepDmg = Math.floor(Math.random() * 10) + 20;
    } else {
      playerWepDmg = Math.floor(Math.random() * 50) + 50;
    }
    console.log(playerWepDmg);
    return playerWepDmg;
  } else {
    if (enemyWeapon.includes("Shattered")) {
      enemyWepDmg = Math.floor(Math.random() * 10) + 10;
    } else if (enemyWeapon.includes("Sturdy")) {
      enemyWepDmg = Math.floor(Math.random() * 10) + 20;
    } else {
      enemyWepDmg = Math.floor(Math.random() * 50) + 50;
    }
    console.log(enemyWepDmg);
    return enemyWepDmg;
  }
}

// if (currentRoom._character.includes("Boss")) {
//   if (character._health <= 0) {
//     alert("You have defeated the Boss and Won!!")
//   }
// }

const startGame = () => {
  playerHealth();
  // this is the starting room.
  currentRoom = startRoom;
  weapon = weaponGenerator();
  displayRoomInfo(currentRoom);

  image = currentRoom._background;

  document.getElementById("gamearea").style.backgroundImage = `url(${image})`;

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const commandRaw = document
        .getElementById("userinput")
        .value.toLowerCase();
      const command = commandRaw.split(" ")[0];
      const directions = ["left", "right", "up", "down"];
      let args = commandRaw.split(" ")[1];
      const commandActions = ["take"];
      const attackCommand = ["attack"];
      // ENEMY HERE
      if (
        currentRoom.character.length > 0 &&
        currentRoom.character[0].health > 0
      ) {
        // If there is an enemy alive then commands useable are attack and loot
        if (
          !(attackCommand.includes(command) || commandActions.includes(command))
        ) {
          // command is not an attack or looting
          alert(
            "You can only use attack and item commands while there is an enemy."
          );
          document.getElementById("userinput").value = "";
          return;
        }
      }

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        weapon = "";
        loot = "";
        let n = Math.random();
        if (n < 0.2) {
          weapon = weaponGenerator();
        } else if (n < 0.6) {
          loot = lootGenerator();
        }
        displayRoomInfo(currentRoom);
        image = currentRoom._background;
        enemyImg = currentRoom.character._enemyicon;
        document.getElementById(
          "gamearea"
        ).style.backgroundImage = `url(${image})`;
      } else if (commandActions.includes(command)) {
        //add loot or weapon too player inventory
        if (args == "weapon") {
          player._weapon = weapon;
          document.getElementById("item1").innerHTML = `${weapon}`;
        } else if (args == "loot") {
          if (loot.includes("key")) {
            player._key = loot;
            document.getElementById("item2").innerHTML = `${loot}`;
          } else if (loot.includes("potion")) {
            player._potions = loot;
            document.getElementById("item3").innerHTML = `${loot}`;
          } else {
            player._gold += parseInt(loot.split(" ")[0], 10);

            document.getElementById("item4").innerHTML = `${player._gold} Gold`;
          }
        }
        document.getElementById("userinput").value = "";
      } else {
        // fight?
        if (!player._weapon) {
          alert("You have no weapon");
          document.getElementById("userinput").value = "";
        } else if (attackCommand.includes(command)) {
          // let dmg = calculateWeaponDamage(player._weapon);
          // enemyhp = currentRoom.character._health;
          performAttack();
        }
      }
    }
  });
};

startGame();
