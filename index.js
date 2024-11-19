let classes = [
    {
        name: "Warrior",
        desc: "Warriors are known for their strength and agility.",
        stat_variability: 6, // From the average, how far can the stats deviate
        avg_strength: 18,
        avg_intelligence: 7,
        avg_agility: 12,
        avg_speed: 10,
        avg_magic: 0,
        avg_luck: 5
    },
    {
        name: "Wizard",
        desc: "Wizards are known for their intelligence and magic.",
        stat_variability: 6, // From the average, how far can the stats deviate
        avg_strength: 3,
        avg_intelligence: 12,
        avg_agility: 4,
        avg_speed: 3,
        avg_magic: 16,
    }
]

let species = [
    {
        name: "Human",
        desc: "Humans are recarded as strong warriors who are able to adapt to any situation.",
        stat_variability: 6, // From the average, how far can the stats deviate
        avg_strength: 14,
        avg_intelligence: 8,
        avg_agility: 8,
        avg_speed: 5,
        avg_magic: 5,
        avg_luck: 5
    },
    {
        name: "Elf",
        desc: "Elves are known for their agility, speed, and magic.",
        stat_variability: 6, // From the average, how far can the stats deviate
        avg_strength: 3,
        avg_intelligence: 12,
        avg_agility: 14,
        avg_speed: 11,
        avg_magic: 11,
        avg_luck: 2
    }
]

function mathRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// Just for now, randomly generates an image for all images.
const img = document.querySelectorAll('img');
img.forEach((el) => {
    let randomNum = mathRandom(1, 110);
    let url = `./media/images/characterPhoto (${randomNum}).jpeg`;
    url = encodeURIComponent(url);
    el.src = url
});
