import * as SERVER from './client-server-communication.js';
import * as VARIABLES from './client-variables.js';
const baseURL = window.location.origin
//////
// Functions that have to do with the characters section, and would take up 
// too much space in client.js

export async function charactersHandleSubmit(event) {
    event.preventDefault();
    let charactersNameAvailable = null;
    let span = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-id-tracker > span')
    charactersNameAvailable = await SERVER.getCharacterFromServer(Number(span.id));

    let statsInputs = VARIABLES.CHARACTER_CREATOR_FORM.querySelectorAll('#character-stats label')
    let stats = {};
    statsInputs.forEach(label => {
        let key = label.querySelector('input').id;
        let v = Number(label.querySelector('input').value);
        stats[key] = Number(v)
    }); 
    let job = await SERVER.getCharacterClassFromServer(VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-class').value);
    let species = await SERVER.getSpecieFromServer(VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-species').value);
    let img_src = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-image').src;
    img_src = img_src.split(`${baseURL}/media/images/`)[1];
    let character = {
        name: VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-name').value,
        history: VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-history').value,
        id: Number(span.id),
        level: Number(VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-level-input').value),
        job: job,
        species: species,
        image: img_src,
        stats: stats,
    }
    let response = await SERVER.createCharacter(character);
    if (response) {
        console.log('Character Created');
        resetForm(VARIABLES.CHARACTER_CREATOR_FORM);
    } else {
        console.error('Failed to create character');
    }
    
}
export function cancelCreateCharacters() {
    resetForm(VARIABLES.CHARACTER_CREATOR_FORM);
    VARIABLES.CHARACTER_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Create a Characters';
    VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#createCharacter').innerHTML = 'Create Characters';
    showAllCharacters();
}
export function showAllCharacters() {
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.CHARACTER_LIST_SCREEN.classList.remove('hidden');
}
export function showCharactersCreator() {
    VARIABLES.CHARACTER_LIST_SCREEN.classList.add('hidden');
    VARIABLES.CHARACTER_CREATOR_SCREEN.classList.remove('hidden');
}
export async function characterHandleList() {
    let classList = VARIABLES.CHARACTER_LIST
    classList.innerHTML = '';
    let allCharacters = await SERVER.getCharactersFromServer();

    allCharacters.forEach(characters => {
        let liContainer = document.createElement('li');;
        liContainer.innerHTML = `
            <h3 id="${characters.id}">${characters.name}, a ${characters.species.name} ${characters.job.name}</h3>
            <p>${characters.history}</p>
            <div>
                <button class="btn-default btn-small btn-select-character">Select Character</button>
                <button class="btn-default btn-small btn-edit">Edit</button>
                <button class="btn-default btn-small btn-red btn-delete-class">Delete</button>
            </div>
        `;
        classList.appendChild(liContainer);
    })
}
function addToSelection(type, options) {
    let selections = VARIABLES.CHARACTER_CREATOR_FORM.querySelectorAll('select');
    if (type == 'BOTH') {
        selections.forEach(select => {
            if (select.id == 'character-class') {
                select.innerHTML = '';
                options[0].forEach(option => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option.name;
                    optionElement.innerHTML = option.name;
                    select.appendChild(optionElement);
                });
            } else if (select.id == 'character-species') {
                select.innerHTML = '';
                options[1].forEach(option => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option.name;
                    optionElement.innerHTML = option.name;
                    select.appendChild(optionElement);
                });
            }
        });
        return;
    }
    selections.forEach(select => {
        if (select.id == type && type == 'character-class') {
            select.innerHTML = '';
            options.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.innerHTML = option.name;
                select.appendChild(optionElement);
            });
        } else if (select.id == type && type == 'character-species') {
            select.innerHTML = '';
            options.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.innerHTML = option.name;
                select.appendChild(optionElement);
            });
        }
    });

}
export async function selectCharacter(characterID) {
    let character = await SERVER.getCharacterFromServer(characterID);
    let characterInfo = VARIABLES.CHOSEN_CHARACTER;
    let stats = '';
    for (const [key, value] of Object.entries(character.stats)) {
        stats += `<li><span class='font-styled'>${String(key).charAt(0).toUpperCase() + String(key).slice(1)}:</span> ${value}</li>`
        
    }

    characterInfo.innerHTML = '';
    characterInfo.innerHTML = `
        <div class="topPart">
            <img src="${baseURL}/media/images/${character.image}" alt="${character.name}">
            <div>
                <div class="contain">
                    <span class='chosen-character-sm-header'>Character Name</span>
                    <h3 class='font-styled'>${character.name}</h3>
                </div>
                <div class="contain basic-info">
                    <span class='chosen-character-sm-header'>Basic Info</span>
                    <div class="">
                        <p><span class="font-styled">Level:</span> ${character.level}</p>
                        <p><span class="font-styled">Class:</span> ${character.job.name}</p>
                        <p><span class="font-styled">Species:</span> ${character.species.name}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="contain">
            <span class='chosen-character-sm-header'>Character History</span>
            <p>${character.history}</p>
        </div>
        <div class="contain">
            <span class='chosen-character-sm-header'>Character Stats</span>
            <ul class="character-chosen-stats">
                ${stats}
            </ul>
        </div>
    `;
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.MAIN_SCREEN.classList.remove('hidden');
}

export async function editCharacters(charactersName=null){
    let characters = await SERVER.getCharacterFromServer(charactersName);
    let class_options = await SERVER.getCharacterClassesFromServer();
    let species_options = await SERVER.getSpeciesFromServer();

    let span = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-id-tracker > span')
    span.id = characters?.id;

    let allFields = VARIABLES.CHARACTER_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let statsInputs = VARIABLES.CHARACTER_CREATOR_FORM.querySelectorAll('#character-stats label input');
    allFields.forEach(async field => {
        if (field.id == 'character-name') {
            field.value = characters.name;
        } else if (field.id === 'character-history') {
            field.value = characters.history;
        } else if (field.id === 'character-level-input') {
            field.value = characters.level;
        } else if (field.id === 'character-class') {
            addToSelection('character-class', class_options)
            let correctOption = field.querySelector(`option[value="${characters.job.name}"]`);
            field.insertBefore(correctOption, field.firstChild);
            correctOption.selected = true;
        } else if (field.id === 'character-species') {
            addToSelection('character-species', species_options)
            let correctOption = field.querySelector(`option[value="${characters.species.name}"]`);
            field.insertBefore(correctOption, field.firstChild);
            correctOption.selected = true;
        }
    });
    statsInputs.forEach(input => {
        let key = input.id;
        input.value = characters.stats[key];
    });
    let characterImage = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-image');
    characterImage.src = `media/images/${characters.image}`;
    VARIABLES.CHARACTER_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Edit a Character';
    VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#createCharacter').innerHTML = 'Save Changes';
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.CHARACTER_CREATOR_SCREEN.classList.remove('hidden');
}

export async function resetForm(form) {
    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.placeholder !== '' || input.placeholder ==  undefined) {
            input.value = '';
        } else {
            input.value = input.placeholder;
        }
    });
    let textareas = form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        if (textarea.placeholder !== '' || textarea.placeholder ==  undefined) {
            textarea.value = '';
        } else {
            textarea.value = textarea.placeholder;
        }
    });
    let span = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-id-tracker > span')
    span.id = '';
    let class_options = await SERVER.getCharacterClassesFromServer();
    let species_options = await SERVER.getSpeciesFromServer();
    addToSelection("BOTH", [class_options, species_options]);

}

export async function changeImage(image) { 
    if (VARIABLES.IMAGE_LIST_SCREEN.classList.contains('hidden')) {
        showImages();
    } else {
        VARIABLES.CHARACTER_CREATOR_SCREEN.querySelector('img').src = image;
        hideImages();
    }
}
function hideImages() {
    VARIABLES.IMAGE_LIST_SCREEN.removeEventListener('click', listOfImagesEventClick);
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.CHARACTER_CREATOR_SCREEN.classList.remove('hidden');
}

async function showImages() {
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.IMAGE_LIST_SCREEN.classList.remove('hidden');
    
    let images = await SERVER.getCharacterPortraitsFromServer();
    images.forEach(image => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = `${baseURL}/media/images/${image}`;
        li.appendChild(img);
        VARIABLES.IMAGE_LIST.appendChild(li);
    });
    VARIABLES.IMAGE_LIST_SCREEN.addEventListener('click', listOfImagesEventClick);
}

function listOfImagesEventClick(e) {
    if (e.target.classList.contains('cancel-btn')) {
        hideImages();
    }
    if (e.target.tagName == 'IMG') {
        changeImage(e.target.src);
    }
}