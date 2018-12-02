export interface UserAccountReturnModel {
    userId: string,
    userName: string,
    firstName: string,
    lastName: string,
    streetAddress: string,
    city: string,
    state: {
        stateID: number,
        stateCode: string,
        stateName: string
    },
    stateId: number, 
    zipCode: string,
    cellPhoneNumber: string,
    homePhoneNumber: string,
    emailAddress: string,
    created: string,
    creditCardType: string,
    creditCardNumber: string,
    creditCardExpiration: string
}

