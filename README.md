# Project CardsManager

## Functional Requirements

- [x] **Create an Account**
  - Users can create an account in the system.

- [x] **Access Account**
  - Users can log in and access their account.

- [x] **Create Card**
  - Authenticated users can create a card.

- [x] **Edit Card**
  - Authenticated users can edit the information of a card.

- [x] **List Cards**
  - Authenticated users can view a list of cards.

- [x] **Search Cards**
  - Authenticated users can search for cards based on criteria.

- [x] **Delete Card**
  - Authenticated users can delete a card.

## Business Requirements

- [x] **Account Credentials**
  - The system validates credentials to create and access an account.

- [x] **Authentication for Operations**
  - Only authenticated users can perform operations such as creating, editing, and deleting cards.

- [x] **Edit Card**
  - Authenticated users can edit the information of a card.

- [x] **Delete Card**
  - Authenticated users can delete a card.

- [x] **Search Card by Title**
  - Authenticated users can search for a specific card by title.

## Non-functional Requirements

- [x] **Database Sqlite3**
  - Uses a database to store information.

- [x] **Fastify**
  - Developed using the Fastify backend framework.

- [x] **Typescript**
  - The code is written in Typescript.

## Execution Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the migrations `npm run migrate:run`.
4. Run the application using `npm run dev`.
5. Access the application at [http://localhost:3333](http://localhost:3333).

Remember to correctly configure environment variables and adjust database settings before running the application.