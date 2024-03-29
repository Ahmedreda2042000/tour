const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.put('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.put(
  '/updateMe',
  userController.uploadUserImage,
  userController.resizeImage,
  userController.updateMe,
);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(
    userController.uploadUserImage,
    userController.resizeImage,
    userController.createUser,
  );

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    userController.uploadUserImage,
    userController.resizeImage,
    userController.updateUser,
  )
  .delete(userController.deleteUser);

module.exports = router;
