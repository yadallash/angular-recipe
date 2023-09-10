/*
Type script provides a convience initializer where you don't have to declare the 
properties and create the constructor everytime, you just simply create the constructor and 
add the public identifier before each value, behind the scenes typeScript will create the 
values and assign them for you
*/
export class Ingredient {
    constructor(public name: string, public amount: number){}

}