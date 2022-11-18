<<<<<<< HEAD
import React from 'react';

export default class Validator extends React.Component{
=======
export default class Validator{
>>>>>>> origin/master
    
    errors = {};
    regFields = {};
    fieldsValue = {};
<<<<<<< HEAD

    reRender(){
        // calling the forceUpdate() method
        this.forceUpdate();
    };
=======
>>>>>>> origin/master
    
    //Registering the fields
    register(data){
        this.regFields = data;
        const fieldsName = Object.keys(data);
        fieldsName.map((item) => {
            this.errors[item] = ''
            this.fieldsValue[item] = '';
        })
    }

    //Clear all errors or particular field error
    clearErrors(data=null){
        if(data == null || !data[0]){
            Object.keys(this.errors).map((item) => {
                this.errors[item] = '';
            })
        }
        else{
            data.map((item) => {
                this.errors[item] = '';
            })
        }
<<<<<<< HEAD
=======
        return false;
>>>>>>> origin/master
    }

    validate({fieldName, value}){
        //If required[0] is string, means regex is missing then throw an error
        if(this.regFields[fieldName].required != ''  && this.regFields[fieldName].required[0] && typeof(this.regFields[fieldName].required[0]) != 'boolean'){
<<<<<<< HEAD
            throw new Error('First array element of REQUIRED should be true/false');
=======
            throw new Error('First array element of REQUIRED should be true/false in field ' + fieldName);
>>>>>>> origin/master
        }

        //If pattern[0] is string, means regex is missing then throw an error
        if(this.regFields[fieldName].pattern  && this.regFields[fieldName].pattern[0] && typeof(this.regFields[fieldName].pattern[0]) != "object"){
<<<<<<< HEAD
            throw new Error('First array element of PATTERN should be regex');
=======
            throw new Error('First array element of PATTERN should be regex in field ' + fieldName);
>>>>>>> origin/master
        }

        //If required is there but Message is not there then throw an error
        if(
            this.regFields[fieldName].required
            &&
            this.regFields[fieldName].required[0] != false
            && 
            (this.regFields[fieldName].required[1] == undefined || this.regFields[fieldName].required[1] == '')
        )
        {
<<<<<<< HEAD
            throw new Error('Please enter message for REQUIRED');
=======
            throw new Error('Please enter message for REQUIRED for field ' + fieldName);
>>>>>>> origin/master
        }

        //If pattern is there but Message is not there then throw an error
        if(
            this.regFields[fieldName].pattern
            && 
            (this.regFields[fieldName].pattern[1] == undefined || this.regFields[fieldName].pattern[1] == '')
        )
        {
<<<<<<< HEAD
            throw new Error('Please enter message for PATTERN');
        }

=======
            throw new Error('Please enter message for PATTERN for field ' + fieldName);
        }

        //If length is there but Message is not there then throw an error
        if(
            this.regFields[fieldName].length
            && 
            (this.regFields[fieldName].length[1] == undefined || this.regFields[fieldName].length[1] == '')
        )
        {
            throw new Error('Please enter message for Length for field ' + fieldName);
        }

        //If length value is 0 then throw an error
        if(
            this.regFields[fieldName].length
            && 
            this.regFields[fieldName].length[0] <= 0
        )
        {
            throw new Error('Length should be greater than zero: '+ fieldName);
        }

        

>>>>>>> origin/master
        const isRequired = this.regFields[fieldName].required[0];
        const requiredMsg = this.regFields[fieldName].required[1];

        const pattern = 
            this.regFields[fieldName].pattern && this.regFields[fieldName].pattern[0] 
            ? 
                this.regFields[fieldName].pattern[0] 
            : 
                null

        const patternMsg =
            this.regFields[fieldName].pattern && this.regFields[fieldName].pattern[1] 
            ? 
                this.regFields[fieldName].pattern[1] 
            : 
                null

<<<<<<< HEAD
        //If field is not required but the value is empty then remove the errors
        if(!isRequired && value == ''){
            this.errors[fieldName] = '';
            this.fieldsValue[fieldName] = value;
=======
        const length = this.regFields[fieldName].length && this.regFields[fieldName].length[0];
        const lengthMsg = this.regFields[fieldName].length && this.regFields[fieldName].length[1] 
            ? 
                this.regFields[fieldName].length[1] 
            : 
                null

        //If field is not required but the value is empty then remove the errors
        if(!isRequired && value == ''){
            this.errors[fieldName] = '';
            this.fieldsValue[fieldName] = '';
>>>>>>> origin/master
            return;
        } //If field is required but the value is empty then return required message
        else if(isRequired && (value == '' || value == null || value == undefined)){
            this.errors[fieldName] = requiredMsg;
            return;
        }   

        
        const regex = new RegExp(pattern)
        //checking the Regex
        if(pattern != null && !regex.test(value)){
            this.errors[fieldName] = patternMsg;
            return;
        }
<<<<<<< HEAD
=======
        else if(this.regFields[fieldName].length && (value.length > length || value.length < length) ){
            this.errors[fieldName] = lengthMsg;
            return;
        }
>>>>>>> origin/master
        else{
            this.errors[fieldName] = '';
        }
        this.fieldsValue[fieldName] = value;
    }

    handleSubmit(e, onSubmit){
        e.preventDefault();
        
        let err = 0;

        Object.keys(this.errors).map((item) => {
            if(this.fieldsValue[item] == '' && this.regFields[item].required[0] == true){
                err++;
                this.errors[item] = this.regFields[item].required[1];
            }
            else if(this.errors[item] != ''){
                err++;
            }
        })

        if(err > 0){
            return false;
        }
        
        return onSubmit(this.fieldsValue);
    }
}