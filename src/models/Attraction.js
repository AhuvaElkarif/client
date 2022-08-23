function Attraction(id, managerId, categoryId, name, description, address, image, price, isAvailable, status,
                     minParticipant, maxParticipant, timeDuration, fromAge, tillAge,  daysToCancel, date ){
    this.id= id;
    this.managerId= managerId;  
    this.categoryId = categoryId; 
    this.name= name;
    this.description= description;
    this.address= address;
    this.image= image;
    this.price= price;
    this.isAvailable= isAvailable;
    this.status= status;
    this.minParticipant =minParticipant;
    this.maxParticipant =maxParticipant;
    this.timeDuration =timeDuration;
    this.fromAge =fromAge;
     this.tillAge =tillAge;
    this.daysToCancel =daysToCancel;
    this.date=date;
 }
 
 export default Attraction;

