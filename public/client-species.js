import * as SERVER from './client-server-communication.js';
import * as VARIABLES from './client-variables.js';

let CURRENT_SPECIES = null; // Gets set when the user clicks the edit button on a species.
//////
// Functions that have to do with the species section, and would take up 
// too much space in client.js

export async function speciesHandleSubmit(event) {
    event.preventDefault();
    let allFields = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let emptyFields = Array.from(allFields).filter(field => field.value.length < 1);
    let speciesNameAvailable = null;
    speciesNameAvailable = await SERVER.getSpecieFromServer(VARIABLES.SPECIES_CREATOR_FORM.querySelector('#species-name').value);
    if (emptyFields.length <= 0 && speciesNameAvailable == undefined) {
        // If there are no empty fields, then we can create the class.
        let statsInputs = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('#species-stats label')
        let stats = {};
        statsInputs.forEach(label => {
            let key = label.querySelector('input').id;
            let v = Number(label.querySelector('input').value);
            stats[key] = Number(v)
        }); 
        let species = {
            name: VARIABLES.SPECIES_CREATOR_FORM.querySelector('#species-name').value,
            desc: VARIABLES.SPECIES_CREATOR_FORM.querySelector('#species-description').value,
            stats: stats,
            stat_variability: Number(VARIABLES.SPECIES_CREATOR_FORM.querySelector('#stat-variability').value),
        }
        let response = await SERVER.createSpecie(species);
        if (response) {
            console.log('Species Created');
            resetForm(VARIABLES.SPECIES_CREATOR_FORM);
        } else {
            console.error('Failed to create species');
        }
    } else {
        if (speciesNameAvailable !== undefined) {
            let errorSpans = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('.error-span');
            errorSpans.forEach(span => {
                span.classList.add('shake');
                span.innerHTML = "Your chosen species' name already exists. Try changing the name.";
                errorSpanDisappear(span);
            });
        }
    }
}
export async function speciesHandleSubmitEditVersion(event) {
    event.preventDefault();
    let allFields = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let emptyFields = Array.from(allFields).filter(field => field.value.length < 1);
    if (emptyFields.length <= 0) {
        // If there are no empty fields, then we can create the class.
        let statsInputs = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('#species-stats label')
        let stats = {};
        statsInputs.forEach(label => {
            let key = label.querySelector('input').id;
            let v = Number(label.querySelector('input').value);
            stats[key] = Number(v)
        }); 
        let species = {
            name: VARIABLES.SPECIES_CREATOR_FORM.querySelector('#species-name').value,
            desc: VARIABLES.SPECIES_CREATOR_FORM.querySelector('#species-description').value,
            stats: stats,
            stat_variability: Number(VARIABLES.SPECIES_CREATOR_FORM.querySelector('#stat-variability').value),
        }
        let response = await SERVER.editSpecies(species, CURRENT_SPECIES);
        if (response) {
            console.log('Species Created');
            resetForm(VARIABLES.SPECIES_CREATOR_FORM);
            CURRENT_SPECIES = null;
            await speciesHandleClassList();
            showAllSpecies();
        } else {
            console.error('Failed to create species');
        }
    }
}
async function errorSpanDisappear(span) {
    setTimeout(() => {
        span.classList.remove('shake');
        span.innerHTML = '';
    }, 3000);
}

export function cancelCreateSpecies() {
    resetForm(VARIABLES.SPECIES_CREATOR_FORM);
    VARIABLES.SPECIES_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Create a Species';
    VARIABLES.SPECIES_CREATOR_FORM.querySelector('#createSpecies').innerHTML = 'Create Species';
    showAllSpecies();
}
export function showAllSpecies() {
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.SPECIES_LIST_SCREEN.classList.remove('hidden');
}
export function showSpeciesCreator() {
    VARIABLES.SPECIES_LIST_SCREEN.classList.add('hidden');
    VARIABLES.SPECIES_CREATOR_SCREEN.classList.remove('hidden');
}
export async function speciesHandleClassList() {
    let classList = VARIABLES.SPECIES_LIST
    classList.innerHTML = '';
    let allSpecies = await SERVER.getSpeciesFromServer();

    allSpecies.forEach(species => {
        let liContainer = document.createElement('li');;
        liContainer.innerHTML = `
            <h3>${species.name}</h3>
            <p>${species.desc}</p>
            <div>
                <button class="btn-default btn-small btn-edit">Edit</button>
                <button class="btn-default btn-small btn-red btn-delete-class">Delete</button>
            </div>
        `;
        classList.appendChild(liContainer);
    })
}

export async function editSpecies(speciesName=null){
    let species = await SERVER.getSpecieFromServer(speciesName);
    CURRENT_SPECIES = (species == undefined) ? null : species;
    let allFields = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let statsInputs = VARIABLES.SPECIES_CREATOR_FORM.querySelectorAll('#species-stats label input');
    allFields.forEach(field => {
        if (field.id == 'species-name') {
            field.value = species.name;
        } else if (field.id == 'species-description') {
            field.value = species.desc;
        } else if (field.id == 'stat-variability') {
            field.value = species.stat_variability;
        }
    });
    statsInputs.forEach(input => {
        let key = input.id;
        input.value = species.stats[key];
    });
    console.log(VARIABLES.SPECIES_CREATOR_FORM.querySelector('.section-header'));
    VARIABLES.SPECIES_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Edit a Species';
    VARIABLES.SPECIES_CREATOR_FORM.querySelector('#createSpecies').innerHTML = 'Save Changes';
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.SPECIES_CREATOR_SCREEN.classList.remove('hidden');
}

export function resetForm(form) {
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
    VARIABLES.SPECIES_CREATOR_FORM.querySelector('#createSpecies').innerHTML = 'Create Species';
    VARIABLES.SPECIES_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Create a Species';

}