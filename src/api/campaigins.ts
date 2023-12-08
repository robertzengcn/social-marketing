export const getCampaignlist = (data: any) =>(
    async () => {
        const result =await window.api.invoke("campaign:list", data); 
        return result; 
    }
)