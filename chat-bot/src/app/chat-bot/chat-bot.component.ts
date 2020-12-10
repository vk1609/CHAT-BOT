import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chat-bot.service';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  constructor(private api :ChatbotService) { }
// public stat:status;
  databaseData=[];
  data:any=[];

  //array to store cart
  cart:any=[];

  //tos store user information
  userInfo:any=[];

  ngOnInit(): void {
    this.createMessage("chatbot", "Hi! Please select one option to yum!.");
    this.createButton(this.options1,1);
    
  }
  

  // main function it gets called when send button is pressed
  message(message:any){
    this.data=message.split('');
console.log(this.data);
(<HTMLInputElement>document.getElementById('customer_input')).value='';

if(message==''){
alert("It was blank");
window.location.reload();
}else
if(message=='hi'||message=='hello'){
  alert("Hey hi");
  window.location.reload();
  

}else{
  alert("Hope you are fine.I didnt Understand the message");
  
            window.location.reload();

}

  }
  createImage(image:string,url:string){
    var img = document.createElement('img');
    img.alt="image";
    img.className="message-image";
    img.src=url;
    document.getElementById('message').appendChild(img);

  }


    createMessage(userName:string,message1:string){

 var userinput=document.createElement('div');
 userinput.className="chatarea-inner "+userName;
          
          userinput.innerHTML=message1;
         // userinput.id="user";
          document.getElementById('message').appendChild(userinput);

  }

  // options to display
     options1=["Order Pizza😁","Track Order😊", "Exit"];
options2=["Veg Pizza🥕🍅","Non Veg Pizza🍗🥕🍅"] ;
options3=["Looking for another pizza🙃","Confirm it🙁"];

     // To create button
  createButton(data:any=[],k:number){
     
     for(let i=0;i<data.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML=data[i];
      btn.id="user1";
      if(k==1)
      btn.addEventListener("click", (e:Event) => this.startOrdering(i));
      else if(k==2)
      btn.addEventListener("click", (e:Event) => this.displayPizzaList(i));

      else if(k==3)
      btn.addEventListener("click", (e:Event) => this.displayOrderdescription(i));

      btn.className="chatarea-inner btn";
      document.getElementById('message').appendChild(btn);
     }
    }

    //function to process first options list i.e. Order Pizza😁 , track your order options 
        startOrdering(i:any){
       if(i==0){
       /******* */ 
this.removeElement();
this.removeElement();
this.removeElement();

           this.createMessage("user","Order Pizza😁");
           

        this.createButton(this.options2,2);
         
      
       }
       else if(i==1){
         this.removeElement();
         this.removeElement();
         this.removeElement();
         this.createMessage("user","Track Order😊");
          this.searchId();
       }else if(i==2){
         window.location.reload();
       }
       
     }
      //function to process second  options list i.e. Veg Pizza🥕🍅 , Non Veg Pizza🍗🥕🍅 options 
     
     displayPizzaList(i:any){
       if(i==0){
       
          this.removeElement();
          this.removeElement();

          this.createMessage("user","Veg Pizza🥕🍅");
          this.veg();
         console.log("for Veg Pizza🥕🍅");

         
       // this.massagedetail()
       // this. buttonnew1()
       }
       else if(i==1){

        this.removeElement();
        this.removeElement();

        this.createMessage("user","Non Veg Pizza🍗🥕🍅");
        this.nonVeg();

        console.log("for Non Veg Pizza🍗🥕🍅"); 
       }
      }

  
pushToOrderList(i:number,type:string){

  if(type=="veg"){
  for(let j=0;j<this.vegList.length;j++){
  this.removeElement();
  }
  var str='<br><b>'+this.vegList[i].name+'</b>';
  this.createMessage('user',str);
  this.cart.push(this.vegList[i]);

}
    else if (type=="nonveg"){

      for(let j=0;j<this.nonVegList.length;j++){
  this.removeElement();
  }
  var str='<br><b>'+this.nonVegList[i].name+'</b>';
  this.createMessage('user',str);
  this.cart.push(this.nonVegList[i]);
      console.log(this.cart);
    }

    this.createButton(this.options3,3);
}

          // This function is for "Looking for another pizza🙃 and Confirm it🙁" processes
          displayOrderdescription(i:number){

            this.removeElement();
        this.removeElement();
        if(i==0){
                this.createButton(this.options2,2);

        }else{
            var str="Your Orders :";
            var totalcost=0;
            for(let j=0;j<this.cart.length;j++){
              str+='<br><b>'+(j+1)+": "+this.cart[j].name;
              totalcost+=this.cart[j].cost;
            }
            str+='</b><br> Total cost is: <b>'+totalcost+ '</b>';
            this.createMessage("chatbot",str);
             this.createMessage("chatbot","Enter Your description");
             this.userdetailsInput();

        }

}

     removeElement(){
    const toRemove=  document.getElementById("user1");
    toRemove.parentElement.removeChild(toRemove);
     }
      
     removeElementById(str:string){

    const toRemove=  document.getElementById(str);
    toRemove.remove();
     }
 vegList=[{
  name:"Whole Wheat Veggie Pizza",description:"A wonderful crust layered with herbed tomato sauce and toppings encourages my family of six to dig right in to this low-fat main course.",cost:250},
                   {name:"Tomato-Onion Phyllo Pizza",description:"With a delicate crust and lots of lovely tomatoes on top, this dish is a special one to serve to guests. I make it often when fresh garden tomatoes are in season. It freezes well unbaked.",cost:275},
                   {name:"Spinach and Artichoke Pizza",description:"My from-scratch pizza has a whole wheat crust flavored with beer. Top it with spinach, artichoke hearts and tomatoes, then add chicken or ham and fresh basil if you want to include meat. ",cost:300}
];

nonVegList=[{name:"Jerked Chicken Pizza",description:"Indulge in the mouth-watering flavours of spicy Jamaican jerk chicken chunks atop a cheesy pizza, baked to perfection! 'Jerk' refers to the style of cooking wherein the meat, mainly chicken",cost:300},
                     {name:"Meet Lover Pizza",description:"This one is an absolute crowd pleaser! With a healthy pizza base made with millet and tapioca flour along with soy milk, meat lovers pizza strikes a perfect balance of flavour with tantalising tomato sauce, oodles of mozzarella cheese topped with a host of meats including pepperoni, chicken salami, salami Milano and prosciutto.",cost:325},
                    {name:"Pepporonie Pizza",description:"Dig in to America's classic pepperoni pizza at home! Pepperoni is one of the most popular American salamis that is bright red, soft, slightly smoky and is most often used as a pizza topping.",cost:300}];

veg(){
        
     for(let i=0;i<this.vegList.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML='<b>'+this.vegList[i].name+'</b><br><p>'+this.vegList[i].description+'<br><br>  cost: '+this.vegList[i].cost+'<br></p>';
      btn.id="user1";
      btn.addEventListener("click", (e:Event) => this.pushToOrderList(i,"veg"));
      btn.className="chatarea-inner btn";
      document.getElementById('message').appendChild(btn);
     }
    }
     
    nonVeg(){
      for(let i=0;i<this.nonVegList.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML='<b>'+this.nonVegList[i].name+'</b><br><p>'+this.nonVegList[i].description+'<br><br>  cost: '+this.nonVegList[i].cost+'<br></p>';
      btn.id="user1";
      btn.addEventListener("click", (e:Event) => this.pushToOrderList(i,"nonveg"));
      btn.className="chatarea-inner btn";
      document.getElementById('message').appendChild(btn);
    }
}

  userdetailsInput(){
    
    var mainDiv=document.createElement('div');
    mainDiv.id="userDiv";
    mainDiv.className="chatarea-inner ";
    document.getElementById('message').appendChild(mainDiv);

    var inputTag1=document.createElement('input');
    inputTag1.placeholder="Enter Name";
    inputTag1.id="name";
    document.getElementById("userDiv").appendChild(inputTag1);

    
    var inputTag2=document.createElement('input');
     inputTag2.placeholder="Enter contact no";
    inputTag2.id="mobile";
    document.getElementById("userDiv").appendChild(inputTag2);

    
    var inputTag3=document.createElement('input');
     inputTag3.placeholder="Enter address";
    inputTag3.id="address";
    document.getElementById("userDiv").appendChild(inputTag3);

    var button=document.createElement('button');
    button.id="user1";
    button.innerHTML="Submit";
    button.className="chatarea-inner btn";
     button.addEventListener("click", (e:Event) => this.userInput());
     document.getElementById("userDiv").appendChild(button);

    
  }

  userInput(){
 
    var name=(<HTMLInputElement>document.getElementById('name')).value;
    var mobile=(<HTMLInputElement>document.getElementById('mobile')).value;
    var address=(<HTMLInputElement>document.getElementById('address')).value;
    var test=Number(mobile);

    if(name.length==0 || mobile.length==0 || address.length==0){
       this.removeElementById("userDiv");
      this.createMessage("chatbot","Please enter all the details");
        this.userdetailsInput();
    }
    else{

    if(mobile.length!==10 || isNaN(test) ){
      this.removeElementById("userDiv");
       
        this.createMessage("chatbot","Pleas enter correct mobile number");
        this.userdetailsInput();
    }
    else{
  this.userInfo[0]=name;
  this.userInfo[1]=mobile;
  this.userInfo[2]=address;
      console.log("User description"+ name, mobile,address);
    this.removeElementById('userDiv');
    
    
    //show user details
      var str ="Your details: "+'<br> Name: <b>'+this.userInfo[0]+'</b><br> Contact No: <b>'+this.userInfo[1]+'</b><br> Address: <b>'+this.userInfo[2]+'</b>'
      this.createMessage("chatbot",str);


      //show order details
      var random=Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
      var orderId=random;
      
      var str='Your Order Id: '+orderId+"<br> Your Orders description:";
      var totalcost=0;
            for(let j=0;j<this.cart.length;j++){
              str+='<br><b>'+(j+1)+": "+this.cart[j].name;
              totalcost+=this.cart[j].cost;
            }
            str+='<br> Total cost is: <b>'+totalcost;
            this.createMessage("chatbot",str);
              this.cart=[];
            this.createMessage("chatbot" ,  "You confirmed the order. Hurray! ");

            /************************************/
           this.api.userdetailsIntoDb(this.userInfo[0],Number(this.userInfo[1]),this.userInfo[2]).subscribe( data =>{
          
        },
        error => console.log(error));
           /******************************* */
           //to put order id and status in database
           this.api.orderIntoDb(Number(orderId)," ").subscribe( data =>{
        },
        error => console.log(error));

        this.createMessage("chatbot","That's It want to go further?")
        this.createButton(this.options1,1);
  }
    }
  }
  searchId(){
    this.createMessage("chatbot"," Enter Order Id")
     var mainDiv=document.createElement('div');
    mainDiv.id="mainOrderInputDiv";
    mainDiv.className="chatarea-inner ";
    document.getElementById('message').appendChild(mainDiv);

    var inputTag1=document.createElement('input');
    inputTag1.placeholder=" Order Id";
    inputTag1.id="orderId";
    document.getElementById("mainOrderInputDiv").appendChild(inputTag1);

    var button=document.createElement('button');
    button.id="user1";
    button.innerHTML="Submit";
    button.className="chatarea-inner btn";

    
     button.addEventListener("click", (e:Event) => this.takeOrderId());
     document.getElementById("mainOrderInputDiv").appendChild(button);

  }
  
  takeOrderId(){
    var orderId=(<HTMLInputElement>document.getElementById('orderId')).value;
    this.removeElementById("mainOrderInputDiv");
  
    console.log(orderId);
     
    this.api.getOrderStatus(orderId).subscribe(data=>{
      
      
      this.createMessage("chatbot",'Your order status is: <br>'+"  "+data[0].status);
      this.createMessage("chatbot","That's It want to go further?");
        this.createButton(this.options1,1);},error=>console.log(error));
    

        
     
  }


}



