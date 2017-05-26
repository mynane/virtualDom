import { Person } from './interface.ts';

let passcode = 'secret passcode';

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        console.log(newName);
        this._fullName = newName;
    }
}


let employee = new Employee();

employee.fullName = 'Bob Smith';
