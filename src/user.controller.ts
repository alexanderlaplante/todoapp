import { Request, Response } from 'express';
import { User } from './models/user';

export const userController = {
    create(req: Request, res: Response): void {
        const user = new User(req.body);
        user.save((err, newUser) => {
            if (err) throw err;
            res.json(newUser);
        });
    },

    getAll(req: Request, res: Response): void {
        User.find({}, (err, allUsers) => {
            if (err) throw err;
            res.json(allUsers);
        });
    },

    get(req: Request, res: Response): void {
        User.findById(req.params.id, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    },

    update(req: Request, res: Response): void {
        User.findByIdAndUpdate(req.params.id, req.body, (err, error) => {
            if (err) throw err;
            res.json(error);
        });
    },

    delete(req: Request, res: Response): void {
        User.remove({ _id: req.params.id }, (err) => {
            if (err) throw err;
            res.sendStatus(200).json(`User deleted with the userId of ${req.params.id}`);
        });
    },
}
