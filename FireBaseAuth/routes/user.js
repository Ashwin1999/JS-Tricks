const router = require("express").Router();

// To setup firebase admin sdk:
// 1) npm install firebase-admin --save
// 2) In the Firebase console, open Settings > Service Accounts and click Generate New Private Key to download json.

// PART-1: Initialization
// Firebase Admin SDK initialization
const admin = require("firebase-admin");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// PART-2: Routes
// a) Get a specific user
router.get('/:id', async (req, res) => {
    admin
    .auth()
    .getUser(req.params.id)
    .then((userRecord) => {
        res.json({message: userRecord.toJSON()})
    })
    .catch((error) => {
        res.json({message: error})
    })
});

// b) Add a new user
router.post('/', async (req, res) => {
    const user = req.body
    admin
    .auth()
    .createUser({
        email: user.email,
        emailVerified: false,
        phoneNumber: user.phoneNumber,
        password: user.password,
        displayName: user.name,
        photoURL: user.photoURL,
        disabled: false,
      })
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.json({message: `Successfully created new user: ${userRecord.email}`})
    })
    .catch((error) => {
        res.json({message: error})
    });
});

// c) Update a user
router.patch('/:id', async (req, res) => {
    admin
    .auth()
    .updateUser(req.params.id, {
        email: 'modifiedUser@example.com',
        phoneNumber: '+11234567890',
        emailVerified: true,
        password: 'newPassword',
        displayName: 'Jane Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: true,
    })
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.json({message: `Successfully updated user: ${userRecord.email}`})
    })
    .catch((error) => {
        res.json({message: error})
    });
});

// d) Delete a user
router.delete('/:id', async (req, res) => {
    admin
    .auth()
    .deleteUser(req.params.id)
    .then(() => {
        res.json({message: "Successfully deleted user"})
    })
    .catch((error) => {
        res.json({message: error})
    });
});

module.exports = router;