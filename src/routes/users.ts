import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { knex } from '../database'

export async function Users(app: FastifyInstance) {
  app.post('/create', async (request, reply) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { email, name, password } = userSchema.parse(request.body)

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await knex('users').where({ email }).first()

    if (user) {
      return reply.status(400).send({
        message: 'Email already exists',
      })
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    })

    reply.status(201).send({
      success: 'Created',
    })
  })
}
