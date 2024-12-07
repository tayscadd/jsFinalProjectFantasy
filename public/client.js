let dropPoint = document.querySelector('#loadDataHere');
const baseURL = 'http://localhost:5500';

async function fetchMediaDataFromServer() {
    let response = await fetch(`${baseURL}/get/mediafiles`).then(res => res.json());
    return response.serverResponse;
}

async function renderDataToDOM() {
    console.log(`Getting Data from ${baseURL}/api`)
    let data = await fetchMediaDataFromServer();
    dropPoint.innerHTML = data;
}
//renderDataToDOM();

async function getNewCharacterFromServer() {
    console.log(`Getting Data from ${baseURL}/get/newcharacter`)
    let response = await fetch(`${baseURL}/get/newcharacter`).then(res => res.json());
    return response.character;
}



function updateCharacterSheet(character) {
    document.querySelector('#characterName').innerHTML = `${character.name}`;
    document.querySelector('#characterStrength').innerHTML = character.strength;
    document.querySelector('#characterClass').innerHTML = `${character.species.name} ${character.job.name}`;
    document.querySelector('#characterIntelligence').innerHTML = character.intelligence;
    document.querySelector('#characterWisdom').innerHTML = character.wisdom;
    document.querySelector('#characterAgility').innerHTML = character.agility;
    document.querySelector('#characterSpeed').innerHTML = character.speed;
    document.querySelector('#characterDex').innerHTML = character.dex;
    document.querySelector('#characterMagic').innerHTML = character.magic;
    document.querySelector('#characterLuck').innerHTML = character.luck;
    document.querySelector('#characterCharisma').innerHTML = character.charisma;
    document.querySelector('#characterConstitution').innerHTML = character.constitution;
    document.querySelector('#characterLevel').innerHTML = `lvl ${character.level}`;
    document.querySelector('#characterImage').src = `${baseURL}/media/images/${character.image}`;
}
async function updateCharacterSheetWithRandomData() {
    let character = await getNewCharacterFromServer();
    updateCharacterSheet(character);
    console.log('Updated Character Sheet!')
}
