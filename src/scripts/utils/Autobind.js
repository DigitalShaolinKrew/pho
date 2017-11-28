import is from 'is'

const getAllMethods = ( obj ) => {
  return Object.getOwnPropertyNames( obj )
    .filter( key => is.fn( obj[ key ] ) )
}

const autoBind = ( obj ) => {
  getAllMethods( obj.constructor.prototype ).forEach( mtd => {
    obj[mtd] = obj[mtd].bind( obj )
  } )
}

export default autoBind
