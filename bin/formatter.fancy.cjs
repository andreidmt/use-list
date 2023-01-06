/* eslint-env node */
/* eslint-disable jsdoc/require-example */
/** @typedef {import("./types.cjs").Diagnosis} Diagnosis */
/** @typedef {import("./types.cjs").DiagnosisStats} DiagnosisStats */

const C = require("./lib.colors.cjs")

/**
 * @param {Diagnosis} input
 * @returns {string}
 */
const formatDiagnosis = ({ name, pass, errors = [] }) => {
  const title = `${pass ? C.PASS_TAG : C.FAIL_TAG} ${C.highlightFileName(name)}`
  const output = [title]

  if (!pass) {
    const messages = errors.map(error => {
      if (!error.row) {
        return `  ${error.message}`
      }

      const position = C.fgGray(`(${error.row}:${error.column})`)

      return `  ${position} ${error.message}`
    })

    output.push(...messages, "")
  }

  return output.join("\n")
}

/**
 * @param {DiagnosisStats} input
 */
const formatStats = ({ passCount, failCount }) => {
  const title = `${C.bold(C.fgWhiteSecondary("Summary"))}`
  const filesFail = C.fgRedSecondary(`${failCount} failed`)
  const filesPass = C.fgGreenSecondary(`${passCount} passed`)
  const filesTotal = `${failCount + passCount} total`

  return `${title}: ${filesFail}, ${filesPass}, ${filesTotal}`
}

module.exports = {
  formatDiagnosis,
  formatStats,
}
