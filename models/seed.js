const mongoose = require('../utils/connection')
const Object = require('./object')

// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    // array of starter resources(fruits)
    const startObjects = [
        {title: "Terracotta conical rhyton (ritual vessel)", description: "With fern pattern in red and black.", period: "Late Minoan IA", culture: "Minoan", medium: "Terracotta; Fine painted ware, Floral style", classification: "Vases", image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/256787/532568/main-image", onView: "true"},
        {title: "Terracotta larnax (chest-shaped coffin)", description: "The larnax was the standard type of coffin in Crete from the early fourteenth century to the twelfth century B.C. The structure with recessed panels on each side suggests a wooden prototype, and recent scholarship has identified Egyptian chests as the probable models. The decoration on each side consists of geometric and vegetal ornaments well represented on contemporary pottery. The larnax stands at the beginning of an impressive series of large-scale funerary monuments in the Greek and Roman collection.", period: "Late Minoan IIIB", culture: "Minoan", medium: "Terracotta", classification: "Terracottas", image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/256844/538397/main-image", onView: "true"},
        { title: "Terracotta vase in the form of a bull's head", description: "This vase is a type of rhyton, or libation vase. The offering was poured through the hole in the animal's muzzle. The vase was filled either by immersion in a large container or through the hole on the head. Using the principle of the siphon, liquid would not flow out as long as the opening at the top was closed with the thumb.", period: 'Late Minoan II', date: 'ca. 1450–1400 BCE', culture: ' Minoan', medium: 'Terracotta', classification: 'Vases', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/255506/543530/main-image', onView: true},
        // { title: 'test', description: '', period: '', date: '', culture: '', medium: '', classification: '', image: '', onView: false},
        ]
    // then we delete every fruit in the database(all instances of this resource)
    // this will delete any fruits that are not owned by a user
    Object.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter fruits
            Object.create(startObjects)
                // tell our app what to do with success and failures
                .then(data => {
                    console.log('here are the created fruits: \n', data)
                    // once it's done, we close the connection
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // always close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})