import express from 'express';
import path from 'path';
import multer from 'multer';

import Contact from '../models/Contact';

const router = express.Router();


// où et comment les images/fichiers sont sauvegardés.
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.resolve('app', 'public', 'uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, `${file.originalname}.split('.')[1]`);
    },
});
const upload = multer({ storage });


// POST
// ajouter un nouveau contact
// route 'localhost:${config.port}/listeContact/add'
router.get('/', (request, response) => {
    response.render('add_contact');
});
router.post('/add', upload.single('image'), (req, res) => {
    const newContact = new Contact(req.body);
    console.log(req.file);
    newContact.image = "uploads/" + req.file.filename;

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
        // res.json({ "message": `${contact.nom} a été ajouté` })
    });
    console.log(newContact.image);
});

// GET
// voir tous les contacts
// route 'localhost:${config.port}/listeContact/contacts'
router.get('/contacts', (req, res) => {
    Book.find((err, contacts) => {
        if (err) {
            res.send(err);
        }
        // res.render('contactList', { contacts });
        res.json(contacts);
    });
});

// GET
// voir un contact par son id
// route 'localhost:${config.port}/listeContact/contacts/:id'
router.get('/contacts/:id', (req, res) => {
    Contact.findById( req.params.id, (err, contact) => {
        if (err) {
            res.send(err);
        }
        // res.render('contact', { contact });
        res.json(contact);
    })
});

// PUT
// éditer un contact par son id
// route 'localhost:${config.port}/listeContact/contacts/edit/:id'
router.get('/edit/:id', (request, response) => {
    Contact.findById(request.params.id, (error, contact) => {
        if (error) {
            response.send(error);
        }
        response.render('edit_contact', { contact });
    });
});
router.post('/contacts/edit/:id', (req, res) => {
    Contact.findByIdAndUpdate( req.params.id, req.body, (err, updatedContact) => {
        if (err) {
            res.send(err);
        }
        // res.redirect('/');
        res.json({ "message": `${updatedContact.nom} a été modifié` })
    });
});

// DELETE
// supprimer un livre par son id
// route 'localhost:${config.port}/listeContact/contacts/delete/:id'
router.get('/contacts/delete/:id', (req, res) => {
    Contact.findByIdAndRemove( req.params.id, (err, deletedContact) => {
        if (err) {
            res.send(err);
        }
        // res.redirect('/');
        res.json({ "message": `${deletedContact.titre} a été supprimé` })

    });
});









module.exports = router;
