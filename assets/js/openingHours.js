
function addZero(i){
  if(i < 10){i = "0" + i;}
  return i; }

const holiday = new Map([
  // Test [key, value]
  ["Staff-shortage", "29/10/2022"],
  // -------------------------------------------------------------------------------------ADD HOLIDAY----
  // ["LABOUR holiday",      "22/10/2022"],
  ["LABOUR DAY",          "24/10/2022"],
  ["CHRISTMAS",           "25/12/2022"],
  ["BOXING DAY",          "26/12/2022"],
  ["CHRISTMAS HOLIDAY",   "27/12/2022"],
  // 2023
  ["NEW YEAR'S DAY",      "01/01/2023"],
  ["Day after NEW YEAR'S","02/01/2023"],
  ["NEW YEAR'S HOLIDAY",  "03/01/2023"],
  // ["AUCKLAND ANNIVERSARY","30/01/2023"],
  // ["WAITANGI DAY",        "06/02/2023"],
  // ["GOOD FRIDAY",         "07/04/2023"],
  // ["EASTER MONDAY",       "10/04/2023"],
  // ["ANZAC DAY",           "25/04/2023"],
  // ["KING'S BIRTHDAY",     "05/06/2023"],
  // ["MATARIKI",            "14/07/2023"],
  // ["LABOUR DAY",          "23/10/2023"],
  // ["CHRISTMAS",           "25/12/2023"],
  // ["BOXING DAY",          "26/12/2023"],
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
let openClosed, barColour = '';
let tempClosing = true;

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
        cMessage = "Sun &nbsp&nbsp closed"; break;
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
        cMessage = "Sat &nbsp&nbsp 9am - 3pm"; break;  }

    
    thisWeek.set(date, cMessage);  }

  // day is neither saturday nor sunday AND time is at or later than 8 AND earlier than 5.
  isWeekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 17);
  // day is saturday AND time is at or later than 9 AND earlier than 3.
  isSaturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);
  // non holiday message
  openClosed = (isWeekday || isSaturday)? '- we are currently OPEN -' : '- we are currently CLOSED -';
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
            thisWeek.set(key2, key + " &nbsp|&nbsp " + newMessage[0] + "&nbsp&nbsp closed");  
          }
        }
      } 
    });
    // if today is holiday
    if(value === currentDate){ 
      barColour = '#643a39'; 

      // edit prompt holiday message
      switch (key) {
        case "CHRISTMAS":
          openClosed = "<i class=\"fa-solid fa-holly-berry\"></i> MERRY CHRISTMAS <i class=\"fa-solid fa-holly-berry\"></i><br /> Wishing everyone a truly wonderful Christmas filled with peace and love!<br /><br />" 
          + "- we are currently CLOSED -"; break;

        case "NEW YEAR'S DAY":
          openClosed = "<i class=\"fa-solid fa-champagne-glasses\"></i> HAPPY NEW YEARS " + value.slice(6,10) 
          + " <i class=\"fa-solid fa-champagne-glasses\"></i><br />Best wishes for the holidays, and for health and happiness throughout the coming year!<br /><br />" 
          + "- we are currently CLOSED -"; break;

        case "Day after NEW YEAR'S":
          openClosed = "HAPPY NEW YEAR'S HOLIDAY!<br /><br />" + "- we are currently CLOSED -"; break;

        case "GOOD FRIDAY":
          openClosed = "IT'S GOOD FRIDAY!<br /><br />" + "- we are currently CLOSED -"; break;
        case "Staff-shortage":
          openClosed = "Unfortunately, we are closed today due to staff shortage.<br />We will reopen on monday 31st October.<br /><br />" + "- we are currently CLOSED -"; break;
        // case "":
        //   openClosed = ; break;
        default:
          openClosed = "HAPPY " + key + "!<br /><br />" + "- we are currently CLOSED -"; break;
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
  
  if(tempClosing == true && !openClosed.includes('Unfortunately')){
    openClosed = 'Unfortunately, we will be closed this Saturday<br />due to staff shortage.<br /><br />' + openClosed;
  }
  document.getElementById("closeOrOpened").innerHTML = openClosed;
  document.querySelector('.hours').style.backgroundColor = barColour;
}
setClickMessages(thisWeek, openClosed, barColour);
setInterval(()=>setClickMessages(), 10000);