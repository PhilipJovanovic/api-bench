'use strict'

const fp = require('fastify-plugin')

class MissingParser {
  constructor() { }

  body(items, g2faNeeded) {
    return (req, res, done) => {
      const missing = this.missing(req.body, items, g2faNeeded)

      if (missing.length != 0)
        return res.send({ error: true, data: 'Missing parameters', details: missing })

      return done()
    }
  }

  params(items, g2faNeeded) {
    return (req, res, done) => {
      const missing = this.missing(req.params, items, g2faNeeded)

      if (missing.length != 0)
        return res.send({ error: true, data: 'Missing parameters', details: missing })

      return done()
    }
  }

  missing(data, items, g2faNeeded) {
    if (!data) return ['body']

    let missing = []

    items.forEach(e => {
      if (typeof data[e] == 'null' || typeof data[e] == 'undefined' || (typeof data[e] == 'string' && data[e] == ''))
        missing.push(e)
    })

    if (g2faNeeded && !data.token)
      missing.push('token')

    return missing
  }
}

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })

  fastify.decorate('missing', new MissingParser())
})
