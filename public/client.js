let dropPoint = document.querySelector('#loadDataHere');
const baseURL = 'http://localhost:5500';
let CURRENTCHARACTER = null;


/////
// Stuff having to do with talking to the server

// Gets a list of media files from the server (character photos)
async function getMediaDataFromServer() {
    let response = await fetch(`${baseURL}/get/mediafiles`).then(res => res.json());
    return response.serverResponse;
}
// Gets a random character from the server, then returns the character object class.
async function getNewCharacterFromServer() {
    console.log(`Getting Data from ${baseURL}/get/newcharacter`)
    let response = await fetch(`${baseURL}/get/newcharacter`).then(res => res.json());
    return response.character;
}
// Gets a list of character classes from the server.
async function getCharacterClassesFromServer() {
    let response = await fetch(`${baseURL}/get/classes`).then(res => res.json());
    return response.character_classes;
}
// Gets specific class data from the server.
async function getCharacterClassFromServer(name) {
    let response = await fetch(`${baseURL}/get/class/${name}`).then(res => res.json());
    return response.character_class;
}
// Deletes a class from the server.
const deleteClass = async (name) => {
    console.log('Deleting Class: ', name);
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    }
    let response = await fetch(`${baseURL}/delete/class`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete class');
        }
        editClasses();
    }).catch(err => {
        console.error(err);
    });
    
}
// Saves changes to a class on the server.
async function updateJob(job) {
    console.log('Saving Class: ', job);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ JOB: job })
    }
    let response = await fetch(`${baseURL}/put/class/`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update class');
        }
        editClasses();
    }).catch(err => {
        console.error(err);
    });
}
/////
// Page Manipulation Functions

// Updates the character sheet with the provided character object class.
function updateCharacterSheet(character) {
    document.querySelector('#characterName').innerHTML = `${character.name}`;
    document.querySelector('#characterStrength').innerHTML = character.stats.strength;
    document.querySelector('#characterClass').innerHTML = `${character.species.name} ${character.job.name}`;
    document.querySelector('#characterIntelligence').innerHTML = character.stats.intelligence;
    document.querySelector('#characterWisdom').innerHTML = character.stats.wisdom;
    document.querySelector('#characterAgility').innerHTML = character.stats.agility;
    document.querySelector('#characterSpeed').innerHTML = character.stats.speed;
    document.querySelector('#characterDex').innerHTML = character.stats.dex;
    document.querySelector('#characterMagic').innerHTML = character.stats.magic;
    document.querySelector('#characterLuck').innerHTML = character.stats.luck;
    document.querySelector('#characterCharisma').innerHTML = character.stats.charisma;
    document.querySelector('#characterConstitution').innerHTML = character.stats.constitution;
    document.querySelector('#characterLevel').innerHTML = `lvl ${character.level}`;
    document.querySelector('#characterImage').src = `${baseURL}/media/images/${character.image}`;
}
// When the page first loads, get a random character from the server and update the character sheet.
window.onload = async () => {
    generateNewCharacter();
}



/////
// Event Listeners // Button onclicks

const generateNewCharacter = async () => {
    let character = await getNewCharacterFromServer();
    CURRENTCHARACTER = character;
    updateCharacterSheet(character);
}
// The passed container (the class) will be toggled to display, while the others will be hidden.
const toggleDisplay = (container, containerGroup, allowSameBtnToggle="false") => {
    // allowSameBtnToggle is a string due to the way it is passed from the DOM.
    let containers = document.querySelectorAll(`.${containerGroup}`);
    console.log('Toggling: ', container);
    containers.forEach(element => {
        if (element.classList.contains(container)) {
            if (!element.classList.contains('hidden') && "false" !== allowSameBtnToggle) {
                element.classList.add('hidden');
            } else {
                element.classList.remove('hidden');
            }
        } else {
            element.classList.add('hidden');
        }
    });
}
// When the "Edit Classes" button is clicked, get the classes from the server and display them for a user to further edit.
const editClasses = async () => {
    let classes = await getCharacterClassesFromServer();
    let editClassesContainer = document.querySelector('.classList');
    toggleDisplay('editClasses', 'mid-container')
    editClassesContainer.innerHTML = '';
    classes.forEach(characterClass => {
        editClassesContainer.innerHTML += createClassEditItem(characterClass);
    });
}
const createClassEditItem = (params) => {
    let stats = ''
    for (const [key, value] of Object.entries(params.stats)) {
        stats += `<li class='text-fantasy tag'>${key + " " + value}</li>`
    }
    return `<li class='editItem ${params.name}'>
    <h4>${params.name}</h4>
    <div>
        <span class='smallheader'>Class Description</span>
        <span class='${params.name} class-desc'>${params.desc}</span>
    </div>
    <div class="class-stats">
        <span class='smallheader'>Average Stats</span>
        <ul class="${params.name} class-stats-ul hidden">
            ${stats}
        </ul>
    </div>
    <div class="controls">
        <button onclick='deleteClass("${params.name}")'>Delete Class</button>
        <button onclick='toggleDisplay("${params.name}", "class-stats-ul", "true");toggleEditingStats("${params.name}", "class-stats-ul");toggleEditingDesc("${params.name}", "class-desc")'>Edit Class</button>
        <button onclick='saveClassChanges("${params.name}")' class="hidden savebtn">Save Changes</button>
    </div>
    </li>`;
}
const classPromptActive = () => {
    let newClass = document.querySelector('.newClass');
    if (newClass) {
        return true;
    } else {
        return false;
    }
}
const clearClassPrompt = () => {
    let classPrompt = document.querySelector('.newClass');
    if (classPrompt) {
        // Remove event listeners in case they don't get grabage collected.
        classPrompt.querySelectorAll('.tag').forEach(tag => {
            tag.removeEventListener('click', editingState_Class);
        });
        classPrompt.remove();
    }
}
const newClassPrompt = () => {
    console.log('Clicked!')
    if (!classPromptActive()) {
        let newClassContainer = document.querySelector('.classList');
        let li = document.createElement('li');
        let stats = ['strength', 'intelligence', 'wisdom', 'agility', 'speed', 'dex', 'magic', 'luck', 'charisma', 'constitution'].map(stat => {
            return `<li class='text-fantasy tag'>${stat + " 0"}</li>`
        }).join('');
        li.classList.add(...['editItem', 'newClass']);
        function createClassPrompt() {
            return `
        <h4><input type='text' value='newClass' id='edit-newClass'></h4>
        <div>
            <span class='smallheader'>Class Description</span>
            <span class='newClass class-desc'><textarea class="text-fantasy" id="edit-newClass">newClass Desc</textarea></span>
        </div>
        <div class="class-stats">
            <span class='smallheader'>Average Stats</span>
            <ul class="newClass class-stats-ul">
                ${stats}
            </ul>
        </div>
        <div class="controls">
            <button onclick='deleteClass("newClass")'>Cancel</button>
            <button onclick='saveClassChanges("newClass", "true")' class="savebtn">Add Class</button>
        </div>`
        }
        li.innerHTML = createClassPrompt();
        newClassContainer.insertBefore(li, newClassContainer.firstChild);
        li.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', editingState_Class);
        });
    }
}
const toggleEditingStats = (name, containerGroup) => {
    const OTHER_CONTAINERS = document.querySelectorAll(`.${containerGroup}:not(.${name})`);
    const CONTAINER = document.querySelectorAll(`.${containerGroup}.${name}`);
    CONTAINER.forEach(element => {
        let saveBtn = element.parentElement.parentElement.querySelector('.savebtn');
        if (saveBtn.classList.contains('hidden')) {
            saveBtn.classList.remove('hidden');
            element.addEventListener('click', editingState_Class);
            element.classList.add('editing');
        } else {
            saveBtn.classList.add('hidden');
            element.removeEventListener('click', editingState_Class);
            element.classList.remove('editing');
        }
    });
    OTHER_CONTAINERS.forEach(element => {
        let saveBtn = element.parentElement.parentElement.querySelector('.savebtn');
        saveBtn.classList.add('hidden');
        element.removeEventListener('click', editingState_Class);
        element.classList.remove('editing');
        if (element.querySelector('input')) {
            let allInputs = element.querySelectorAll('input');
            allInputs.forEach(input => {
                let v = input.value;
                let key = input.id.split('edit-')[1];
                console.log("Key, Value: ", key, v);
                input.parentElement.innerHTML = `${key} ${v}`;
            });
        }
    });
}
const toggleEditingDesc = (name, containerGroup) => {
    console.log('Toggling Editing Desc: ', name, containerGroup);
    const OTHER_CONTAINERS = document.querySelectorAll(`.${containerGroup}:not(.${name})`);
    const CONTAINER = document.querySelector(`.${containerGroup}.${name}`);
    let savedDesc
    if (CONTAINER.querySelector('textarea')) {
        console.log(CONTAINER.querySelector('textarea').innerHTML)
        savedDesc = CONTAINER.querySelector('textarea').innerHTML;
    } else {
        savedDesc = CONTAINER.innerHTML
    }
    if (!CONTAINER.classList.contains('editing')) {
        CONTAINER.classList.add('editing');
        CONTAINER.innerHTML = `<textarea class="text-fantasy" id="edit-${name}" placeholder="${savedDesc}">${savedDesc}</textarea>`;

        console.log('CONTAINER WITH EVENT LISTENER: ', CONTAINER)
        CONTAINER.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let newValue = CONTAINER.querySelector('textarea')?.value;
                let inner = CONTAINER.querySelector('textarea')?.innerHTML
                if (newValue === '' || newValue == null) {
                    if (inner === newValue) {
                    } else {
                        CONTAINER.innerHTML = savedDesc; 
                    }
                } else {
                    if (newValue !== inner) {
                        CONTAINER.innerHTML = newValue;
                    }
                }
                //savedDesc = The saved description
                //newValue = The value of the textarea
                //inner = The innerHTML of the textarea
            }
        }, true);
    } else {
        CONTAINER.classList.remove('editing');
        CONTAINER.innerHTML = savedDesc;
    }
    OTHER_CONTAINERS.forEach(element => {
        if (element.querySelector('textarea')) {
            savedDesc = element.querySelector('textarea').placeholder;
            element.innerHTML = savedDesc;
        }
    });
    
}

// Sets a tag into editing mode, allowing the user to changes to the value. Also enables event listeners for saving the changes.
const editingState_Class = async (el) => {
    let element = el.target;
    let [key, v] = element.innerHTML.split(' ');
    element.innerHTML = `<input type='text' value='' id='edit-${key}'>`;
    element.querySelector('input').focus();
    element.querySelector('input').value = v;
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let newValue = element.querySelector('input').value;
            if (isNaN(newValue) || newValue === '' || newValue == null || Number(newValue) < 0) {
                element.innerHTML = `${key} ${v}`;
            } else {
                element.innerHTML = `${key} ${parseInt(Number(newValue))}`;
            }
        }
    });
}
// handles collecting the data from the class changes and then sending to the server update function.
async function saveClassChanges(jobName, classPrompt=false) {
    if (classPrompt) {
        jobName = document.querySelector('.newClass h4').innerHTML;
        console.log('Requesting Name: ', jobName)
        let nameAvailable = await getCharacterClassFromServer(jobName);
        if (nameAvailable == undefined) {
        } else {
            alert('Class Name is not available! Please change it and try again.');
            return
        }
    }
    let jobFromServer = await getCharacterClassFromServer(jobName);

    let updatedStats = {};
    let className = document.querySelector(`.${jobName} h4`).innerHTML;
    let classDesc = document.querySelector(`.${jobName} span > textarea`)?.value;
    if (classDesc === '' || classDesc == null) {
        classDesc = document.querySelector(`.${jobName} span`).innerHTML;
    }
    let stats = document.querySelectorAll(`.${jobName}.class-stats-ul li`);
    stats.forEach(stat => {
        let [key, value] = stat.innerHTML.split(' ');
        updatedStats[key] = Number(value);
    });
    if (classDesc === '' || classDesc == null) {
        classDesc = jobFromServer.desc;
    }
    let updatedClass = {
        name: (jobFromServer.name != className) ? className : jobFromServer.name,
        desc: (jobFromServer.desc != classDesc) ? classDesc : jobFromServer.desc,
        stats: updatedStats,
        stat_variability: jobFromServer.stat_variability
    }
    console.log('From HTML: ', classDesc)
    console.log('From Server: ', jobFromServer.desc)
    console.log('updatedClass: ', updatedClass.desc)
    updateJob(updatedClass)

    if (classPrompt) {
        clearClassPrompt();
    }
}

const displayMidCloseBtn = () => {
    let midCloseBtn = document.querySelector('#mid-container-close-btn');
    midCloseBtn.classList.remove('hidden');
}
const closeMidContainer = () => {
    let midCloseBtn = document.querySelector('#mid-container-close-btn');
    midCloseBtn.classList.add('hidden');
}