import { User } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';
import { sendConfirmationMail } from '../mail';

function register(req, res) {
  User.create(req.body.userData)
    .then(sendConfirmationMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function setPassword(req, res) {
  User.setPassword(req.body)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  register,
  setPassword
};