import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function Cards(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionIdExists)

  const paramsSchema = z.object({
    userId: z.string(),
    id: z.string().optional(),
  })

  const querySchema = z.object({
    query: z.string().optional(),
  })

  const cardSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
  })

  app.post('/create/:userId', async (request, reply) => {
    const { description, subtitle, title } = cardSchema.parse(request.body)
    const { userId } = paramsSchema.parse(request.params)

    await knex('cards').insert({
      id: crypto.randomUUID(),
      title,
      subtitle,
      description,
      user_id: userId,
    })

    return reply.status(201).send({
      message: 'Success',
    })
  })

  app.get('/:userId', async (request, reply) => {
    const { userId } = paramsSchema.parse(request.params)
    const { query } = querySchema.parse(request.query)

    const cards = await knex('cards').where('user_id', userId)

    if (query) {
      const card = await knex('cards')
        .where('user_id', userId)
        .andWhere('title', 'like', `%${query}%`)

      return reply.status(200).send({ card })
    }

    return reply.status(200).send({ cards })
  })

  app.patch('/:userId/card/:id', async (request, reply) => {
    const { userId, id } = paramsSchema.parse(request.params)
    const { title, description, subtitle } = cardSchema.parse(request.body)

    await knex('cards')
      .where({
        user_id: userId,
        id,
      })
      .update({
        title,
        description,
        subtitle,
      })

    return reply.status(200).send()
  })

  app.delete('/:userId/card/:id', async (request, reply) => {
    const { userId, id } = paramsSchema.parse(request.params)

    await knex('cards').where('user_id', userId).andWhere('id', id).del()

    return reply.status(200).send()
  })
}
