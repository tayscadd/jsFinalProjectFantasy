import * as SERVER from './client-server-communication.js';
import * as VARIABLES from './client-variables.js';

let CURRENT_JOB = null; // Gets set when the user clicks the edit button on a class.

//////
// Functions that have to do with the job section, and would take up 
// too much space in client.js

export async function jobHandleSubmit(event) {
    event.preventDefault();
    let allFields = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let emptyFields = Array.from(allFields).filter(field => field.value.length < 1);
    let classNameAvailable = null;
    classNameAvailable = await SERVER.getCharacterClassFromServer(VARIABLES.CLASS_CREATOR_FORM.querySelector('#class-name').value);
    console.log(classNameAvailable)
    if (emptyFields.length <= 0 && classNameAvailable == undefined) {
        // If there are no empty fields, then we can create the class.
        let statsInputs = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('#class-stats label')
        let stats = {};
        statsInputs.forEach(label => {
            let key = label.querySelector('input').id;
            let v = Number(label.querySelector('input').value);
            stats[key] = Number(v)
        });
        let job = {
            name: VARIABLES.CLASS_CREATOR_FORM.querySelector('#class-name').value,
            desc: VARIABLES.CLASS_CREATOR_FORM.querySelector('#class-description').value,
            stats: stats,
            stat_variability: Number(VARIABLES.CLASS_CREATOR_FORM.querySelector('#stat-variability').value),
        }
        let response = await SERVER.createJob(job);
        if (response) {
            console.log('Class Created');
            resetForm(VARIABLES.CLASS_CREATOR_FORM);
        } else {
            console.error('Failed to create class');
        }
    } else {
        if (classNameAvailable !== undefined) {
            let errorSpans = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('.error-span');
            errorSpans.forEach(span => {
                span.classList.add('shake');
                span.innerHTML = 'Your chosen class name already exists. Try changing the name.';
                errorSpanDisappear(span)
            });
        }
    }
}
export async function jobHandleSubmitEditVersion(event) {
    event.preventDefault();
    let allFields = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let emptyFields = Array.from(allFields).filter(field => field.value.length < 1)
    if (emptyFields.length <= 0) {
        // If there are no empty fields, then we can create the class.
        let statsInputs = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('#class-stats label')
        let stats = {};
        statsInputs.forEach(label => {
            let key = label.querySelector('input').id;
            let v = Number(label.querySelector('input').value);
            stats[key] = Number(v)
        });
        let job = {
            name: VARIABLES.CLASS_CREATOR_FORM.querySelector('#class-name').value,
            desc: VARIABLES.CLASS_CREATOR_FORM.querySelector('#class-description').value,
            stats: stats,
            stat_variability: Number(VARIABLES.CLASS_CREATOR_FORM.querySelector('#stat-variability').value),
        }
        let response = await SERVER.updateJob(job, CURRENT_JOB);
        if (response) {
            console.log('Class Edited');
            resetForm(VARIABLES.CLASS_CREATOR_FORM);
            CURRENT_JOB = null;
            await jobHandleClassList();
            showAllClasses();
        } else {
            console.error('Failed to edit class');
        }
    }
}
async function errorSpanDisappear(span) {
    setTimeout(() => {
        span.classList.remove('shake');
        span.innerHTML = '';
    }, 3000);
}
export function cancelCreateJob() {
    resetForm(VARIABLES.CLASS_CREATOR_FORM);
    VARIABLES.CLASS_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Create a Class';
    VARIABLES.CLASS_CREATOR_FORM.querySelector('#createClass').innerHTML = 'Create Class';
    showAllClasses();
}
export function showAllClasses() {
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.CLASS_LIST_SCREEN.classList.remove('hidden');
}
export function showClassCreator() {
    VARIABLES.CLASS_LIST_SCREEN.classList.add('hidden');
    VARIABLES.CLASS_CREATOR_SCREEN.classList.remove('hidden');
}
export async function jobHandleClassList() {
    let classList = VARIABLES.CLASS_LIST
    classList.innerHTML = '';
    let allClasses = await SERVER.getCharacterClassesFromServer();

    allClasses.forEach(job => {
        let liContainer = document.createElement('li');;
        liContainer.innerHTML = `
            <h3>${job.name}</h3>
            <p>${job.desc}</p>
            <div>
                <button class="btn-default btn-small btn-edit">Edit</button>
                <button class="btn-default btn-small btn-red btn-delete-class">Delete</button>
            </div>
        `;
        classList.appendChild(liContainer);
    })
}

export async function editJob(classname=null) {
    let job = await SERVER.getCharacterClassFromServer(classname);
    CURRENT_JOB = (job == undefined) ? null : job;
    let allFields = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('input, textarea, select');
    let statsInputs = VARIABLES.CLASS_CREATOR_FORM.querySelectorAll('#class-stats label input');
    allFields.forEach(field => {
        if (field.id == 'class-name') {
            field.value = job.name;
        } else if (field.id == 'class-description') {
            field.value = job.desc;
        } else if (field.id == 'stat-variability') {
            field.value = job.stat_variability;
        }
    });
    statsInputs.forEach(input => {
        let key = input.id;
        input.value = job.stats[key];
    });
    console.log(VARIABLES.CLASS_CREATOR_FORM.querySelector('.section-header'));
    VARIABLES.CLASS_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Edit a Class';
    VARIABLES.CLASS_CREATOR_FORM.querySelector('#createClass').innerHTML = 'Save Changes';
    VARIABLES.ALL_SCREENS.forEach(screen => {screen.classList.add('hidden')});
    VARIABLES.CLASS_CREATOR_SCREEN.classList.remove('hidden');
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
    VARIABLES.CLASS_CREATOR_FORM.querySelector('#createClass').innerHTML = 'Create Class';
    VARIABLES.CLASS_CREATOR_SCREEN.querySelector('h2').innerHTML = 'Create a Class';
}