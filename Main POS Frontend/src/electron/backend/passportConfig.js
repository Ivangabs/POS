import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import { findUserbyUsername, findUserbyId } from './models/Users.js'

export function initPassport(passport){
    
    passport.use(
        new Strategy(async (username, password, cb) => {
            const loginUsername = username;
            const loginPassword = password;
            const qUser = await findUserbyUsername(loginUsername);
            if (!qUser.success) return cb(qUser.error);
            const storedHashedPassword = qUser.data.pass;
            
            bcrypt.compare(loginPassword, storedHashedPassword, (err, isPassMatch) => {
                if (err) {
                    return cb(err);
                } else {
                    return isPassMatch ?
                     cb(null, qUser.data)
                    :
                     cb("Incorrect Password");
                }
            });
    }));
    passport.serializeUser((user, cb) => cb(null, user.userid));
    passport.deserializeUser(async (id, cb) => {
        const qUser = await findUserbyId(id);
        qUser.success? 
            cb(null, qUser.data)
            :
            cb(qUser.error)
    });
}