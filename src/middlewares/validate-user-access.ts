import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { knex } from '../database'

/*
    Function to validate user access with encrypted password 
    and correct email
*/
export async function validateUserAccess(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authSchema.parse(request.body)

  const user = await knex('users')
    .where({
      email,
    })
    .first()

  if (!user) {
    return reply.status(401).send({
      message: 'Unauthorized: No user found with this email address.',
    })
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if (!matchPassword) {
    return reply.status(401).send({
      message: 'Unauthorized: Incorrect password provided.',
    })
  }
}
