const fs = require('fs/promises');
const path = require('path');
const mediaDirectoryPath = path.join(__dirname, 'public/media/images');
const classIcons = path.join(__dirname, 'public/media/classicons');


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
async function getClassIcons() {
    let classIcons = await getFiles(classIcons);
    return classIcons;
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
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck, avg_wisdom, avg_dex, avg_charisma, avg_constitution, icon=undefined) {
        this.name = name;
        this.desc = desc;
        this.stats = {
            strength: avg_strength,
            intelligence: avg_intelligence,
            wisdom: avg_wisdom,
            agility: avg_agility,
            speed: avg_speed,
            dex: avg_dex,
            magic: avg_magic,
            luck: avg_luck,
            charisma: avg_charisma,
            constitution: avg_constitution
        }
        this.stat_variability = stat_variability;
    }

    static async create(parameters, name) {
        if (parameters.icon == undefined) {
            let url = await getClassIcons().then(res => res[mathRandom(0, res.length)]);
            parameters.image = `${url}`;
        }
    }

    changeStat(stat, value) {
        this.stats[stat] = value;
    }
}
class Species {
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck, avg_wisdom, avg_dex, avg_charisma, avg_constitution) {
        this.name = name;
        this.desc = desc;
        this.stats = {
            strength: avg_strength,
            intelligence: avg_intelligence,
            wisdom: avg_wisdom,
            agility: avg_agility,
            speed: avg_speed,
            dex: avg_dex,
            magic: avg_magic,
            luck: avg_luck,
            charisma: avg_charisma,
            constitution: avg_constitution
        }
        this.stat_variability = stat_variability;
    }

    changeStat(stat, value) {
        this.stats[stat] = value;
    }
}
class Character {
    constructor(parameters, name) {
        this.id = CHARACTER_ID;
        CHARACTER_ID++;
        this.job = parameters.job;
        this.species = parameters.species;
        this.name = name;
        this.image = parameters.image;
        this.level = mathRandom(0,10);
        this.stats = {
            strength: this.setStat("strength", this.job, this.species) + this.level,
            intelligence: this.setStat("intelligence", this.job, this.species) + this.level,
            wisdom: this.setStat("wisdom", this.job, this.species) + this.level,
            agility: this.setStat("agility", this.job, this.species) + this.level,
            speed: this.setStat("speed", this.job, this.species) + this.level,
            dex: this.setStat("dex", this.job, this.species) + this.level,
            magic: this.setStat("magic", this.job, this.species) + this.level,
            luck: this.setStat("luck", this.job, this.species) + this.level,
            charisma: this.setStat("charisma", this.job, this.species) + this.level,
            constitution: this.setStat("constitution", this.job, this.species) + this.level,
        }
    }

    // Lets me use asycnc to get a random image. By calling the Character.create() method, I can get a random image if the parameters don't have one specified.
    static async create(parameters, name) {
        if (parameters.image == undefined) {
            let url = await getMediaFiles().then(res => res[mathRandom(0, res.length)]);
            parameters.image = `${url}`;
        }
    }

    setStat(stat, job, species) {
        let VALUE = mathRandom(
            job.stats[stat] - species.stats[stat],
            job.stats[stat] + species.stats[stat]
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
    new Job("Wizard", "Wizards are known for their intelligence and magic.", 6, 3, 12, 4, 3, 16, 0, 11, 4, 8, 6),
    new Job("Rogue", "Rogues are known for their agility and speed.", 6, 8, 6, 14, 16, 0, 5, 5, 8, 12, 8),
    new Job("Cleric", "Clerics are known for their wisdom and charisma.", 6, 6, 10, 6, 6, 8, 0, 12, 6, 8, 14),
    new Job("Bard", "Bards are known for their charisma and luck.", 6, 6, 8, 6, 6, 6, 0, 14, 6, 8, 10),
    new Job("Paladin", "Paladins are known for their strength and charisma.", 6, 16, 6, 10, 8, 0, 5, 6, 10, 10, 14),
    new Job("Ranger", "Rangers are known for their agility and speed.", 6, 10, 6, 14, 16, 0, 5, 5, 8, 12, 8),
    new Job("Druid", "Druids are known for their connection to nature.", 6, 6, 10, 6, 6, 12, 0, 11, 6, 8, 12),
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
let CHARACTER_ID = (CHARACTERS.length > 0) ? CHARACTERS.length + 1 : 0;
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
function getCharacterJobs() {
    return JOBS;
}
async function deleteJob(name) {
    let index = JOBS.findIndex(job => job.name === name);
    if (index === -1) {
        // Failed to find it, thus can't delete it. Return false to tell the client that the request failed.
        return false;
    }
    JOBS.splice(index, 1);
    return true;
}
function editJob(body) {
    let index = JOBS.findIndex(j => j.name === body.JOB.name);
    if (index === -1) {
        return undefined;
    } else {
        JOBS[index] = body.JOB;
        return true;
    }
}
function createJob(job) {
    try {
        JOBS.push(job);
        return true;
    } catch (e) {
        return false;
    }
}
function getSpeciesList() {
    return SPECIES;
}
async function deleteSpecies(name) {
    let index = SPECIES.findIndex(species => species.name === name);
    if (index === -1) {
        // Failed to find it, thus can't delete it. Return false to tell the client that the request failed.
        return false;
    }
    SPECIES.splice(index, 1);
    return true;
}
function editSpecies(body) {
    let index = SPECIES.findIndex(s => s.name === body.SPECIES.name);
    if (index === -1) {
        return undefined;
    } else {
        SPECIES[index] = body.SPECIES;
        return true;
    }
}
function createSpecies(species) {
    try {
        SPECIES.push(species);
        return true;
    } catch (e) {
        return false;
    }
}
module.exports = { logRequest, confirmResponse, getMediaFiles, generateRandomCharacter, getCharacterJobs, deleteJob, editJob, createJob, getSpeciesList, deleteSpecies, editSpecies, createSpecies }; 