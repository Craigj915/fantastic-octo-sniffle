/* 
class Characters {
  constructor(name, greeting, level, job) {
    this.name = name;
    this.greeting = greeting;
    this.level = level;
    this.job = job;
    this.spawn = spawn;
    this.stats = stats;
    this.weapon = weapon;
  }
}

class Enemy extends Characters {
  constructor(name, greeting, weapon, level, stats, job, spawn) {
    super(name, greeting, level, job, stats, spawn);
    
  }
}

class NPC extends Characters {
  constructor(name, greeting, conversation, level, stats, job, spawn) {
    super(name, greeting, level, job, stats, spawn);
    this.conversation = conversation;
  }
} 
character creator
https://www.avatarsinpixels.com/minipix/clothing/Body
Class {rouge, wizard, warlok, druid, paladin, dark knight, barbarian, tamer, ranger, monk, fighter}
Race {
    dwarf,
    elf,
    dark elf,
    human,
    orc,
    fairy,
    undead,
    pixie,
    tiefling,
    goblin,
    demon,
    beastfolk,
}  

Weapon {
    sword {Greatsword, Longsword, Shortsword, Rapier}
    bludgeon {Club, Flail, Morningstar, Mace, War Hammer, Maul}
    axe {Greataxe, Battle Axe, Light Pick, Pickaxe, Handaxe}
    spear {Spear, Short Spear, Lance, Fork, Trident}
    polearm {Glaive, Halberd, Bill, Naginata, Ranseur}
    knife {Dagger, Karambit, Gut Knife, Knuckle Axe, Kukri, Sickle, Sai, Push Dagger}
    range {Long Bow, Short Bow, Crossbow, Sling, Throwing Axe, Throwing Knife}
    fist {Cestus, Spiked Gauntlet, Iron Claw}
}

Armour {
    head {
        plate helmet :
        chain coif :
        hood :
    }
    chest {
        breastplate :
        hauberk :
        scale :
        chain :
    }
    hands {
        gauntlet :
        chain gloves :
        iron vambrace :
    }
    legs {
        plate greaves :
        chain leggings :
        iron greaves :
    }
    feet {
        sabatons :
        chain boots :
        leather boots :
    }
}

spells {
    counjuration : "creating objects"
    enchantment : "enchanting objects"
    illusion : "distorting senses"
    necromancy : "raising dead"
    malediction : "evil incantations"
    hemomancy : "blood magic"
}

*/

class door {
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
    this._door= [];
  }

  set door(value) {
    this._door.push(value);
  }

  get door() {
    return this._door;
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
    return (
      this._description
    );
  }

  linkRoom(action, roomToLink) {
    this._linkedRooms[action] = roomToLink;
  }

  move(action) {
    if(action in this._linkedRooms) {
        return this._linkedRooms[action];
    } else {
        alert("This action is invalid")
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
    return this._name + " says " + "'" + this._conversation + "'" + this._name+ " is a "+ this._description;
  }
}

let currentRoom;

const startRoom = new Room("Start Room", "You wake up in a dark room with...");
const hallwayOne = new Room("hallwayOne", "a dark long hallway");
const roomOne = new Room("roomOne", "one one one");
const roomTwo = new Room("roomTwo", "two two two");
const roomThree = new Room("roomThree", "three three three");
const hallwayTwo = new Room("hallwayTwo", "h two h two h two");
const roomFour = new Room("roomFour", "four four four");

startRoom.linkRoom("open", hallwayOne);
hallwayOne.linkRoom("open", startRoom);
hallwayOne.linkRoom("open", roomOne);
roomOne.linkRoom("open", hallwayOne);
// hallwayOne.linkRoom("east", roomThree);

// roomTwo.linkRoom("north", hallwayOne);

// roomThree.linkRoom("west", hallwayOne);

// roomOne.linkRoom("east", hallwayTwo);

// hallwayTwo.linkRoom("west", roomFour);

console.log()

if(door.locked = false) {
  lockedDoor = " A locked";
} else {
  lockedDoor = " An unlocked";
}

const Door1 = new door("Door1", false,  `${ lockedDoor} wooden door leading too a long dark hallway`);
startRoom.door = Door1;
hallwayOne.door = Door1;

const Door2= new door("Door2", true, `${ lockedDoor} cell door leading too a small room`);
roomOne.door = Door2;
hallwayOne.door = Door2;

// const Door3 = new door(false, "A cell door leading too a small room");
// const Door4 = new door();
// const Door5 = new door("Door2", true, `${ lockedDoor} cell door leading too a small room`);
// const Door6 = new door();
// const Door7 = new door();
// const Door8 = new door();
// const Door9 = new door();
// const Door10 = new door();
// const Door11 = new door();
// const Door12 = new door();
// const Door13 = new door();
// const Door14 = new door();


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
  } else { console.log(room.character);
    //someotherstuff
    for (index in room.character) {
      console.log(room.character[index]);
    console.log(room);
    occupantMsg += `${room.character[index].talk()}</br>`;
    }
  }
  
  for (index in room.door) {
    console.log(room.door[index]);
  console.log(room);
  doorsInRoom += `${room.door[index].description}</br>`;
  }


  let textContent = "<p>" + room?.describe() + doorsInRoom + "</p>" + "<p>" + occupantMsg + "</p>";

  document.getElementById("roomname").innerHTML = room?.name
  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
};



const startGame = () => {
  currentRoom = startRoom;
  displayRoomInfo(currentRoom)
console.log(currentRoom.door)
  document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
          //navigation
          const command = document.getElementById("usertext").value.toLowerCase();
          const action = ["open"];
          
          if (command.includes(action + currentRoom.door)) {
              currentRoom = currentRoom.move(action);
              displayRoomInfo(currentRoom);
          } else {
              document.getElementById("usertext").value = "";
              alert("That is not a valid command")
              return;
          }
      }
  })
}

startGame();