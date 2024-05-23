import { Router } from 'express';
import contactsController from '../controllers/contactsController';
import checkToken from '../middleware/checkToken';

const contactsRouter = Router();

contactsRouter.get('/contacts', checkToken, contactsController.getAllContacts);
contactsRouter.get('/contact/:id?', checkToken, contactsController.getContactById);
contactsRouter.post('/contact', checkToken, contactsController.createNewContact);
contactsRouter.put('/contact/:id', checkToken, contactsController.updateContact);
contactsRouter.delete('/contact/:id', checkToken, contactsController.deleteContact);

export default contactsRouter;
