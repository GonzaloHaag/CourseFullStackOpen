const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const mostBlog = listHelper.mostBlogs;


describe('Most blog',() => {
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
        },
        {
            "_id": "6820110fe4bd33c66ecff655",
            "title": "MI PRIMER BLOG",
            "author": "GONZALO HAAG",
            "url": "http://lalo.com",
            "likes": 10,
            "__v": 0
        },
    ];
    test('Most blog author',() => {
        const result = mostBlog(blogs);
        assert.deepStrictEqual(result,{
            author: 'GONZALO HAAG',
            blogs: 2
        }); // test pasa, porque es el que mas blog tiene
    })
})