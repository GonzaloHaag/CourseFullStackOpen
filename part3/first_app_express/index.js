const express = require('express');
const app = express();

app.use(express.json()); // Util para cuando envian datos en el body
const notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>') //Puedo responder un html
});

app.get('/api/notes',(request,response) => {
    response.json(notes);
});

// crear nota -> viene en el body
app.post('/api/notes',(request,response) => {
    const body = request.body;

    if(!body.content) {
        /** Si no viene el contenido de la nota, lo informo, clave el RETURN */
        return response.status(400).json({
            error:'Content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: crypto.randomUUID()
    }

    notes.concat(note); // La sumo al array

    response.json(note); // retorno la nota
})

app.get('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id); // obtener id que viene
    const note = notes.find((n) => n.id === id);
    if(note) {
        response.json(note);
    }
    else {
        response.status(400).end(); // note not found
    }
});

app.delete('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id);
    const notes = notes.filter((n) => n.id !== id);
    response.status(204).end(); 
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN ${PORT}`)
})