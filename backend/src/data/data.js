const { v4:uuidv4 }=require('uuid');


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
    },
    {
        id: 4,
        price: 888,
        placedByUserId:2,
        forBikeId:1
    },
    {
        id: 5,
        price: 150,
        placedByUserId:2,
        forBikeId:2
    },
    {
        id: 6,
        price: 999,
        placedByUserId:2,
        forBikeId:9
    },
    {
        id: 7,
        price: 500,
        placedByUserId:3,
        forBikeId:10
    }

];

const users=[
    {
        id: 1,
        name:'John Doe',
        role: ['client'],
        email: 'johndoe@hotmail.com',
        passwordHashValue: '$2a$10$D8GtvFzKc8hB/BMf4fitR.lYtYOK.F8b0of3qrhscTDwTNHB0L5Ku', //c123
        secret:uuidv4()
    },
    {
        id: 2,
        name:'Yibing Doe',
        role: ['client','admin'],
        email: 'yibingdoe@hotmail.com',
        passwordHashValue: '$2a$10$xVYcfY6h.XkMk51k2NONF.kR0GTvB07lu/Y5yhfxWVb5iY9bkJX7a',//haha12
        secret:uuidv4()
    },
    {
        id: 3,
        name:'Lukman Doe',
        role: ['admin'],
        email: 'lukmandoe@hotmail.com',
        passwordHashValue: '$2a$10$hv.LKxrlGfa8zgJJNx/R8OhUQmLBRdK0yNlYtsfQdUzXqiAJ14Eoe',//oiyoi34
        secret:uuidv4()
    }
];

const bikes=[
    {
        id: 1,
        brand:'Gazelle',
        frameType: 'Diamond',
        frameHeightInCm: '53',
        //This is only to show tha date instead of the date and time
        endingDate: new Date(2021,8,31).toISOString().split('T')[0]
    },
    {
        id: 2,
        brand:'Hammer',
        frameType: 'Diamond',
        frameHeightInCm: '49',
        endingDate: new Date(2022,0,10).toISOString().split('T')[0]
    },
    {
        id: 3,
        brand:'Urban Arrow',
        frameType: 'Diamond',
        frameHeightInCm: '50',
        endingDate: new Date(2022,9,20).toISOString().split('T')[0]
    },
    {
        id: 4,
        brand:'Koga',
        frameType: 'Step-through',
        frameHeightInCm: '53',
        endingDate: new Date(2022,7,9).toISOString().split('T')[0]
    },
    {
        id: 5,
        brand:'Cortina',
        frameType: 'Step-through',
        frameHeightInCm: '57',
        endingDate: new Date(2022,11,30).toISOString().split('T')[0]
    },
    {
        id: 6,
        brand:'Hammer',
        frameType: 'Step-through',
        frameHeightInCm: '53',
        endingDate: new Date(2022,0,10).toISOString().split('T')[0]
    },
    {
        id: 7,
        brand:'Racing',
        frameType: 'Step-through',
        frameHeightInCm: '57',
        endingDate: new Date(2022,0,10).toISOString().split('T')[0]
    },
    {
        id: 8,
        brand:'Gazelle',
        frameType: 'Step-through',
        frameHeightInCm: '57',
        endingDate: new Date(2022,0,10).toISOString().split('T')[0]
    },
    {
        id:9,
        brand:'Giant',
        frameType: 'Diamond',
        frameHeightInCm: '53',
        //This is only to show tha date instead of the date and time
        endingDate: new Date(2021,8,31).toISOString().split('T')[0]
    },
    {
        id:10,
        brand:'Monster',
        frameType: 'Diamond',
        frameHeightInCm: '55',
        //This is only to show tha date instead of the date and time
        endingDate: new Date(2021,8,31).toISOString().split('T')[0]
    }
];

module.exports = { bids,users,bikes }

