class doors {
  constructor(name, locked, description) {
    this._name = name;
    this._locked = locked;
    this._description = description;
  }
  get description() {
    return this._description;
  }

  get locked() {
    return this._locked;
  }
}

class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = [];
    this._doors = [];
  }

  set doors(value) {
    this._doors.push(value);
  }

  set doorsArr(value) {
    this._doors = value;
  }

  get doors() {
    return this._doors;
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

  linkRoom(doors, command, roomToLink) {
    this._linkedRooms[doors] = {command, roomToLink};console.log(this._linkedRooms);
  }

  move(command, door) {
    // for ()
    if (door in this._linkedRooms) {
      return this._linkedRooms[door];
    } else {
      alert("This door is SHIT");
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

let currentRoom;

const startRoom = new Room("Start Room", "You wake up in a dark room with...");
const hallwayOne = new Room("hallwayOne", "a dark long hallway with 3 doors");
const roomOne = new Room("roomOne", "A large room with 2 doors");
const roomTwo = new Room("roomTwo", "A small cell");
const roomThree = new Room("roomThree", "A large room full of boxes");
const hallwayTwo = new Room("hallwayTwo", "A short corridor with 2 doors");
const roomFour = new Room("roomFour", "A large room with 3 doors");

// hallwayOne.linkRoom("east", roomThree);

// roomTwo.linkRoom("north", hallwayOne);

// roomThree.linkRoom("west", hallwayOne);

// roomOne.linkRoom("east", hallwayTwo);

// hallwayTwo.linkRoom("west", roomFour);

if ((doors.locked = false)) {
  lockedDoor = " A locked";
} else {
  lockedDoor = " An unlocked";
}

const doorStart = new doors(
  "doorStart",
  false,
  ` ${lockedDoor} wooden doors leading too a long dark hallway`
);
const door1 = new doors(
  "door1",
  false,
  ` ${lockedDoor} cell doors leading too a small room`
);
const door2 = new doors(
  "door2",
  false,
  ` ${lockedDoor} cell doors leading too a small room`
);
const door3 = new doors(
  "door3",
  false,
  ` ${lockedDoor} door 3`
);
const door4 = new doors(
  "door4",
  false,
  ` ${lockedDoor} door 4`
);

const door5 = new doors(
  "door5",
  false,
  ` ${lockedDoor} door 5`
);

startRoom.doorsArr = [doorStart, door1, door4];
roomOne.doors = door1;
roomOne.doors = door4;
roomTwo.doors = door2;
roomThree.doors = door3;
hallwayOne.doors = doorStart; 
hallwayOne.doors = door1;
hallwayOne.doors = door2;
hallwayOne.doors = door3;
hallwayTwo.doors = door4;
hallwayTwo.doors = door5;
// const doors4 = new Door();
// const doors5 = new Door("doors2", true, `${ lockeddoors} cell doors leading too a small room`);
// const doors6 = new Door();
// const doors7 = new Door();
// const doors8 = new Door();
// const doors9 = new Door();
// const doors10 = new Door();
// const doors11 = new Door();
// const doors12 = new Door();
// const doors13 = new Door();
// const doors14 = new Door();

startRoom.linkRoom(doorStart, "open", hallwayOne);
hallwayOne.linkRoom(doorStart, "open", startRoom);
hallwayOne.linkRoom(door1, "open", roomOne);
roomOne.linkRoom(door1, "open", hallwayOne);

const Dave = new Character("Dave", "Tiefling", "hello there");
const Bill = new Character("Bill", "fdjusf", "Sup ehrieou");
startRoom.character = Dave;
startRoom.character = Bill;

const displayRoomInfo = (room) => {
  let occupantMsg = "";
  let doorsInRoom = "";
  if (room?.character == []) {
    //Somestuff
    occupantMsg = "There is nobody in this room";
  } else {
    //someotherstuff
    for (index in room.character) {
      occupantMsg += `${room.character[index].talk()}</br>`;
    }
  }

  for (index in room.doors) {
    doorsInRoom += `${room.doors[index].description}</br>`; console.log(room.doors[index])
  }

  let textContent =
    "<p>" +
    room?.describe() +
    doorsInRoom +
    "</p>" +
    "<p>" +
    occupantMsg +
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
let potion = ["health potion", "useless potion", "mystery potion"];
let money = [
  "1 Gold",
  "2 Gold",
  "2 Gold",
  "2 Gold",
  "1 Gold",
  "5 Gold",
  "1 Gold",
  "1 Gold",
  "1 Gold",
  "1 Gold",
];
let key = ["Rusty key", "Rusty key"];

weaponGenerator = () => {
  let wepGen = Math.random();
  if (wepGen < 0.1) {
    weapon = weaponsShining[Math.floor(Math.random() * weaponsShining.length)];
  } else if (wepGen < 0.4) {
    weapon = weaponsSturdy[Math.floor(Math.random() * weaponsSturdy.length)];
  } else {
    weapon =
      weaponsShattered[Math.floor(Math.random() * weaponsShattered.length)];
  }
};
let loot;
lootGenerator = () => {
  let lootGen = Math.random();
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
      loot = "5 Gold";
    } else {
      loot = "1 Gold";
    }
  }
};

const startGame = () => {
  currentRoom = startRoom;
  weaponGenerator();
  lootGenerator();
  // console.log(weapon);
  // console.log(loot);
  displayRoomInfo(currentRoom);

  currentRoomDoors = [];
  
  for (index in currentRoom.doors) {
    currentRoomDoors.push(currentRoom.doors[index]._name);
}
console.log(currentRoomDoors);


document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Navigation
    let commandArray = document.getElementById("userinput").value.split(" ");
    let commandAction = commandArray[0];
    let commands = ["open", "use", "fight"];
    let args = commandArray[1];
    // console.log
    
    if (commandAction === commands[0] && args) {
      // let matchingDoor = currentRoom.doors.find(doors => doors._name === args);
      let matchingDoor = currentRoomDoors.find(doors => doors === args);console.log(2134213212);
      let doorToBeOpened = currentRoom.doors.find(doors => doors._name === args); console.log(doorToBeOpened);
      if (matchingDoor) {
        
        // console.log(matchingDoor.name);
        currentRoom = currentRoom.move(commandAction, doorToBeOpened);
        displayRoomInfo(currentRoom);
      } else {
        alert("There is no door with that name");
      }
    } else {
      alert("Invalid command");
    }
  }
});
}

startGame()