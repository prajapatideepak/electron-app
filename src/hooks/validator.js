export default class Validator{
    
    errors = {};
    regFields = {};
    fieldsValue = {};
    
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
    }

    validate({fieldName, value}){
        //If required[0] is string, means regex is missing then throw an error
        if(this.regFields[fieldName].required != ''  && this.regFields[fieldName].required[0] && typeof(this.regFields[fieldName].required[0]) != 'boolean'){
            throw new Error('First array element of REQUIRED should be true/false');
        }

        //If pattern[0] is string, means regex is missing then throw an error
        if(this.regFields[fieldName].pattern  && this.regFields[fieldName].pattern[0] && typeof(this.regFields[fieldName].pattern[0]) != "object"){
            throw new Error('First array element of PATTERN should be regex');
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
            throw new Error('Please enter message for REQUIRED');
        }

        //If pattern is there but Message is not there then throw an error
        if(
            this.regFields[fieldName].pattern
            && 
            (this.regFields[fieldName].pattern[1] == undefined || this.regFields[fieldName].pattern[1] == '')
        )
        {
            throw new Error('Please enter message for PATTERN');
        }

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

        //If field is not required but the value is empty then remove the errors
        if(!isRequired && value == ''){
            this.errors[fieldName] = '';
            this.fieldsValue[fieldName] = value;
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