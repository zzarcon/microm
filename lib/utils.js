/**
 * Returns the same value but the first letter in Uppercase
 * @param  {String} str 
 * @return {String}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = {
  capitalize: capitalize
};