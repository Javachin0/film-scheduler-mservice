const shuffle = (array)=> {
  for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  return array;
}
const getResponseHeaders = () => {
  return {
      'Access-Control-Allow-Origin': '*'
  }
}

const parseDays = (body) =>  {
  if(isNaN(body.days)){
      const error = new Error('Number of days is not a number');
      error.statusCode = 400;
      throw error;
  }
  return body.days;
}

const parseFilms = (body) =>  {  
  if(body.films.length < 7){   
      const error = new Error('Catelogue is too short. Must be above 7');     
      error.statusCode = 400;
      throw error; 
  }
  return body.films;
}

const cleanSchedule = (string) => {
  const quotRgx = "((?:\s)'|'(?:,))";
  const result = string.replace(quotRgx, '"');
  return result;
}

module.exports = {
  shuffle,
  getResponseHeaders,
  parseDays,
  parseFilms,
  cleanSchedule
};
