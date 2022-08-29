'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', {
    preHandler: fastify.missing.body(['test', 'Test2']),
  }, (request, reply) => {

    throw new Error()

    return "Hello, World 👋!!"
  })

  fastify.get('/', (request, reply) => {
    console.log("GET /")

    const test = 2

    test.includes(4)

    return "Hello, World 👋!!"
  })
}