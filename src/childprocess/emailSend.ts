import { Buckemailremotedata } from "@/entityTypes/emailmarketingType";
import nodemailer from 'nodemailer';
import { convertVariableInTemplate } from "@/views/utils/emailFun"
import { EmailTemplatePreviewdata} from "@/entityTypes/emailmarketingType"

export class EmailSend {

    public async send(param: Buckemailremotedata,successCallback?:(receiver: string,title:string,content:string) => void | undefined | null,errorCallback?:(receiver: string,info:string,title:string,content:string) => void | undefined | null): Promise<any> {
        const totalfilter: string[] = []
        param.Emailfilterlist.forEach((item) => {
            item.filter_details.forEach((filterdetail) => {
                totalfilter.push(filterdetail.content)
            })
        })

        //loop receiver
        param.Receiverlist.forEach((item) => {

            //check if item in filter list
            if (totalfilter.includes(item.address)) {
                return
            }
            param.Emailfilterlist.forEach((filterlist) => {
                filterlist.filter_details.forEach((filterdetail) => {
                    const regex = new RegExp(filterdetail.content);
                    if (regex.test(item.address)) {
                        return;
                    }
                })
            })

            //get random one from email send list
            const randomEmailservice = this.getRandomItem(param.Emailservicelist);

            //get random email template
            const randEmailtpl = this.getRandomItem(param.Emailtemplist);
            const previewData: EmailTemplatePreviewdata = {
                TplTitle: randEmailtpl.TplTitle,
                TplContent: randEmailtpl.TplContent,
                Sender: randomEmailservice.from,
                Receiver: item.address
            }
            //replace variable in email template
            const emailTpldata = convertVariableInTemplate(previewData);
            //send email
            // Create a transporter object
            const transporter = nodemailer.createTransport({
                host: randomEmailservice.host,
                port: Number(randomEmailservice.port) || 0,
                secure: randomEmailservice.ssl, // true for 465, false for other ports
                auth: {
                    user: randomEmailservice.from, // your SMTP username
                    pass: randomEmailservice.password, // your SMTP password
                }
            } as nodemailer.TransportOptions);
            // Configure the mailoptions object
            const mailOptions = {
                from: randomEmailservice.from,
                to: item.address,
                subject: randEmailtpl.TplTitle,
                text: randEmailtpl.TplContent
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Error:', error);
                    if(errorCallback){
                        errorCallback(item.address,error.message,randEmailtpl.TplTitle,randEmailtpl.TplContent)
                    }
                } else {
                    console.log('Email sent:', info.response);
                    if(successCallback){
                    successCallback(item.address,randEmailtpl.TplTitle,randEmailtpl.TplContent)
                    }
                }
            });

        })
    }
    // Function to get a random item from an array
    private getRandomItem<Type>(array: Array<Type>): Type {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

}