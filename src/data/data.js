const bids=[
    {
        id: 1,
        price: 5
    },
    {
        id: 2,
        price: 10
    },
    {
        id: 3,
        price: 3
    },
    {
        id: 4,
        price: 15
    },
    {
        id: 5,
        price: 7
    }
];

const clients=[
    {
        id: 1,
        name:'John Doe',
        gender: 'male',
        products:[],
        bids: []
    },
    {
        id: 2,
        name:'Yibing Doe',
        gender: 'female',
        products:[],
        bids: [
            {
                id: 1,
                price: 5
            }
        ]
    },
    {
        id: 3,
        name:'Lukman Doe',
        gender: 'male',
        products:[
            {
            id: 3,
            name:'Old boat',
            startingDate: new Date(2021,9,15),
            endingDate: new Date(2022,9,20),
            isUpForAuction: true
            }
        ],
        bids: [
            {
                id: 4,
                price: 15
            },
            {
                id: 1,
                price: 5
            }
        ]
    },
    {
        id: 4,
        name:'Emilia Doe',
        gender: 'female',
        products:[],
        bids: [
            {
                id: 4,
                price: 15
            },
            {
                id: 1,
                price: 5
            },
            {
                id: 2,
                price: 10
            },
            {
                id: 3,
                price: 3
            }
        ]
    },
    {
        id: 5,
        name:'Gary Doe',
        gender: 'unknown',
        products:[
            {
            id: 1,
            name:'Teddy bear',
            startingDate: new Date(2021,8,25),
            endingDate: new Date(2021,8,31),
            isUpForAuction: true
            },
            {
                id: 2,
                name:'Gold necklace',
                startingDate: new Date(2022,0,1),
                endingDate: new Date(2022,0,10),
                isUpForAuction: false
            },
            {
                id: 3,
                name:'Old boat',
                startingDate: new Date(2021,9,15),
                endingDate: new Date(2022,9,20),
                isUpForAuction: true
            }
        ],
        bids: []
    }
];

const products=[
    {
        id: 1,
        name:'Teddy bear',
        startingDate: new Date(2021,8,25),
        endingDate: new Date(2021,8,31),
        isUpForAuction: true
    },
    {
        id: 2,
        name:'Gold necklace',
        startingDate: new Date(2022,0,1),
        endingDate: new Date(2022,0,10),
        isUpForAuction: false
    },
    {
        id: 3,
        name:'Old boat',
        startingDate: new Date(2021,9,15),
        endingDate: new Date(2022,9,20),
        isUpForAuction: true
    },
    {
        id: 4,
        name:'Yacht',
        startingDate: new Date(2021,7,7),
        endingDate: new Date(2022,7,9),
        isUpForAuction: false
    },
    {
        id: 5,
        name:'High end laptop',
        startingDate: new Date(2021,11,25),
        endingDate: new Date(2022,11,30),
        isUpForAuction: true
    }
];

module.exports = {bids,clients,products}

