const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const authenticate = require('../middleware/authenticate');
const MsqConn = require('../db/mysqlConn');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/build/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

// user register section
// for MongoDB database connection
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if(!email || !password){
//         return res.status(422).json({ error: "Filled the filds properly" });
//     }

//     try {
//         const emailExist = await User.findOne({ email: email });

//         if(emailExist) {
//             return res.status(422).json({ error: "Email already exist!"});
//         }else{
//             const user = new User({ email, password });

//             await user.save();

//             res.status(201).json({ message: "User registerd successfully." });
//         }


//     } catch (error) {
//         console.log(error);
//     }
// });

// user register section
// for MySQL database connection
router.post('/register', upload.single('profileimage'), async (req, res) => {
    const { name, email, password } = await req.body;
    const image = req.file.filename;

    var EncPassword;
    if (!name || !email || !image || !password) {
        return res.status(420).json({ error: "Filled the filds properly" });
    } else {
        // encrypt the password
        EncPassword = await bcrypt.hash(password, 12);
        try {
            await MsqConn.query('SELECT * FROM user_data WHERE email = ?', [email], (err, result) => {
                if (err) {
                    console.log(err)
                }
                try {
                    if (result[0].email) {
                        return res.status(422).send("Email already exist!");
                    }
                } catch (err) {
                    MsqConn.query('INSERT INTO user_data (name, email, password, image) VALUES (?,?,?,?)', [name, email, EncPassword, image], (err, result) => {
                        if (err) {
                            res.status(422).send({ err: err })
                        } else {
                            res.status(201).json({ message: "User registerd successfully." });
                        }
                    })
                }

            })

        } catch (error) {
            console.log(error);
        }
    }

});

// user login section for MongoDB
// router.post('/signin', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: "Filled the field properly" });
//         }

//         const userLogin = await User.findOne({ email: email });

//         if (userLogin) {
//             const isPassMatch = await bcrypt.compare(password, userLogin.password);

//             const token = await userLogin.generateAuthToken(); // jwt token generation in userSchema.js file

//             res.cookie('jwtoken', token, {
//                 expires: new Date(Date.now() + 25892000000),
//                 httpOnly: true
//             });

//             if (!isPassMatch) {
//                 res.status(400).json({ error: "Invalid Credentials!" });
//             } else {
//                 res.status(201).json({ message: "Signin successfully." });
//             }
//         } else {
//             res.status(400).json({ error: "Invalid Credentials!" });
//         }

//     } catch (error) {
//         console.log(error);
//     }
// });

// user login section for MySQL
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(420).json({ error: "Filled the field properly" });
    }

    try {
        await MsqConn.query('SELECT * FROM user_data WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.log(err)
            }
            try {
                if (result[0].email) {
                    const isPassMatch = await bcrypt.compare(password, result[0].password);
                    if (!isPassMatch) {
                        res.status(421).json({ error: "Invalid Credential!" });
                    } else {
                        var user = {
                            name: result[0].name,
                            email: result[0].email,
                            image: result[0].image,
                        }

                        const tokenCode = jwt.sign(user, "SecretKEY");

                        res.cookie('currentuser', tokenCode, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                        });

                        res.status(200).json({ message: "Signin successfully." })
                    }
                } else {
                    res.status(421).json({ error: "Invalid Credentials!" });
                }
            } catch (err) {
                if (err == "TypeError: Cannot read property 'email' of undefined") {
                    res.status(421).json({ error: "Invalid Credential!. Please Check your Email and Password" });
                } else {
                    console.log(err)
                }
            }

        })
    } catch (error) {
        console.log(error)
    }
});

// logout
router.get('/logout', (req, res) => {
    res.clearCookie('currentuser');
    res.status(200).json({ message: "Logout Succesfully." });
});


// User with authenticate
router.get('/user', authenticate, (req, res) => {
    res.send(req.rootUser);
});

module.exports = router;