const baseURL = window.location.origin;
const DeleteOptions = (param1, param2) => {return {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ param1: param2 })
}
}
const UpdateOptions = (param1, param2) => {return {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ param1: param2 })
}
}
const CreateOptions = (param1, param2) => {return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ param1: param2 })
}
}
const ReadOptions = () => {return {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
}
/////
// Stuff having to do with talking to the server

////// Auxilary Stuff

//Just puts a comment in the server terminal to help debug.
export async function logRequest(message) {
    let res = await fetch(`${baseURL}/log`, UpdateOptions('msg', message));
}




////// MEDIA

// Gets a list of Portraits from the server (character photos)
export async function getCharacterPortraitsFromServer() {
    let response = await fetch(`${baseURL}/get/portraits`, ReadOptions()).then(res => res.json());
    return response.mediaFiles;
}
// Gets a specific portrait from the server. (prob not going to use)
// export async function getCharacterPortraitFromServer(name) {
//     let response = await fetch(`${baseURL}/get/portrait/${name}`).then(res => res.json());
//     return response.serverResponse;
// }
// Gets a list of class icons from the server.
export async function getCharacterClassIconsFromServer() {
    let response = await fetch(`${baseURL}/get/classicons`, ReadOptions()).then(res => res.json());
    return response.serverResponse;
}
// Gets a specific class icon from the server.
export async function getCharacterClassIconFromServer(name) {
    let response = await fetch(`${baseURL}/get/classicon/${name}`, ReadOptions()).then(res => res.json());
    return response.serverResponse;
}




////// CHARACTERS

// Gets a random character from the server, then returns the character object class.
export async function getNewCharacterFromServer() {
    let response = await fetch(`${baseURL}/get/newcharacter`, ReadOptions()).then(res => res.json());
    response.character.job.name = response.character.job.name.replaceAll('_', ' ');
    response.character.species.name = response.character.species.name.replaceAll('_', ' ');
    response.character.name = response.character.name.replaceAll('_', ' ');
    return response.character;
}

// Gets a list of character classes from the server.
export async function getCharactersFromServer() {
    let response = await fetch(`${baseURL}/get/characters`, ReadOptions()).then(res => res.json());
    return response.characters;
}

// Gets specific character from the server.
export async function getCharacterFromServer(id) {
    let response = await fetch(`${baseURL}/get/character/${id}`, ReadOptions()).then(res => res.json()).catch(err => console.error("Response from Server:", err));
    return response.character;
}
export async function createCharacter(character) {
    let response = await fetch(`${baseURL}/put/character/create`, UpdateOptions("CHARACTER", character))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to create character');
        }
        return true;
    }).catch(err => {
        console.error(err);
        return false;
    });
    return response
}
export async function deleteCharacter(id) {
    console.log('Deleting Character: ', id);
    let response = await fetch(`${baseURL}/delete/character/`, DeleteOptions('id', id))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete character');
        }
        return true
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}



////// CLASSES

// Gets a list of character classes from the server.
export async function getCharacterClassesFromServer() {
    let response = await fetch(`${baseURL}/get/classes`, ReadOptions()).then(res => res.json());
    return response.character_classes;
}
// Gets specific class data from the server.
export async function getCharacterClassFromServer(name) {
    let response = await fetch(`${baseURL}/get/class/${name}`, ReadOptions()).then(res => res.json());
    return response.character_class;
}
// Deletes a class from the server.
export async function deleteClass(name) {
    console.log('Deleting Class: ', name);
    let response = await fetch(`${baseURL}/delete/class`, DeleteOptions('name', name))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete class');
        }
        return true
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}
// Saves changes to a class on the server.
export async function updateJob(job, oldjob) {
    console.log('Saving Class: ', job);
    let response = await fetch(`${baseURL}/post/class/update`, CreateOptions('JOBS_COMBINED', {job, oldjob}))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update class');
        }
        return true
        // editClasses();
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}
// Creates a new class on the server.
export async function createJob(job) {
    console.log('Adding Class: ', job);
    let response = await fetch(`${baseURL}/put/class/create`, UpdateOptions('JOB', job))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to create class');
        }
        return true;
    }).catch(err => {
        console.error(err);
        return false;
    });
    return response
}




////// SPECIES

// Gets a list of species from the server.
export async function getSpeciesFromServer() {
    let response = await fetch(`${baseURL}/get/species`, ReadOptions()).then(res => res.json());
    return response.species;
}
// Gets specific species data from the server.
export async function getSpecieFromServer(name) {
    let response = await fetch(`${baseURL}/get/species/${name}`, ReadOptions()).then(res => res.json());
    return response.species;
}
// Deletes a species from the server.
export async function deleteSpecie(name) {
    console.log('Deleting Specie: ', name);
    let response = await fetch(`${baseURL}/delete/specie`, DeleteOptions('name', name))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete specie');
        }
        return true
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}
// Saves changes to a species on the server.
export async function editSpecies(specie, oldspecie) {
    console.log('Saving Specie: ', specie);
    let response = await fetch(`${baseURL}/post/specie/update`, CreateOptions('SPECIES_COMBINED', {specie, oldspecie}))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update specie');
        }
        return true
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}
// Creates a new species on the server.
export async function createSpecie(specie) {
    console.log('Adding Specie: ', specie);
    let response = await fetch(`${baseURL}/put/specie/create`, UpdateOptions('SPECIES', specie))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to create specie');
        }
        return true;
    }).catch(err => {
        console.error(err);
        return false;
    });
    return response
}