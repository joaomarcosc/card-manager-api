import { fastify } from 'fastify'
import { Users } from './routes/users'
import fastifyCookie from '@fastify/cookie'
import { Auth } from './routes/auth'
import { Cards } from './routes/cards'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  exposedHeaders: ['*'],
})
app.register(fastifyCookie, {
  hook: 'preHandler',
})
app.register(Auth, {
  prefix: 'auth',
})
app.register(Users, {
  prefix: 'users',
})
app.register(Cards, {
  prefix: 'cards',
})
