import { faker } from '@faker-js/faker';

export const users = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
        role: 'standard',
    },

};
