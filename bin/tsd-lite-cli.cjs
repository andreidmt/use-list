#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable jsdoc/require-example */

/** @typedef {import("./types.cjs").Diagnosis} Diagnosis */

const fs = require("node:fs")
const path = require("node:path")
const tsdLite = require("tsd-lite")

const { formatStats, formatDiagnosis } = require("./formatter.fancy.cjs")

/**
 * @param {string} filePath
 * @returns {Diagnosis}
 */
const runTestFile = filePath => {
  const absolutePath = path.resolve(process.cwd(), filePath.trim())
  const relativeToCwd = path.relative(process.cwd(), absolutePath)

  if (!fs.existsSync(absolutePath)) {
    process.stderr.write(`File not found: ${absolutePath}\n`)
    process.exit(1)
  }

  const result = tsdLite.default(absolutePath)

  return {
    name: relativeToCwd,
    pass: result.tsdResults.length === 0,
    assertionCount: result.assertionsCount,
    errors: result.tsdResults.map(error => {
      if (!error.file) {
        return {
          message: error.messageText.toString(),
        }
      }

      const position = error.file.getLineAndCharacterOfPosition(
        error.start ?? 0
      )

      return {
        message: error.messageText.toString(),
        row: position.line + 1,
        column: position.character + 1,
      }
    }),
  }
}

process.stdin.on("data", data => {
  const files = data.toString().trim().split("\n")
  const stats = files
    .map(file => {
      const diagnosis = runTestFile(file)
      const output = formatDiagnosis(diagnosis)

      if (diagnosis.pass) {
        process.stdout.write(`${output}\n`)
      } else {
        process.stderr.write(`${output}\n`)
      }

      return diagnosis
    })
    .reduce(
      (acc, diagnosis) => ({
        passCount: acc.passCount + (diagnosis.pass ? 1 : 0),
        failCount: acc.failCount + (diagnosis.pass ? 0 : 1),
      }),
      { passCount: 0, failCount: 0 }
    )

  process.stdout.write(`\n${formatStats(stats)}\n`)

  process.exit(stats.failCount === 0 ? 0 : 1)
})
