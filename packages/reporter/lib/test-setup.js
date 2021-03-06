let chai = require('chai')
let jsdom = require('jsdom').jsdom
let sinonChai = require('sinon-chai')

let exposedProperties = ['window', 'navigator', 'document']

/* global document */
// http://airbnb.io/enzyme/docs/guides/jsdom.html
global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})
global.navigator = {
  appVersion: 'node',
  userAgent: 'node.js',
}
global.requestAnimationFrame = (fn) => {
  return fn()
}
global.cancelAnimationFrame = () => {}

// enzyme, and therefore chai-enzyme, needs to be required after
// global.navigator is set up (https://github.com/airbnb/enzyme/issues/395)
const enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')
const chaiEnzyme = require('chai-enzyme')

enzyme.configure({ adapter: new EnzymeAdapter() })

chai.use(chaiEnzyme())
chai.use(sinonChai)
global.expect = chai.expect
