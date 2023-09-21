class Player {
  constructor(username, icon, health, weapon, gold, potions, key) {
    this._username = username;
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
  constructor(name, description, conversation) {
    (this._name = name), (this._description = description);
    this._conversation = conversation;
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
    return (
      this._name +
      " says " +
      "'" +
      this._conversation +
      "'" +
      this._name +
      " is a " +
      this._description
    );
  }
}

let username;
let icon;
let health;
let playerWeapon;
let playerGold;
let playerPotion;
let playerKey;
// username, health, weapon, gold, potions, key
const player = new Player(username, icon, 100, playerWeapon, 0, playerPotion, playerKey
);

playerHealth = () => {
  health = player._health;
 
  if (health == 0) {
    document.getElementById("playerdied").classList.remove("hidden");
    document.getElementById("playerdiedvid").play();
  }
  document.getElementById("playerhp").classList.add(`h-[${health}%]`);
};

let currentRoom;

const startRoom = new Room(
  "Start Room",
  "You wake up in a dark room with...",
  "Assets/StartRoomBackground.png"
);
const roomOne = new Room("roomOne", "A large room with 2 doors", "Assets/.png");
const roomTwo = new Room("roomTwo", "A small cell", "Assets/.png");
const roomThree = new Room(
  "roomThree",
  "A large room full of boxes",
  "Assets/.png"
);
const roomFour = new Room(
  "roomFour",
  "A large room with 3 doors",
  "Assets/.png"
);
const roomFive = new Room(
  "roomFive",
  "A large room with 3 doors",
  "Assets/.png"
);
const roomSix = new Room("roomSix", "A large room with 3 doors", "Assets/.png");
const roomSeven = new Room(
  "roomSeven",
  "A large room with 3 doors",
  "Assets/.png"
);
const roomShop = new Room(
  "roomShop",
  "A large room with 3 doors",
  "Assets/.png"
);
const bossRoom = new Room(
  "BOSS ROOM",
  "A large room with 3 doors",
  "Assets/.png"
);

const hallwayOne = new Room(
  "hallwayOne",
  "a dark long hallway with 3 doors",
  "Assets/HallOneBackground.png"
);
const hallwayTwo = new Room(
  "hallwayTwo",
  "A short corridor with 2 doors",
  "Assets/.png"
);
const hallwayThree = new Room(
  "hallwayThree",
  "A short corridor with 2 doors",
  "Assets/.png"
);
const hallwayBoss = new Room(
  "Boss Corridor",
  "A short corridor with 2 doors",
  "Assets/.png"
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

const Dave = new Character("Dave", "Tiefling", "hello there");
const Bill = new Character("Bill", "fdjusf", "Sup ehrieou");
startRoom.character = Dave;
startRoom.character = Bill;

const displayRoomInfo = (room) => {
  let occupantMsg = "";
  let weaponInRoom = "";
  let itemInRoom = "";
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
    itemInRoom += `${loot} You see a glimmer in the corner of your eye</br>`;
  
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
  "Shining Rapier",
  "Shining Club",
  "Shining Flail",
  "Shining Morningstar",
  "Shining Mace",
  "Shining War Hammer",
  "Shining Maul",
  "Shining Greataxe",
  "Shining Battle Axe",
  "Shining Light Pick",
  "Shining Pickaxe",
  "Shining Handaxe",
  "Shining Spear",
  "Shining Short Spear",
  "Shining Lance",
  "Shining Fork",
  "Shining Trident",
  "Shining Glaive",
  "Shining Halberd",
  "Shining Bill",
  "Shining Naginata",
  "Shining Ranseur",
  "Shining Dagger",
  "Shining Karambit",
  "Shining Gut Knife",
  "Shining Knuckle Axe",
  "Shining Kukri",
  "Shining Sickle",
  "Shining Sai",
  "Shining Push Dagger",
  "Shining Long Bow",
  "Shining Short Bow",
  "Shining Crossbow",
  "Shining Sling",
  "Shining Throwing Axe",
  "Shining Throwing Knife",
  "Shining Cestus",
  "Shining Spiked Gauntlet",
  "Shining Iron Claw",
];

let weaponsSturdy = [
  "Sturdy Greatsword",
  "Sturdy Longsword",
  "Sturdy Shortsword",
  "Sturdy Rapier",
  "Sturdy Club",
  "Sturdy Flail",
  "Sturdy Morningstar",
  "Sturdy Mace",
  "Sturdy War Hammer",
  "Sturdy Maul",
  "Sturdy Greataxe",
  "Sturdy Battle Axe",
  "Sturdy Light Pick",
  "Sturdy Pickaxe",
  "Sturdy Handaxe",
  "Sturdy Spear",
  "Sturdy Short Spear",
  "Sturdy Lance",
  "Sturdy Fork",
  "Sturdy Trident",
  "Sturdy Glaive",
  "Sturdy Halberd",
  "Sturdy Bill",
  "Sturdy Naginata",
  "Sturdy Ranseur",
  "Sturdy Dagger",
  "Sturdy Karambit",
  "Sturdy Gut Knife",
  "Sturdy Knuckle Axe",
  "Sturdy Kukri",
  "Sturdy Sickle",
  "Sturdy Sai",
  "Sturdy Push Dagger",
  "Sturdy Long Bow",
  "Sturdy Short Bow",
  "Sturdy Crossbow",
  "Sturdy Sling",
  "Sturdy Throwing Axe",
  "Sturdy Throwing Knife",
  "Sturdy Cestus",
  "Sturdy Spiked Gauntlet",
  "Sturdy Iron Claw",
];

let weaponsShattered = [
  "Shattered Greatsword",
  "Shattered Longsword",
  "Shattered Shortsword",
  "Shattered Rapier",
  "Shattered Club",
  "Shattered Flail",
  "Shattered Morningstar",
  "Shattered Mace",
  "Shattered War Hammer",
  "Shattered Maul",
  "Shattered Greataxe",
  "Shattered Battle Axe",
  "Shattered Light Pick",
  "Shattered Pickaxe",
  "Shattered Handaxe",
  "Shattered Spear",
  "Shattered Short Spear",
  "Shattered Lance",
  "Shattered Fork",
  "Shattered Trident",
  "Shattered Glaive",
  "Shattered Halberd",
  "Shattered Bill",
  "Shattered Naginata",
  "Shattered Ranseur",
  "Shattered Dagger",
  "Shattered Karambit",
  "Shattered Gut Knife",
  "Shattered Knuckle Axe",
  "Shattered Kukri",
  "Shattered Sickle",
  "Shattered Sai",
  "Shattered Push Dagger",
  "Shattered Long Bow",
  "Shattered Short Bow",
  "Shattered Crossbow",
  "Shattered Sling",
  "Shattered Throwing Axe",
  "Shattered Throwing Knife",
  "Shattered Cestus",
  "Shattered Spiked Gauntlet",
  "Shattered Iron Claw",
];

let weapon;
let loot;

weaponGenerator = () => {
  let wepGen = Math.random();
  let weapon;

  if (wepGen < 0.2) {
    weapon = weaponsShining[Math.floor(Math.random() * weaponsShining.length)];
  } else if (wepGen < 0.6) {
    weapon = weaponsSturdy[Math.floor(Math.random() * weaponsSturdy.length)];
  } else {
    weapon =
      weaponsShattered[Math.floor(Math.random() * weaponsShattered.length)];
  }

  return weapon; // Return the weapon
};

lootGenerator = () => {
  let lootGen = Math.random();
  let loot;

  if (lootGen < 0.1) {
    let key = Math.random();
    if (key < 0.3) {
      loot = "Special key";
    } else {
      loot = "Rusty key";
    }
  } else if (lootGen < 0.4) {
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

  return loot; // Return loot
};

const startGame = () => {
  playerHealth();
  // this is the starting room.
  currentRoom = startRoom;
  image = currentRoom._background;

  document.getElementById("gamearea").style.backgroundImage = `url(${image})`;
  if (currentRoom === startRoom) {
    weapon = weaponGenerator();
    player._weapon = weapon;
    document.getElementById("item1").innerHTML = `${weapon}`;
    let n = Math.random();
    if (n < 1) {
      loot = lootGenerator();
      if (loot.includes("key")) {
        player._key = loot;
        document.getElementById("item2").innerHTML = `${loot}`;
      } else if (loot.includes("potion")) {
        player._potions = loot;
        document.getElementById("item3").innerHTML = `${loot}`;
      } else {
        player._gold += parseInt(loot.split(" ")[0], 10);

        document.getElementById("item4").innerHTML = `${player._gold}`;
      }
    } else if (n < 0.4) {
      weapon = weaponGenerator();
      player._weapon = weapon;
    }
  
    displayRoomInfo(currentRoom);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const commandRaw = document.getElementById("userinput").value.toLowerCase();
      const command = commandRaw.split(" ")[0];
      const directions = ["left", "right", "up", "down"];
      let args = commandRaw.split(" ")[1];

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

        document.getElementById(
          "gamearea"
        ).style.backgroundImage = `url(${image})`;
      } else {
        if (loot || weapon) {
          const commandActions = ["take"];
          if (commandActions.includes(command)) {
            //add loot or weapon too player inventory
            if (args == "weapon") {
              console.log(weapon);
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

                document.getElementById("item4").innerHTML = `${player._gold}`;
              }
            }
            document.getElementById("userinput").value = "";
          }
        }
      }
    }
  });
};

startGame();
