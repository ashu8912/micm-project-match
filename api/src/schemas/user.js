import Joi from '@hapi/joi';
import k from '../constants';

const updateUser = Joi.object({
  body: Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string()
      .max(50)
      .required(),
    lastName: Joi.string()
      .max(50)
      .required(),
    tel: Joi.string().max(20),
    email: Joi.string().email(),
    type: Joi.string()
      .valid(k.USER_TYPE.ADMIN, k.USER_TYPE.PROFESSOR, k.USER_TYPE.STUDENT)
      .required()
  })
    .unknown()
    .required()
});

const updateProfessor = Joi.object({
  body: Joi.object({
    department: Joi.string()
      .max(150)
      .required(),
    position: Joi.string()
      .max(150)
      .required(),
    mila: Joi.bool(),
    university: Joi.string().max(150)
  }).required()
});

const details = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const contactUs = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    message: Joi.string()
  })
});

const approveUser = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const disapproveUser = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const makeAdmin = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const makeProfessor = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const makeStudent = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const getCv = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

export default {
  updateUser,
  updateProfessor,
  details,
  contactUs,
  approveUser,
  disapproveUser,
  makeAdmin,
  makeProfessor,
  makeStudent,
  getCv
};
