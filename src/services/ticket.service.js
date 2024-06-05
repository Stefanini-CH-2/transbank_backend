import ticketSchema from "../schema/ticket.schema";
export async function getAllTickets() {
    return ticketSchema.find().exec();
}
export async function getTicketByTicketNumber(ticketNumber) {
    return ticketSchema.findOne({ ticket: ticketNumber }).exec();
}
export async function getTicketByDate(startDate, endDate) {
    return ticketSchema.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        }
    }).exec();
}
export async function createTicket(ticket) {
    return ticketSchema.create(ticket);
}
export async function updateTicket(ticketNumber, ticket) {
    await ticketSchema.findOneAndUpdate({ ticket: ticketNumber }, { $set: { ...ticket } });
}
export async function deleteTicket(ticketNumber) {
    await ticketSchema.deleteOne({ ticket: ticketNumber });
}
