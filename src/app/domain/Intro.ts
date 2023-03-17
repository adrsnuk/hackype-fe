export class Intro{
    id: number;
    sentence: string;
    
    constructor(id: number, sentance: string){
        this.id = id; 
        this.sentence = sentance + '.';
    }
}