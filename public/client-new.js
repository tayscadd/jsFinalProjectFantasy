import * as SERVER from './client-server-communication.js';
import * as VARIABLES from './client-variables.js';
import * as CHARACTER from './client-character.js'; 
import * as JOBS from './client-jobs.js'; // Jobs is another word for classes, because classes is a reserved word.
import * as SPECIES from './client-species.js';

////////
// CLASSES (JOBS)

// Handles the form submission for the class creator form.
VARIABLES.CLASS_CREATOR_FORM.addEventListener('submit', function(event) {
    // Don't want the page to refresh when the form is submitted.
    JOBS.jobHandleSubmit(event);
});

VARIABLES.CLASS_CREATOR_FORM.addEventListener('click', function(event) {
    // Handle routing the clicks on the class creator form.
    const createClassBtn = VARIABLES.CLASS_CREATOR_FORM.querySelector('#createClass');
    const cancelCreateBtn = VARIABLES.CLASS_CREATOR_FORM.querySelector('.cancel-btn');
    const resetFormBtn = VARIABLES.CLASS_CREATOR_FORM.querySelector('.reset-btn');
    
    switch (event.target) {
        case createClassBtn:
            // This gets handled in the submit listener
            break;
        case cancelCreateBtn:
            console.log('Canceling Creating a Class');
            JOBS.cancelCreateJob();
            JOBS.jobHandleClassList();
            break;
        case resetFormBtn:
            console.log('Resetting Form');
            JOBS.resetForm(VARIABLES.CLASS_CREATOR_FORM);
            break;
    }

});

// Handles events for the class list screen.
VARIABLES.CLASS_LIST_SCREEN.addEventListener('click', async function(event) {
    let target = event.target;
    if (target.classList.contains('btn-edit')) {
        console.log('Editing Class');
        await JOBS.editJob(target.parentElement.parentElement.querySelector('h3').innerHTML);
        JOBS.jobHandleClassList();
    } else if (target.classList.contains('btn-delete-class')) {
        console.log('Deleting Class');
        await SERVER.deleteClass(target.parentElement.parentElement.querySelector('h3').innerHTML);
        JOBS.jobHandleClassList();
    } else if (target.id == 'createNewClass') {
        console.log('Creating New Class');
        JOBS.showClassCreator();
    } else if (target.classList.contains('cancel-btn')) {
        console.log('Going back to the Main Screen');
        VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
        VARIABLES.MAIN_SCREEN.classList.remove('hidden');
    }
});



////////
// SPECIES

// Handles the form submission for the class creator form.
VARIABLES.SPECIES_CREATOR_FORM.addEventListener('submit', function(event) {
    // Don't want the page to refresh when the form is submitted.
    SPECIES.speciesHandleSubmit(event);
});

VARIABLES.SPECIES_CREATOR_FORM.addEventListener('click', function(event) {
    // Handle routing the clicks on the class creator form.
    const createSpeciesBtn = VARIABLES.SPECIES_CREATOR_FORM.querySelector('#createSpecies');
    const cancelCreateBtn = VARIABLES.SPECIES_CREATOR_FORM.querySelector('.cancel-btn');
    const resetFormBtn = VARIABLES.SPECIES_CREATOR_FORM.querySelector('.reset-btn');
    
    switch (event.target) {
        case createSpeciesBtn:
            // This gets handled in the submit listener
            break;
        case cancelCreateBtn:
            console.log('Canceling Creating a Species');
            SPECIES.cancelCreateSpecies();
            SPECIES.speciesHandleClassList();
            break;
        case resetFormBtn:
            console.log('Resetting Form');
            SPECIES.resetForm(VARIABLES.SPECIES_CREATOR_FORM);
            break;
    }

});

// Handles events for the species list screen.
VARIABLES.SPECIES_LIST_SCREEN.addEventListener('click', async function(event) {
    let target = event.target;
    if (target.classList.contains('btn-edit')) {
        console.log('Editing Species');
        await SPECIES.editSpecies(target.parentElement.parentElement.querySelector('h3').innerHTML);
        SPECIES.speciesHandleClassList();
    } else if (target.classList.contains('btn-delete-class')) {
        console.log('Deleting Species');
        await SERVER.deleteSpecie(target.parentElement.parentElement.querySelector('h3').innerHTML);
        SPECIES.speciesHandleClassList();
    } else if (target.id == 'createNewSpecies') {
        console.log('Creating New Species');
        SPECIES.showSpeciesCreator();
    } else if (target.classList.contains('cancel-btn')) {
        console.log('Going back to the Main Screen');
        VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
        VARIABLES.MAIN_SCREEN.classList.remove('hidden');
    }
});


////////
// CHARACTERS
VARIABLES.CHARACTER_CREATOR_FORM.addEventListener('submit', function(event) {
    // Don't want the page to refresh when the form is submitted.
    console.log('Submitting Character Form');
    CHARACTER.charactersHandleSubmit(event);
});

VARIABLES.CHARACTER_CREATOR_FORM.addEventListener('click', function(event) {
    // Handle routing the clicks on the class creator form.
    const createCharacterBtn = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#createCharacter');
    const cancelCreateBtn = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('.cancel-btn');
    const resetFormBtn = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('.reset-btn');
    const imageBtn = VARIABLES.CHARACTER_CREATOR_FORM.querySelector('#character-image-edit');
    switch (event.target) {
        case createCharacterBtn:
            // This gets handled in the submit listener
            break;
        case cancelCreateBtn:
            console.log('Canceling Creating a Character');
            CHARACTER.cancelCreateCharacters();
            CHARACTER.characterHandleList();
            break;
        case resetFormBtn:
            console.log('Resetting Form');
            CHARACTER.resetForm(VARIABLES.CHARACTER_CREATOR_FORM);
            break;
        case imageBtn:
            console.log('Changing Image');
            CHARACTER.changeImage(imageBtn.querySelector('img'));
            break;
    }

});

// Handles events for the characters list screen.
VARIABLES.CHARACTER_LIST_SCREEN.addEventListener('click', async function(event) {
    let target = event.target;
    if (target.classList.contains('btn-edit')) {
        console.log('Editing Character');
        await CHARACTER.editCharacters(target.parentElement.parentElement.querySelector('h3').id);
        CHARACTER.characterHandleList();
    } else if (target.classList.contains('btn-delete-class')) {
        console.log('Deleting Character');
        await SERVER.deleteCharacter(target.parentElement.parentElement.querySelector('h3').id);
        CHARACTER.characterHandleList();
    } else if (target.id == 'createNewCharacter') {
        console.log('Creating New Character');
        CHARACTER.showCharactersCreator();
    } else if (target.classList.contains('cancel-btn')) {
        console.log('Going back to the Main Screen');
        VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
        VARIABLES.MAIN_SCREEN.classList.remove('hidden');
    } else if (target.classList.contains('btn-select-character')) {
        console.log('Selecting Character');
        CHARACTER.selectCharacter(target.parentElement.parentElement.querySelector('h3').id);
    }
});

// Handles image clc


////////
// OTHER

// Handles the events for the main screen.
VARIABLES.MAIN_SCREEN.addEventListener('click', async function(event) {
    let target = event.target;
    if (target.id == 'viewCharacters') {
        console.log('Viewing Characters');
        CHARACTER.characterHandleList();
        CHARACTER.showAllCharacters();
    } else if (target.id == 'viewClasses') {
        console.log('Viewing Classes');
        JOBS.jobHandleClassList();
        JOBS.showAllClasses();
    } else if (target.id == 'viewSpecies') {
        console.log('Viewing Species');
        SPECIES.speciesHandleClassList();
        SPECIES.showAllSpecies();
    } else if (target.id == 'generateNewCharacter') {
        console.log('Generating New Character');
        let newCharacter = await SERVER.getNewCharacterFromServer();
        CHARACTER.selectCharacter(newCharacter.id)
    }
});

async function toggleScroll() {
    // Animates the scroll closing and opening
    let scroll = document.querySelector('.scroll');
    scroll.classList.remove('DONOTRUN') // Prevents the scroll from being opened when the page is loaded.
    if (scroll.classList.contains('open')) {
        toggleBtn.innerHTML = '<span>Open Scroll</span>';
        scroll.classList.remove('open')
    } else {
        toggleBtn.innerHTML = '<span>Close Scroll</span>';;
        scroll.classList.add('open')
    }
    await timer(2000);
    return true;
    // Returns true to tell whoever called it that the animation is done.
}
async function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Allows users to close and open the scroll, for fun.
let toggleBtn = document.querySelector('#toggle-btn');
toggleBtn.addEventListener('click', toggleScroll);

// Generates a random character so there is something in the database.
await SERVER.getNewCharacterFromServer();
await CHARACTER.selectCharacter(0)