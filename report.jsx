var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
var ReactDOM = require('react-dom')


var rows = require('./data.json')

var dimensions = [
  // "value" can be the key of what you want to group on
  {title: 'Date', value: 'date'},
  // "value" can also be function that returns what you want to group on
  {
    title: 'Host',
    value: function(row) { return row.host },
    template: function(value) {
      return '<a href="http://google.com/?q='+value+'">'+value+'</a>'
    }
  }
]

var reduce = function(row, memo) {
  // the memo object starts as {} for each group, build it up
  //console.log(row);
  //memo.impression = 0;
  if(row.type == "impression"){
  	memo.impression = (memo.impression || 0) + 1
  }
  if(row.type == "load"){
  	memo.loads = (memo.loads || 0) + 1
  }
  if(row.type == "display"){
  	memo.displays = (memo.displays || 0) + 1
  }
  
  //memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount)
  // be sure to return it when you're done for the next pass
  return memo
}

var calculations = [
  // "value" can be the key of the "memo" object from reduce
  // "template" changes the display of the value, but not sorting behavior
  {
    title: 'Impressions', value: 'impression',
    template: function(val, row) { return val }
  },
  {
    title: 'Loads', value: 'loads',
    template: function(val, row) { return val }
  },
  {
    title: 'Displays', value: 'displays',
    template: function(val, row) { return val }
  },
  {
    title: 'Load Rate',
    // "value" can also be a function
    value: function(memo) { return memo.loads*100 / memo.impression },
    template: function(val, row) { return  val.toFixed(1) + '%' },
    // you can also give a column a custom class (e.g. right align for numbers)
    className: 'alignRight'
  },
  {
    title: 'Disply Rate',
    // "value" can also be a function
    value: function(memo) { return memo.displays*100 / memo.loads },
    template: function(val, row) { return  val.toFixed(1) + '%' },
    // you can also give a column a custom class (e.g. right align for numbers)
    className: 'alignRight'
  }
]

ReactDOM.render(
  <ReactPivot rows={rows}
    dimensions={dimensions}
    reduce={reduce}
    calculations={calculations}
    activeDimensions={['Date','Host']} />,
  document.body
)


// module.exports = createReactClass({
//   render () {
//     return <div>Report</div>
//   }
// })
