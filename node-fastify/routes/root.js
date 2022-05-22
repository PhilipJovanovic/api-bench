'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    preHandler: (fastify, opts, next) => {
      //console.log(opts)
      console.log("prehandlrt")
      next()
    },
    preValidation: (req, res, next) => {
      console.log("preValidation")

      console.log(req.user)

      req.jwtVerify(null, (err, val) => {
        console.log("verify")
        if (err)
          res.send({ error: true, data: 'Error while trying to verify'})

        console.log("VAL", val)
      })
    }
  }, (request, reply) => {
    return "Hello, World 👋!!"
  })
}