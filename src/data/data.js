const bids=[
    {
        id: 1,
        price: 5,
        placedByUserId:1,
        forBikeId:1
    },
    {
        id: 2,
        price: 10,
        placedByUserId:2,
        forBikeId:2
    },
    {
        id: 3,
        price: 3,
        placedByUserId:3,
        forBikeId:3
    }
];

const users=[
    {
        id: 1,
        name:'John Doe',
        role: ['client'],
        email: 'johndoe@hotmail.com',
        passwordHashValue: '' //Todo: To be determined later
    },
    {
        id: 2,
        name:'Yibing Doe',
        role: ['client','admin'],
        email: 'yibingdoe@hotmail.com',
        passwordHashValue: ''

    },
    {
        id: 3,
        name:'Lukman Doe',
        role: ['admin'],
        email: 'lukmandoe@hotmail.com',
        passwordHashValue: ''
    }
];

const bikes=[
    {
        id: 1,
        brand:'Gazelle',
        frameType: 'Diamond',
        frameHeightInCm: '123',
        endingDate: new Date(2021,8,31),
        winnerId: -1 //Todo: to be calculated later
    },
    {
        id: 2,
        brand:'Hammer',
        frameType: 'Prone',
        frameHeightInCm: '100',
        endingDate: new Date(2022,0,10),
        winnerId: -1
    },
    {
        id: 3,
        brand:'Urban Arrow',
        frameType: 'Truss',
        frameHeightInCm: '95',
        endingDate: new Date(2022,9,20),
        winnerId: -1
    },
    {
        id: 4,
        brand:'Koga',
        frameType: 'Cantilever',
        frameHeightInCm: '115',
        endingDate: new Date(2022,7,9),
        winnerId: -1
    },
    {
        id: 5,
        brand:'Cortina',
        frameType: 'Folding',
        frameHeightInCm: '133',
        endingDate: new Date(2022,11,30),
        winnerId: -1
    }
];

module.exports = { bids,users,bikes }

