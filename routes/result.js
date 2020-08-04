const express = require('express');
const router = express.Router();

const Result = require('../models/Result');

router.get('/:competition', async function (req, res) {

  const {competition} = req.params;

  try {
    const results = await Result.find({ competition: competition});
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/', async function (req, res) {
  console.log('runnning');

  const newResult = new Result({
    name: req.body.name,
    result: req.body.result,
    competition: "2048"
  });
  console.log("newResult", newResult)

  const post = await newResult.save();


  res.status(201);
})

module.exports = router;

// router.post(
//   '/',
//   async (req, res) => {
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //   return res.status(400).json({ errors: errors.array() });
//     // }

//     const { name, email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'User already exists' }] });
//       }

//       const avatar = normalize(
//         gravatar.url(email, {
//           s: '200',
//           r: 'pg',
//           d: 'mm'
//         }),
//         { forceHttps: true }
//       );

//       user = new User({
//         name,
//         email,
//         avatar,
//         password
//       });

//       const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user.id
//         }
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: '5 days' },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );