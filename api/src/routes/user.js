import User from '../models/user';
import Professor from '../models/professor';
import { dataHandler, errorHandler, okHandler } from '../utils/handlers';
import { sendVerificationMail } from '../mail';
import uuid from 'uuid';
import * as File from '../utils/file';
import { clean } from '../config/passport';

function userData(req, res) {
  dataHandler(res)({ loggedIn: !!req.user, user: req.user });
}

function updateUser(req, res) {
  const { email, ...userData } = req.body;
  const emailShouldUpdate = email && !req.user.verified;
  const updateData = {
    ...userData,
    id: req.user.id
  };
  if (emailShouldUpdate) {
    updateData.email = email;
    updateData.token = uuid();
  }
  User.update(updateData)
    .then(emailShouldUpdate ? sendVerificationMail : Promise.resolve())
    .then(
      user =>
        new Promise((res, rej) =>
          req.login(clean(user), err => {
            if (err) rej(err);
            else res(clean(user));
          })
        )
    )
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function updateProfessor(req, res) {
  Professor.updateOrCreate({ ...req.body, userId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function updateCv(req, res) {
  const params = {
    Key: `users/${req.user.id}/cv/` + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  File.upload(params)
    .then(file =>
      User.update({
        cvLocation: file.Location,
        cvKey: file.Key,
        cvBucket: file.Bucket,
        id: req.user.id
      })
    )
    .then(okHandler(res))
    .catch(errorHandler(res));
}

function oauthData(req, res) {
  User.getOAuthData(req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  userData,
  updateUser,
  updateProfessor,
  updateCv,
  oauthData
};