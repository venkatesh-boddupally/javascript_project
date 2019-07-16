import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        const key = '032fd89c31a956671ea5338e4c5556f7';
        try{
            const res = await axios(`http://food2fork.com/api/search?key=${key}&q=${this.query}`, {
                headers: {'Access-Control-Allow-Origin': '*'}
            });
            this.result = res.data.recipes;
        }
        catch (error){
            alert(error)
        }
    }
}