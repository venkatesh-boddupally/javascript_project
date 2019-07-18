import axios from 'axios';
import {key} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
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