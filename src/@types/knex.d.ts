// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Users {
    id: string
    name: string
    email: string
    password: string
    session_id: string | null
    created_at: string
    updated_at: string
  }

  interface Cards {
    id: string
    title: string
    description: string
    subtitle: string
    user_id: string | null
    created_at: string
    updated_at: string
  }

  interface Tables {
    users: Users
    cards: Cards
  }
}
