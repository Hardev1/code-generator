export class Course {
    private _departOrfac: string;
    private _noCourse: number;

    constructor(departOrFac: string, noCourse: number) {
        this._departOrfac = departOrFac;
        this._noCourse = noCourse;
    }

    get departOrFac(): string {
        return this._departOrfac;
    }

    get noCourse(): number {
        return this._noCourse;
    }


    set noCourse(noCourse: number) {
        this._noCourse = noCourse;
    }

}