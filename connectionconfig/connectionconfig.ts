import mongoose from 'mongoose'


export const connection = async()=>{
    try{
        const connected= await mongoose.connect(process.env.MONGODB_URL!)     //here the ! sign makes sure that the url value exists.
        if(connected){
        console.log('mongodb connection successful')}
        else{
            console.log('mongodb connection unsuccessful')

        }
    }catch(Error:any){
        console.log(Error.message);
        process.exit(1);
    }

}