
function addZero(i){
  if(i < 10){i = "0" + i;}
  return i; }

const holiday = new Map([
  // Test [key, value]
  // ["Staff-shortage", "29/10/2022"],
  // -------------------------------------------------------------------------------------ADD HOLIDAY----

  // 2023
  ["GOOD FRIDAY 07/04",         "07/04/2023"],
  ["EASTER MONDAY 10/04",       "10/04/2023"],
  ["ANZAC DAY 25/04",           "25/04/2023"],
  ["KING'S BIRTHDAY 05/06",     "05/06/2023"],
  ["MATARIKI 14/07",            "14/07/2023"],
  ["LABOUR DAY 23/10",          "23/10/2023"],
  // ["CHRISTMAS EVE 24/12",       "24/12/2023"],
  ["CHRISTMAS 25/12",           "25/12/2023"],
  ["BOXING DAY 26/12",          "26/12/2023"],
  // ----------------------------------------------------------------------------------------------------
]);

// const testHoliday = new Map([
//   [{day:"LABOUR DAY", msg:"happy labour day"},          "24/10/2022"],
//   [{day:"CHRISTMAS", msg:"merry christmas"},           "25/12/2022"],
//   [{day:"BOXING DAY", msg:"yay its boxing day"},          "26/12/2022"],
//   [{day:"CHRISTMAS HOLIDAY", msg:"happy christmas holiday xD"},   "27/12/2022"],
//   // 2023
//   [{day:"NEW YEAR'S DAY", msg:"happy new years 2023"},      "01/01/2023"],
//   [{day:"Day after NEW YEAR'S", msg:"happy new years holiday"},"02/01/2023"],
//   [{day:"NEW YEAR'S HOLIDAY", msg:"happy new years holiday :D"},  "03/01/2023"],
// ])

// testHoliday.forEach(function(value, key) {
//   alert(key.msg);
// });

let isWeekday, isSaturday = false;
let openClosed, barColour = "";
// ____________TRUE WHENEVER TEMP CLOSING THE SHOP_________________________________________________________
let tempClosing = false;

// init map for this week
let thisWeek = new Map();

// Add current week's dates, and matching click message into the map object
function setClickMessages(){
  $("#show").load("#show");

  let d = new Date();
  let currentDate = addZero(d.getDate()) + "/" + addZero((d.getMonth()+1)) + "/" + d.getFullYear();
  let gettingHours = d.getHours();
  let gettingDays = d.getDay();

  thisWeek.clear();
  for (let index = 0; index < 7; index++) {
    let cMessage = "";
    let date = new Date();
    date.setDate(d.getDate() + index);
    
    switch (date.getDay()) {
      case 0:
        if((date.getDate() + "" + (date.getMonth()+1))=="53"){
          cMessage = "Sun &nbsp&nbsp [ Round the Bays 2023 ] &nbsp&nbsp 10am - 2pm"; }
        else{
          cMessage = "Sun &nbsp&nbsp closed"; 
        }
        break;
      case 1:
        cMessage = "Mon &nbsp&nbsp 8am - 5pm"; break;
      case 2:
        cMessage = "Tue &nbsp&nbsp 8am - 5pm"; break;
      case 3:
        cMessage = "Wed &nbsp&nbsp 8am - 5pm"; break;
      case 4:
        cMessage = "Thu &nbsp&nbsp 8am - 5pm"; break;
      case 5:
        cMessage = "Fri &nbsp&nbsp 8am - 5pm"; break;
      case 6:
        cMessage = "Sat &nbsp&nbsp 9am - 3pm"; break; }
        
    thisWeek.set(date, cMessage); 
    if(index == 0){ openClosed = cMessage + "<br/><br/>";}
  }

  // day is neither saturday nor sunday AND time is at or later than 8 AND earlier than 5.
  isWeekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 17);
  isSaturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);

  // if today is Sunday march 5th, the banner will be green with "OPEN", between 10am to 2pm
  // if(((d.getDate() + "" + (d.getMonth()+1))=="53") && gettingHours >= 10 && gettingHours < 14){
  //   isWeekday = true;
  //   isSaturday = true;
  // }

  // day is saturday AND time is at or later than 9 AND earlier than 3.
  // isSaturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);
  // non holiday message
  openClosed += (isWeekday || isSaturday)? '- we are currently OPEN -' : '- we are currently CLOSED -';
  // non holiday colour
  barColour = (isWeekday || isSaturday)? '#4c6439' : '#643a39';

  // foreach to check if there is a holiday in this week
  holiday.forEach(function(value, key){     // key "LABOUR day"     value "24/10/2022"
    thisWeek.forEach(function(value2, key2){// key "Tue Oct 18..."  value "click Message!"
      // convert date object into matching syntax for comparison
      let key2Date = addZero(key2.getDate()) + "/" + addZero((key2.getMonth()+1)) + "/" + key2.getFullYear();
      // if a date of current week matches to a holiday
      if (value == key2Date) {
        let newMessage = value2.split("&nbsp&nbsp");
        if(!newMessage[0].includes(key)){
          if(key=="Staff-shortage"){
            thisWeek.set(key2, newMessage[0] + "&nbsp&nbsp closed");  
          }
          else{
            thisWeek.set(key2, newMessage[0] + "&nbsp&nbsp closed" + " &nbsp|&nbsp " + key.slice(0, key.length-6));  
          }
        }
      } 
    });
    // if today is holiday
    if(value === currentDate){ 
      barColour = '#643a39'; 

      // edit prompt holiday message
      switch (key) {
        case "CHRISTMAS 25/12":
          openClosed = "<i class=\"fa-solid fa-socks\"></i> MERRY CHRISTMAS <i class=\"fa-solid fa-gift\"></i><br /> Wishing everyone a truly wonderful Christmas filled with peace and love!<br /><br />" 
          + "- we are currently CLOSED -"; break;

        case "CHRISTMAS EVE 24/12":
          openClosed = "<i class=\"fa-solid fa-snowman\"></i> MERRY CHRISTMAS EVE <i class=\"fa-solid fa-candy-cane\"></i><br /><br />" 
          + "- we are currently CLOSED -"; break;
  
        case "NEW YEAR'S DAY 01/01":
          openClosed = "<i class=\"fa-solid fa-champagne-glasses\"></i> HAPPY NEW YEARS " + value.slice(6,10) 
          + " <i class=\"fa-solid fa-champagne-glasses\"></i><br />Best wishes for the holidays, and for health and happiness throughout the coming year!<br /><br />" 
          + "- we are currently CLOSED -"; break;

        case "GOOD FRIDAY 07/04":
          openClosed = "IT'S GOOD FRIDAY!<br /><br />" + "- we are currently CLOSED -"; break;

        case "Staff-shortage":
          openClosed = "Unfortunately, we are closed today due to staff shortage.<br />We will reopen on monday 31st October.<br /><br />" + "- we are currently CLOSED -"; break;

        default:
          openClosed = "HAPPY " + key.slice(0, key.length-6) + "!<br /><br />" + "- we are currently CLOSED -"; break;
      }

      // ----------------------------------------------------------------------EDIT holiday MESSAGE!!----
      // Wishing everyone a safe and happy ...
      // Happy ... !
      // It's ... Thanks you for your hard work!
      // Wishing you a truly wonderful ... filled with peace and love
      // Happy HOLIDAYS!
      // Best wishes for the Holidays, and for health and happiness throughout the coming year
      // WISHING YOU A MERRY CHRISTMAS and a HAPPY NEW YEAR

      // clickMessage = "Wishing everyone a safe and happy " + key + "!";
      // ------------------------------------------------------------------------------------------------
      } });

  let counter = 0;
  thisWeek.forEach(function(value, key){
    // alert(value);
    document.getElementById("whatDay" + counter).innerHTML = value;
    //  + " " + Math.random();
    counter += 1; });
  
  // if(tempClosing == true && !openClosed.includes('Unfortunately')){
  //   openClosed = 'Unfortunately, we will be closed this [...]<br />due to staff shortage.<br /><br />' + openClosed;
  // }
  
  document.getElementById("closeOrOpened").innerHTML = openClosed;
  document.querySelector('.hours').style.backgroundColor = barColour;
}
setClickMessages(thisWeek, openClosed, barColour);
setInterval(()=>setClickMessages(), 10000);