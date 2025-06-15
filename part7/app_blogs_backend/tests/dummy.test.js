/** Testear la funcion dummy */
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs) // retorna 1
  assert.strictEqual(result, 1) // debe dar true y pasar el test ya que lo que espero es un 1
})
