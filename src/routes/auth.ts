import { FastifyInstance } from 'fastify'
import { validateUserAccess } from '../middlewares/validate-user-access'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function Auth(app: FastifyInstance) {
  app.post(
    '/login',
    {
      preHandler: [validateUserAccess],
    },
    async (request, reply) => {
      const authSchema = z.object({
        email: z.string().email(),
      })

      const { email } = authSchema.parse(request.body)

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: 'none',
        })
      }

      await knex('users').where({ email }).update({
        session_id: sessionId,
      })

      const user = await knex('users')
        .where({ email, session_id: sessionId })
        .select([
          'id',
          'name',
          'email',
          'created_at',
          'updated_at',
          'session_id',
        ])
        .first()

      return reply.status(200).send({ user })
    },
  )

  // Logout function
  app.post(
    '/logout/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      })
      const { id } = paramsSchema.parse(request.params)

      reply.clearCookie('sessionId')

      await knex('users').where({ id }).update({
        session_id: null,
      })

      return reply.status(200).send()
    },
  )
}
