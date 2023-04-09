const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashPassword
        });
        // req.session.user = newUser;
        res.status(201).json({
            status: true,
            data: newUser
        })
    } catch (er) {
        console.log({ er });
        res.status(400).json({
            status: false,
            message: 'failed to add user'
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            // req.session.user = user;
            res.status(200).json({ status: true })
        } else {
            res.status(400).json({
                status: false,
                message: 'incorrect credentials'
            })
        }
    } catch (er) {
        res.status(400).json({
            status: false,
            message: 'failed to add user'
        })
    }

}