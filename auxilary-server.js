const fs = require('fs/promises');
const path = require('path');
const mediaDirectoryPath = path.join(__dirname, 'public/media/images');


/// Server Related Stuff
async function getFiles(path) {
    let whatgetsreturned = await fs.readdir(path, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            return file;
        });
    })
    return whatgetsreturned;
}

async function getMediaFiles() {
    let mediaFiles = await getFiles(mediaDirectoryPath);
    return mediaFiles;
}

function logRequest(type, forwhat=null) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    if (forwhat) {
        console.log(`\n${currentTime}\n[Recieved a ${type} request for ${forwhat}]`);
    } else {
        console.log(`\n${currentTime}\n[Recieved a ${type} request]`);
    }
}
function confirmResponse(type, forwhat=null) {
    console.log(`[Responded to a ${type} request for ${forwhat}]`);
}

/// Anything that has to actually do with the functionality
/////////////////
// Classes
////////////////////////////////////
class Job {
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck, avg_wisdom, avg_dex, avg_charisma, avg_constitution) {
        this.name = name;
        this.desc = desc;
        this.stat_variability = stat_variability;
        this.avg_strength = avg_strength;
        this.avg_intelligence = avg_intelligence;
        this.avg_wisdom = avg_wisdom;
        this.avg_agility = avg_agility;
        this.avg_speed = avg_speed;
        this.avg_dex = avg_dex;
        this.avg_magic = avg_magic;
        this.avg_luck = avg_luck;
        this.avg_charisma = avg_charisma;
        this.avg_constitution = avg_constitution;
    }

    changeStat(stat, value) {
        this[stat] = value;
    }
}
class Species {
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck, avg_wisdom, avg_dex, avg_charisma, avg_constitution) {
        this.name = name;
        this.desc = desc;
        this.stat_variability = stat_variability;
        this.avg_strength = avg_strength;
        this.avg_intelligence = avg_intelligence;
        this.avg_wisdom = avg_wisdom;
        this.avg_agility = avg_agility;
        this.avg_speed = avg_speed;
        this.avg_dex = avg_dex;
        this.avg_magic = avg_magic;
        this.avg_luck = avg_luck;
        this.avg_charisma = avg_charisma;
        this.avg_constitution = avg_constitution;
    }

    changeStat(stat, value) {
        this[stat] = value;
    }
}
class Character {
    constructor(parameters, name) {
        console.log(`${name}, the ${parameters.species.name} ${parameters.job.name}.`);
        this.job = parameters.job;
        this.species = parameters.species;
        this.name = name;
        this.image = parameters.image;
        this.strength = this.setStat("strength", this.job, this.species);
        this.intelligence = this.setStat("intelligence", this.job, this.species);
        this.wisdom = this.setStat("wisdom", this.job, this.species);
        this.agility = this.setStat("agility", this.job, this.species);
        this.speed = this.setStat("speed", this.job, this.species);
        this.magic = this.setStat("magic", this.job, this.species);
        this.luck = this.setStat("luck", this.job, this.species);
        this.dex = this.setStat("dex", this.job, this.species);
        this.charisma = this.setStat("charisma", this.job, this.species);
        this.constitution = this.setStat("constitution", this.job, this.species);
        this.level = mathRandom(0,10);
        console.log(parameters.image != undefined)
    }

    // Lets me use asycnc to get a random image. By calling the Character.create() method, I can get a random image if the parameters don't have one specified.
    static async create(parameters, name) {
        if (parameters.image == undefined) {
            let url = await getMediaFiles().then(res => res[mathRandom(0, res.length)]);
            parameters.image = `${url}`;
        }
        return new Character(parameters, name);
    }

    setStat(stat, job, species) {
        let VALUE = mathRandom(
            job[`avg_${stat}`] - species[`avg_${stat}`],
            job[`avg_${stat}`] + species[`avg_${stat}`]
        );
        VALUE = Math.round(VALUE);
        if (VALUE < 0) {
            return 0;
        }
        return VALUE;
    }
}

/////////////////
// Default Data
////////////////////////////////////
let JOBS = [
    new Job("Warrior", "Warriors are known for their strength and agility.", 6, 18, 7, 12, 10, 0, 5, 6, 12, 10, 12),
    new Job("Wizard", "Wizards are knowm for their intelligence and magic.", 6, 3, 12, 4, 3, 16, 0, 11, 4, 8, 6),
]
let SPECIES = [
    new Species("Human", "Humans are recarded as strong warriors who are able to adapt to any situation.", 6, 14, 8, 8, 5, 5, 5, 12, 9, 8, 10),
    new Species("Elf", "Elves are known for their agility, speed, and magic.", 6, 3, 12, 14, 11, 11, 2, 8, 14, 6, 8),
]
let CHARACTERS = []
let FIRSTNAMES = [
    "Lyla", "Kyler", "Zoie",
    "Eric", "Carter", "Franklin",
    "Gracie", "Luis", "Cameron",
    "Jovanni", "Oaklyn", "Ty",
    "Amaris", "Louis", "Kendra",
    "Collin", "Danna", "Bryce",
    "Kate", "Alijah", "April",
    "Andre", "Braelyn", "Ambrose",
    "Jada", "Abel", "Tori",
    "Mekhi", "Amelie", "Luka",
    "Catalina", "Greyson", "Frankie",
    "Bryson", "Helen", "Bentley",
    "Lucy", "Osiris", "Louisa",
    "Lukas", "Scarlette", "Maximiliano",
    "Kamiyah", "Kaleb", "Azalea",
    "Quinn", "Madilynn", "Titan",
    "Haylee", "Marley", "Oakleigh",
    "Lian", "Paislee", "Remi",
    "Kayla", "Rylan", "Rosalee",
    "Jonas", "Naomi", "Sonny",
    "Rebecca", "Nicolas", "Samira",
    "Jeffery", "Myra", "Junior",
    "Aurelia", "Soren", "Milan",
    "Seven", "Helen", "Louie",
    "Iliana", "Preston", "Martha",
    "Joey", "Jocelyn", "Damien",
    "Ivory", "Caiden", "Kinslee",
    "Xzavier", "Helena", "Chaim",
    "Dulce", "Nash", "Jenesis",
    "Tru", "Haylee", "Russell",
    "Sienna", "Lawrence", "Melany",
    "Amias", "Anais", "Musa",
    "Destiny", "Erik", "Hailey",
    "Keanu", "Kai", "Kamari",
]
let LASTNAMES = [
    "Valdez", "Henderson", "Hartman",
    "Andersen", "Kelley", "Gibbs",
    "Griffith", "Knight", "Ford",
    "Schroeder", "O'Connell", "Olsen",
    "Farrell", "Magana", "Singh",
    "Cain", "Castaneda", "Barton",
    "Guerrero", "Liu", "Reese",
    "McGuire", "Fuller", "Grimes",
    "Livingston", "Brock", "Warren",
    "Reilly", "Kent", "Gentry",
    "Silva", "Stone", "Watson",
    "Summers", "Romero", "Swanson",
    "Fernandez", "Carter", "Delarosa",
    "Rosario", "Andrews", "Hickman",
    "Montgomery", "Melton", "Lawrence",
    "Townsend", "Gross", "Ibarra",
    "Rubio", "David", "Waller",
    "McMillan", "O'Donnell", "Mann",
    "Rosas", "Riley", "Caldwell",
    "Blankenship", "Gallegos", "Phillips",
    "Hogan", "Morrison", "Pierce",
    "Lynn", "Whitney", "Santana",
    "English", "Pope", "Suarez",
    "York", "Dodson", "Swanson",
    "Kerr", "Dunlap", "Matthews",
    "Leach", "McKay", "Gilbert",
    "Le", "Collier", "Lara",
    "Henson", "Alfaro", "Tyler",
    "Booth", "Huerta", "Watkins",
    "Bean", "Nielsen", "David",
    "Pham", "Mason", "Hess",
    "Abbott", "Golden", "Benton",
    "Solomon", "Cohen", "Pacheco",
    "Watson", "Orozco", "Brock",
]

/////////////////
// Functions
////////////////////////////////////
function mathRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function generateRandomCharacter() {
    let newJob = JOBS[mathRandom(0,JOBS.length)];
    let newSpecies = SPECIES[mathRandom(0,SPECIES.length)];
    let newName = `${FIRSTNAMES[mathRandom(0,FIRSTNAMES.length)]} ${LASTNAMES[mathRandom(0,LASTNAMES.length)]}`;
    let newCharacter = await Character.create({job: newJob, species: newSpecies}, newName);
    CHARACTERS.push(newCharacter);
    return newCharacter;
}

async function updateCharacterPageRandom() {
    let character = await generateRandomCharacter();
}

function updateCharacterImage() {
    let randomNum = mathRandom(1, 110);
    let url = `./media/images/characterPhoto (${randomNum}).jpeg`;
    url = encodeURIComponent(url);
    document.getElementById('characterImage').src = url;
}

module.exports = { logRequest, confirmResponse, getMediaFiles, generateRandomCharacter }; 