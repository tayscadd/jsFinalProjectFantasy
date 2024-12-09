const baseURL = 'http://localhost:5500';

/////
// Stuff having to do with talking to the server

////// Auxilary Stuff

//Just puts a comment in the server terminal to help debug.
export async function logRequest(message) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ msg: message })
    }
    let res = await fetch(`${baseURL}/log`, options)
}




////// MEDIA

// Gets a list of Portraits from the server (character photos)
export async function getCharacterPortraitsFromServer() {
    let response = await fetch(`${baseURL}/get/portraits`).then(res => res.json());
    return response.serverResponse;
}
// Gets a specific portrait from the server. (prob not going to use)
// export async function getCharacterPortraitFromServer(name) {
//     let response = await fetch(`${baseURL}/get/portrait/${name}`).then(res => res.json());
//     return response.serverResponse;
// }
// Gets a list of class icons from the server.
export async function getCharacterClassIconsFromServer() {
    let response = await fetch(`${baseURL}/get/classicons`).then(res => res.json());
    return response.serverResponse;
}
// Gets a specific class icon from the server.
export async function getCharacterClassIconFromServer(name) {
    let response = await fetch(`${baseURL}/get/classicon/${name}`).then(res => res.json());
    return response.serverResponse;
}




////// CHARACTERS

// Gets a random character from the server, then returns the character object class.
export async function getNewCharacterFromServer() {
    let response = await fetch(`${baseURL}/get/newcharacter`).then(res => res.json());
    response.character.job.name = response.character.job.name.replaceAll('_', ' ');
    response.character.species.name = response.character.species.name.replaceAll('_', ' ');
    response.character.name = response.character.name.replaceAll('_', ' ');
    return response.character;
}

// Gets a list of character classes from the server.
export async function getCharactersFromServer() {
    let response = await fetch(`${baseURL}/get/characters`).then(res => res.json());
    return response.characters;
}

// Gets specific character from the server.
export async function getCharacterFromServer(id) {
    let response = await fetch(`${baseURL}/get/character/${id}`).then(res => res.json()).catch(err => console.error("Response from Server:", err));
    return response.character;
}
export async function createCharacter(character) {
    console.log('Creating Character: ', character);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CHARACTER: character })
    }
    let response = await fetch(`${baseURL}/put/character/create`, options)
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
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }
    let response = await fetch(`${baseURL}/delete/character/`, options)
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
    let response = await fetch(`${baseURL}/get/classes`).then(res => res.json());
    return response.character_classes;
}
// Gets specific class data from the server.
export async function getCharacterClassFromServer(name) {
    let response = await fetch(`${baseURL}/get/class/${name}`).then(res => res.json());
    return response.character_class;
}
// Deletes a class from the server.
export async function deleteClass(name) {
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
        return true
    }).catch(err => {
        console.error(err);
        return false
    });
    return response
}
// Saves changes to a class on the server.
export async function updateJob(job) {
    console.log('Saving Class: ', job);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ JOB: job })
    }
    let response = await fetch(`${baseURL}/put/class/update`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update class');
        }
        // editClasses();
    }).catch(err => {
        console.error(err);
    });
}
// Creates a new class on the server.
export async function createJob(job) {
    console.log('Adding Class: ', job);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ JOB: job })
    }
    let response = await fetch(`${baseURL}/put/class/create`, options)
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
    let response = await fetch(`${baseURL}/get/species`).then(res => res.json());
    return response.species;
}
// Gets specific species data from the server.
export async function getSpecieFromServer(name) {
    let response = await fetch(`${baseURL}/get/species/${name}`).then(res => res.json());
    return response.species;
}
// Deletes a species from the server.
export async function deleteSpecie(name) {
    console.log('Deleting Specie: ', name);
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    }
    let response = await fetch(`${baseURL}/delete/specie`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete specie');
        }
        editSpecies();
    }).catch(err => {
        console.error(err);
    });
}
// Saves changes to a species on the server.
export async function updateSpecie(specie) {
    console.log('Saving Specie: ', specie);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ SPECIE: specie })
    }
    let response = await fetch(`${baseURL}/put/specie/update`, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update specie');
        }
    }).catch(err => {
        console.error(err);
    });
}
// Creates a new species on the server.
export async function createSpecie(specie) {
    console.log('Adding Specie: ', specie);
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ SPECIES: specie })
    }
    let response = await fetch(`${baseURL}/put/specie/create`, options)
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