const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 99
    },
    favouritFruit: fruitSchema
})

const Fruit = mongoose.model('fruit', fruitSchema)

const Person = mongoose.model('person', personSchema)

const fruit = new Fruit({
    name: "PineApple",
    rating: 9,
    review: "Gooood shee"
})

const person = new Person({
    name: "Sai",
    age: 22,
    favouritFruit: fruit
})
// person.save()
// fruit.save()

// const kiwi = new Fruit({
//     name: 'kiwi',
//     rating: 10,
//     review: 'Noice'
// })

// Fruit.insertMany([kiwi, fruit], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully saved all the fruits')
//     }
        
// })

Person.updateOne({ name: "Rahul" }, { favouritFruit: fruit }, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Added the favourite')
    }
})

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err)
    } else {
mongoose.connection.close()

        fruits.forEach(function (fruit) {
            console.log(fruit.name)
        })
    }
})

// Fruit.deleteOne({
//     _id: "5e73221584bfc20a34018657"
// },
//         function(err) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('Successfully deleted')
//         }
    
//     });

// Fruit.deleteMany({ rating: { $lt: 9 } }, function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("got deleted")
//     }
// })