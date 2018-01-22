let moment = require('moment');
// Jan 1st 1970 00:00:00 am (UTC)

let date = moment();
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am u/p
console.log(date.format('h:mm a'));