import { Request, Response } from 'express';
import { Person } from './models/person';

export const personController = {
    create(req: Request, res: Response): void {
        const person = new Person(req.body);
        person.save((err, newPerson) => {
            if (err) throw err;
            res.json(newPerson);
        });
    },

    getAll(req: Request, res: Response): void {
        Person.find({}, (err, allPeople) => {
            if (err) throw err;
            res.json(allPeople);
        });
    },

    get(req: Request, res: Response): void {
        Person.findById(req.params.id, (err, person) => {
            if (err) throw err;
            res.json(person);
        });
    },

    update(req: Request, res: Response): void {
        Person.findByIdAndUpdate(req.params.id, req.body, (err, person) => {
            if (err) throw err;
            res.json(person);
        });
    },

    delete(req: Request, res: Response): void {
        Person.remove({ _id: req.params.id }, (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    },
}
