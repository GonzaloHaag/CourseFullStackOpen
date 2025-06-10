/** Todo mi backend -- Servidor */
import axios from "axios";
const baseUrl = "/api/persons"


const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data); // retorno solo la data, que seria el array
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl,newPerson);
    return request.then((response) => response.data);
}

const deletePerson = (idPerson) => {
    const request = axios.delete(`${baseUrl}/${idPerson}`);
    return request.then((response) => response.data);
}

const updatePerson = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person);
    return request.then((response) => response.data);
}


export default { getAll,createPerson, deletePerson, updatePerson };