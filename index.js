'use strict'

var assert = require('assert-ok')
var isIos = require('is-ios')
var isAndroid = require('is-android')
var iOsVersion = require('ios-version/current')

var separator = detectSeparator()

module.exports = function smsLink (options) {
  assert(options && (options.phone || options.body), 'phone or body must be provided')

  var phone = options.phone || ''
  var body = encodeURIComponent(options.body || '')
  return 'sms:' + phone + (body ? separator + 'body=' + body : '')
}

function detectSeparator () {
  var defaultSeparator = '%2F&'
  var androidSeparator = '?'

  
  if (isAndroid) return androidSeparator
  if (isIos && iOsVersion) {
    return iOsVersion.major < 8 ? ';' : '&'
  }

  return defaultSeparator
}
