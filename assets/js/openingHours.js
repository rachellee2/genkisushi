function addZero(i){
  if(i < 10){i = "0" + i;}
  return i;
}
const d = new Date();
const currentDate = addZero(d.getDate()) + "/" + addZero((d.getMonth()+1)) + "/" + d.getFullYear();

const gettingHours = d.getHours();
const gettingDays = d.getDay();

const holiday = new Map([
  // Test [key, value]
  // ["TEST day", "17/10/2022"],
  // -------------------------------------------------------------------------------------ADD HOLIDAY----



  // ----------------------------------------------------------------------------------------------------
  ["LABOUR day",         "24/10/2022"],
  ["CHRISTMAS",          "25/12/2022"],
  ["BOXING DAY",         "26/12/2022"],
  // 2023
  ["NEW YEAR'S",           "1/1/2023"],
  ["Day after NEW YEAR'S", "2/1/2023"],
  ["WAITANGI day",         "6/2/2023"],
  ["GOOD FRIDAY",          "7/4/2023"],
  ["EASTER MONDAY",       "10/4/2023"],
  ["ANZAC day",           "25/4/2023"],
  ["KING'S BIRTHDAY",      "5/6/2023"],
  ["MATARIKI",            "14/7/2023"],
  ["LABOUR day",         "23/10/2023"],
  ["CHRISTMAS",          "25/12/2023"],
  ["BOXING day",         "26/12/2023"]
]);

let isHoliday = false;
// day is neither saturday nor sunday AND time is at or later than 8 AND earlier than 5.
let isWeekday = ((gettingDays != 6 && gettingDays != 0) && gettingHours >= 8 && gettingHours < 17);
// day is saturday AND time is at or later than 9 AND earlier than 3.
let isSaturday = (gettingDays == 6 && gettingHours >= 9 && gettingHours < 15);
// non holiday message
let openClosed = (isWeekday || isSaturday)? 'we are currently OPEN' : 'we are currently CLOSED';
// non holiday colour
let barColour = (isWeekday || isSaturday)? '#4c6439' : '#643a39';

let clickMessage = "TBA";
switch (gettingDays) {
  case 0:
    clickMessage = "Sunday &nbsp&nbsp Closed";
    break;
  case 1:
    clickMessage = "Monday &nbsp&nbsp 8am - 5pm ";
    break;
  case 2:
    clickMessage = "Tuesday &nbsp&nbsp 8am - 5pm";
    break;
  case 3:
    clickMessage = "Wednesday &nbsp&nbsp 8am - 5pm";
    break;
  case 4:
    clickMessage = "Thursday &nbsp&nbsp 8am - 5pm";
    break;
  case 5:
    clickMessage = "Friday &nbsp&nbsp 8am - 5pm";
    break;
  case 6:
    clickMessage = "Saturday &nbsp&nbsp 9am - 3pm";
    break;
}
// foreach to check if currentDate is in holiday's values
holiday.forEach(function(value, key){
  if(value === currentDate){
    // holiday message
    openClosed = 'we are currently CLOSED ' + '<br />' + key;

    // ----------------------------------------------------------------------EDIT holiday MESSAGE!!----
    // Wishing everyone a safe and happy ...
    // Happy ... !
    // It's ... Thanks you for your hard work!
    // Wishing you a truly wonderful ... filled with peace and love
    // Happy HOLIDAYS!
    // Best wishes for the Holidays, and for health and happiness throughout the coming year
    // WISHING YOU A MERRY CHRISTMAS and a HAPPY NEW YEAR

    clickMessage = "Wishing everyone a safe and happy " + key + "!";
    // ------------------------------------------------------------------------------------------------
    
    isHoliday = true;
    barColour = '#4b0700';
  }
  else{
    isHoliday = false;
  }
})
document.querySelector('.closeOrOpened').innerHTML = openClosed;
document.querySelector('.hours').style.backgroundColor = barColour;
document.querySelector('.whatDay').innerHTML = clickMessage;




// if(gettingDays == 0){
//   clickMessage = "Sunday | Closed";
// }
// else if(gettingDays == 6){
//   clickMessage = "Saturday | 9am - 3pm";
// }
// else{
//   clickMessage = "Monday - Friday | 8am - 5pm";
// }