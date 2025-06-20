This is a CRM lead management project with following functionality

- user can add new lead, view all leads, update and delete leads.
- It must look very professional (target customers are enterprices)

## Tech stack

- react js
- javascript (not typescript)
- antd (ant design) for UI components

## Project structure is as follows:

- `/_actions/` : should contain all custom hooks used for CRUD operations with APIs.
  - it will have universal functions like
    - `getItems` to get all records from given collection
    - `createItem` to add new record in given collection
    - similar for `updateItem` and `deleteItem`
- `/utils/` : should contain any util functions, methods
- `/commons/` : should contain any common components that can be used at multiple places. like loading screen, error screen, card layout etc.
- every feature should have saperate folder dedicated for it.

## Third party libs to use

- react_query: to make API calls.
- antd: for UI library (use ant design for making UI, only write custom css when absolutely necessary)

## Available API endpoints

We are using directus at the backend.

Directus BASE_URL: https://api.qureal.com/
API_KEY: AStMxlulJQjV0GzP7MzK2tOL4Jm9Cqa2

### collections and their fields

- qcrm_leads (full_name, email, contact_no, company_name, requirement, email_to, status (active, closed, on_hold))
