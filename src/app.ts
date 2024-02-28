import { fastify } from 'fastify'
import { Users } from './routes/users'
import fastifyCookie from '@fastify/cookie'
import { Auth } from './routes/auth'
import { Cards } from './routes/cards'

export const app = fastify()

app.register(fastifyCookie)
app.register(Auth, {
  prefix: 'auth',
})
app.register(Users, {
  prefix: 'users',
})
app.register(Cards, {
  prefix: 'cards',
})
