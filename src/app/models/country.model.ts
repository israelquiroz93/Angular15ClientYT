import { Confederation } from "./confederation.model";

export class Country {

    public teamId : number;
    public countryName : string;
    public confederationId : number;
    public confederation : Confederation;

    constructor(teamId : number, countryName : string, confederationId : number, confederation: Confederation){
        this.teamId = teamId;
        this.countryName = countryName;
        this.confederationId = confederationId;
        this.confederation = confederation
    } 

}