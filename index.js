/////////////////
// Classes
////////////////////////////////////
class Job {
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck) {
        this.name = name;
        this.desc = desc;
        this.stat_variability = stat_variability;
        this.avg_strength = avg_strength;
        this.avg_intelligence = avg_intelligence;
        this.avg_agility = avg_agility;
        this.avg_speed = avg_speed;
        this.avg_magic = avg_magic;
        this.avg_luck = avg_luck;
    }

    changeStat(stat, value) {
        this[stat] = value;
    }
}
class Species {
    constructor(name, desc, stat_variability, avg_strength, avg_intelligence, avg_agility, avg_speed, avg_magic, avg_luck) {
        this.name = name;
        this.desc = desc;
        this.stat_variability = stat_variability;
        this.avg_strength = avg_strength;
        this.avg_intelligence = avg_intelligence;
        this.avg_agility = avg_agility;
        this.avg_speed = avg_speed;
        this.avg_magic = avg_magic;
        this.avg_luck = avg_luck;
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
        this.strength = this.setStat("strength", this.job, this.species);
        this.intelligence = this.setStat("intelligence", this.job, this.species);
        this.agility = this.setStat("agility", this.job, this.species);
        this.speed = this.setStat("speed", this.job, this.species);
        this.magic = this.setStat("magic", this.job, this.species);
        this.luck = this.setStat("luck", this.job, this.species);
        this.level = mathRandom(0,10);
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
    new Job("Warrior", "Warriors are known for their strength and agility.", 6, 18, 7, 12, 10, 0, 5),
    new Job("Wizard", "Wizards are knowm for their intelligence and magic.", 6, 3, 12, 4, 3, 16, 0)
]
let SPECIES = [
    new Species("Human", "Humans are recarded as strong warriors who are able to adapt to any situation.", 6, 14, 8, 8, 5, 5, 5),
    new Species("Elf", "Elves are known for their agility, speed, and magic.", 6, 3, 12, 14, 11, 11, 2)
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

function generateRandomCharacter() {
    let newJob = JOBS[mathRandom(0,JOBS.length)];
    let newSpecies = SPECIES[mathRandom(0,SPECIES.length)];
    let newName = `${FIRSTNAMES[mathRandom(0,FIRSTNAMES.length)]} ${LASTNAMES[mathRandom(0,LASTNAMES.length)]}`;
    let newCharacter = new Character({job: newJob, species: newSpecies}, newName);
    CHARACTERS.push(newCharacter);
    return newCharacter;
}

console.log(generateRandomCharacter());

// Just for now, randomly generates an image for all images.
const img = document.querySelectorAll('img');
img.forEach((el) => {
    let randomNum = mathRandom(1, 110);
    let url = `./media/images/characterPhoto (${randomNum}).jpeg`;
    url = encodeURIComponent(url);
    el.src = url
});
