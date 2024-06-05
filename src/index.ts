import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { connectDB } from './db/connection'
import ticketSchema from './schema/ticket.schema'
import { ITicket } from './models/ticket.model'
import 'dotenv/config'
import { createTicket, deleteTicket, getAllTickets, getTicketByDate, getTicketByTicketNumber, updateTicket } from './services/ticket.service'

const app = new Hono()
console.log()
connectDB()

app.get('/api/tickets', async (c) => {
  const tickets = await getAllTickets()
  return c.json(tickets, 200)
})

app.get('/api/tickets/date', async (c) => {

  console.log("Hola Mundo")

  const { start_date, end_date } = c.req.query()

  const tickets = await getTicketByDate(new Date(start_date), new Date(end_date))
  return c.json(tickets, 200)
})

app.get('/api/tickets/:ticketNumber', async (c) => {

  const ticketNumber = c.req.param("ticketNumber")
  const ticket = await getTicketByTicketNumber(ticketNumber)
  return c.json(ticket, 200)
})

app.post('/api/tickets', async (c) => {
  const body = await c.req.json<ITicket>()
  await createTicket(body)
  c.status(201)
  return c.json({ "message": "Ticket creado correctamente" })
})

app.put('/api/tickets/:ticketNumber', async (c) => {
  const ticketNumber = c.req.param("ticketNumber")
  const body = await c.req.json<ITicket>()
  await updateTicket(ticketNumber, body)
  c.status(200)
  return c.json({ "message": "Ticket actualizado correctamente" })
})

app.delete('/api/tickets/:ticketNumber', async (c) => {
  const ticketNumber = c.req.param("ticketNumber")
  await deleteTicket(ticketNumber)
  c.status(200)
  return c.json({ "message": "Ticket eliminado correctamente" })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
