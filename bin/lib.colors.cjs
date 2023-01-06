/* eslint-env node */
/* eslint-disable jsdoc/require-example */

const path = require("node:path")

/** @param {string} input */
const bgRed = input => `\u001B[41m${input}\u001B[0m`

/** @param {string} input */
const bgRedSecondary = input => `\u001B[101m${input}\u001B[0m`

/** @param {string} input */
const bgGreen = input => `\u001B[42m${input}\u001B[0m`

/** @param {string} input */
const bgGreenSecondary = input => `\u001B[102m${input}\u001B[0m`

/** @param {string} input */
const fgBlack = input => `\u001B[30m${input}\u001B[0m`

/** @param {string} input */
const bold = input => `\u001B[1m${input}\u001B[0m`

/** @param {string} input */
const fgRed = input => `\u001B[31m${input}\u001B[0m`

/** @param {string} input */
const fgRedSecondary = input => `\u001B[91m${input}\u001B[0m`

/** @param {string} input */
const fgGreen = input => `\u001B[32m${input}\u001B[0m`

/** @param {string} input */
const fgGreenSecondary = input => `\u001B[92m${input}\u001B[0m`

/** @param {string} input */
const fgGray = input => `\u001B[90m${input}\u001B[0m`

/** @param {string} input */
const fgGraySecondary = input => `\u001B[37m${input}\u001B[0m`

/** @param {string} input */
const fgWhite = input => `\u001B[97m${input}\u001B[0m`

/** @param {string} input */
const fgWhiteSecondary = input => `\u001B[37m${input}\u001B[0m`

/** @param {string} filePath */
const highlightFileName = filePath => {
  const fileName = path.basename(filePath)
  const folderName = path.dirname(filePath)

  return `${fgGraySecondary(folderName)}/${fgWhiteSecondary(bold(fileName))}`
}

const PASS_TAG = bgGreenSecondary(fgBlack(" PASS "))

const FAIL_TAG = bgRedSecondary(fgBlack(" FAIL "))

module.exports = {
  bgRed,
  bgRedSecondary,
  bgGreen,
  bgGreenSecondary,
  fgRed,
  fgRedSecondary,
  fgGreen,
  fgGreenSecondary,
  fgBlack,
  fgGray,
  fgGraySecondary,
  fgWhite,
  fgWhiteSecondary,
  bold,
  highlightFileName,
  PASS_TAG,
  FAIL_TAG,
}
