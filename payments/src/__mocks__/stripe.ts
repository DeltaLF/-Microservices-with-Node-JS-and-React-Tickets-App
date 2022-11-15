export const stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({}) // return promise {} while create has been called
    }
};