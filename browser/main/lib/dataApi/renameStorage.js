const _ = require('lodash')

/**
 * @param {String} key
 * @param {String} name
 * @return {Object} Storage meta data
 */
function renameStorage (key, name) {
  if (!_.isString(name)) return Promise.reject(new Error('Name must be a string.'))

  let cachedStorageList
  try {
    cachedStorageList = JSON.parse(localStorage.getItem('storages'))
    if (!_.isArray(cachedStorageList)) throw new Error('invalid storages')
  } catch (err) {
    console.log('error got')
    console.error(err)
    return Promise.reject(err)
  }
  let targetStorage = _.find(cachedStorageList, {key: key})
  if (targetStorage == null) return Promise.reject('Storage')

  targetStorage.name = name
  localStorage.setItem('storages', JSON.stringify(cachedStorageList))

  return Promise.resolve(targetStorage)
}

module.exports = renameStorage
