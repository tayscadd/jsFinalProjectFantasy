import * as SERVER from './client-server-communication.js';
import * as VARIABLES from './client-variables.js';
import * as CHARACTER from './client-character.js'; 
import * as JOBS from './client-jobs.js'; // Jobs is another word for classes, because classes is a reserved word.
import * as SPECIES from './client-species.js';



async function toggleScroll() {
    // Animates the scroll closing and opening
    let scroll = document.querySelector('.scroll');
    scroll.classList.remove('DONOTRUN') // Prevents the scroll from being opened when the page is loaded.
    if (scroll.classList.contains('open')) {
        scroll.classList.remove('open')
    } else {
        scroll.classList.add('open')
    }
    await timer(2000);
    return true;
    // Returns true to tell whoever called it that the animation is done.
}
async function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

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

// Handles the events for the main screen.
VARIABLES.MAIN_SCREEN.addEventListener('click', async function(event) {
    let target = event.target;
    if (target.id == 'viewCharacters') {
        console.log('Viewing Characters');
    } else if (target.id == 'viewClasses') {
        console.log('Viewing Classes');
        JOBS.jobHandleClassList();
        JOBS.showAllClasses();
    } else if (target.id == 'viewSpecies') {
        console.log('Viewing Species');
        SPECIES.speciesHandleClassList();
        SPECIES.showAllSpecies();
    }
});
let toggleBtn = document.querySelector('#toggle-btn');
toggleBtn.addEventListener('click', toggleScroll);

console.log(await SERVER.getCharacterClassesFromServer())