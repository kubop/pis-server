/**
 * Compares two dates
 * 
 * @param {string} a 20-05-2020
 * @param {string} b 31-01-2020
 * 
 * @returns {number} 
 *  0 - if dates are equal
 *  1 - if a > b
 *  -1 - if a < b 
 */
var compareDates = function(a, b) {
  if (a === b) {
    return 0
  }

  const a_day = +a.split('-')[0]
  const a_month = +a.split('-')[1]
  const a_year = +a.split('-')[2]

  const b_day = +b.split('-')[0]
  const b_month = +b.split('-')[1]
  const b_year = +b.split('-')[2]

  if (b_year > a_year) return -1
  if (b_year < a_year) return 1

  if (b_month > a_month) return -1
  if (b_month < a_month) return 1

  if (b_day > a_day) return -1
  if (b_day < a_day) return 1
}

module.exports = {
  compareDates
}
