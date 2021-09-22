const bids=[
    {
        id: 1,
        price: 5,
        clientId:1,
        productId:1
    },
    {
        id: 2,
        price: 10,
        clientId:2,
        productId:2
    },
    {
        id: 3,
        price: 3,
        clientId:3,
        productId:3
    },

];

const clients=[
    {
        id: 1,
        name:'John Doe',
        gender: 'male'
    },
    {
        id: 2,
        name:'Yibing Doe',
        gender: 'male'
    },
    {
        id: 3,
        name:'Lukman Doe',
        gender: 'gender unknown feminist and LGBTQ+ ambassador'
    }
];

const products=[
    {
        id: 1,
        name:'Teddy bear',
        endingDate: new Date(2021,8,31)
    },
    {
        id: 2,
        name:'Gold necklace',
        endingDate: new Date(2022,0,10)
    },
    {
        id: 3,
        name:'Old boat',
        endingDate: new Date(2022,9,20)
    },
    {
        id: 4,
        name:'Yacht',
        endingDate: new Date(2022,7,9)
    },
    {
        id: 5,
        name:'High end laptop',
        endingDate: new Date(2022,11,30)
    }
];

module.exports = {bids,clients,products}

