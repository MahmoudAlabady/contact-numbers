const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contacts', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// const mongoose = require('mongoose');
// const Contact = require('../models/contact');

// // Connect to the database
// mongoose.connect('mongodb://127.0.0.1:27017/contacts', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Add 30 documents to the collection
//     for (let i = 1; i <= 30; i++) {
//       const newContact = new Contact({
//         name: `Contact ${i}`,
//         phone: `555-1234-${i.toString().padStart(2, '0')}`,
//         address: `123 Main St, Anytown USA ${i.toString().padStart(2, '0')}`,
//         notes: `Some notes about contact ${i}`,
//         lockedBy: ''
//       });
//       newContact.save()
//         .then(() => console.log(`Added contact ${i}`))
//         .catch(err => console.error(err));
//     }
//   })
//   .catch(err => console.error(err));
