const { test, describe } = require('node:test');
const assert = require('node:assert');

// funcion a probar 

const total = require('../utils/list_helper').totalLikes;

/** El describe sirve para separar secciones */
describe('total likes', () => {
    // blogs fuera del test
    const blogs = [
        {
            "_id": "6820110fe4bd33c66ecff655",
            "title": "MI PRIMER BLOG",
            "author": "GONZALO HAAG",
            "url": "http://lalo.com",
            "likes": 10,
            "__v": 0
        },
        {
            "_id": "6820159d2fab927f4b3349f6",
            "title": "MI SEGUNDO BLOG",
            "author": "MICHAEL JACKSON",
            "url": "http://michael.com",
            "likes": 2,
            "__v": 0
        },
        {
            "_id": "68201c011a6e5a6874fd758b",
            "title": "MI TERCER BLOG",
            "author": "STHEPHEN",
            "url": "http://sthepen.com",
            "likes": 5,
            "__v": 0
        }
    ];
    test('total likes blogs', () => {
        const result = total(blogs); // le mando los blogs
        assert.strictEqual(result,17); // deberia pasar porque es 17 la suma
    })
})