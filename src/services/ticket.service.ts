import { ITicket } from "../models/ticket.model";
import ticketSchema from "../schema/ticket.schema";


export async function getAllTickets() {
    return ticketSchema.find().exec()
}

export async function getTicketByTicketNumber(ticketNumber: string) {
    return ticketSchema.findOne({ ticket: ticketNumber }).exec()
}

export async function getTicketByDate(startDate: Date, endDate: Date) {
    return ticketSchema.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    }).exec()
}

export async function createTicket(ticket: ITicket) {
    return ticketSchema.create(ticket)
}

export async function updateTicket(ticketNumber: string, ticket: ITicket) {

    await ticketSchema.findOneAndUpdate({ ticket: ticketNumber }, { $set: { ...ticket } })

}

export async function deleteTicket(ticketNumber: string) {

    await ticketSchema.deleteOne({ ticket: ticketNumber })

}