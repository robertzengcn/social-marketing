import {Buckemailremotedata} from "@/entityTypes/emailmarketingType";
import nodemailer from 'nodemailer';

export class EmailSend {

    public async send(param:Buckemailremotedata) {
        const totalfilter:string[]=[]
            param.Emailfilterlist.forEach((item)=>{
                
            })

        //loop receiver
        param.Receiverlist.forEach((item)=>{

            //check if item in filter list
            

            // if (param.Emailfilterlist.includes(item.address)) {

            // }
            //get random one from email send list
            const randomEmailservice = this.getRandomItem(param.Emailservicelist);

            //get random email template
            const randEmailtpl=this.getRandomItem(param.Emailtemplist);


        })
    }
      // Function to get a random item from an array
      private getRandomItem(array: any[]): any {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

}