import { PrismaClient } from "@prisma/client";
import { CreateTicketDto } from "../dto/create.ticket.dto";

const prisma = new PrismaClient()

export async function getAllTickets() {
    return prisma.ticket.findMany()
}

export async function getTicketByTicketNumber(ticketNumber: string) {
    return prisma.ticket.findFirst({ where: { ticket: ticketNumber } })
}

export async function getTicketByDate(startDate: Date, endDate: Date) {
    return prisma.ticket.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        }
    })
}

export async function createTicket(ticket: CreateTicketDto) {
    return prisma.ticket.create({ data: { ...ticket } })
}

export async function updateTicket(ticketNumber: string, ticket: CreateTicketDto) {

    await prisma.ticket.update({ where: { ticket: ticketNumber }, data: { ...ticket } })
    return

}

export async function deleteTicket(ticketNumber: string) {

    await prisma.ticket.delete({ where: { ticket: ticketNumber } })

}