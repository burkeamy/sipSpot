const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { firstName, lastName, username, password, userPhoneNumber, emergencyContactNumber, 
            weight, gender, selfAlertThreshold, emergencyAlertThreshold } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'userPhoneNumber': userPhoneNumber }, (err, userMatch) => {
      if (userMatch) {
        let msg=`Phone number exists`;
        //check for password
        if (!userMatch.checkPassword(req.body.password)){  
          msg= `Password does not match`; 
        }
        return res.json({
          error: msg
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password,
        'userPhoneNumber': userPhoneNumber,
        'emergencyContactNumber': emergencyContactNumber,
        'weight': weight,
        'gender': gender,
        'selfAlertThreshold': selfAlertThreshold,
        'emergencyAlertThreshold': emergencyAlertThreshold
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	},
  getUserDrinks: (req, res) => {
    db.User.find({userPhoneNumber: req.body.userPhoneNumber})
    // Specify that we want to populate the retrieved saved news with any associated notes
    .populate("drinks")
    .then(userdrinks => res.json(userdrinks[0]))
    .catch(err => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  }
};