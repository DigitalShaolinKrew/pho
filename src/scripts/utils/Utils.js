import axios from 'axios'

export default class Utils {
  static request ( url ) {
    return axios.get( url )
  }
}
