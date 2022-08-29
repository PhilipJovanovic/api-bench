'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error)
    // Send error response
    reply.send({ error: true, data: "Something went wrong", details: error.message })
  })

  /* fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error)
    // Send error response
    reply.status(409).send({ ok: false })
  }) */
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
