import { BettererFileTest } from "@betterer/betterer"
import fs from "fs"

function removeSpecificString(theString: string) {
  return new BettererFileTest(async (filepaths, result) => {
    await Promise.all(
      filepaths.map(async (filepath) => {
        const contents = fs.readFileSync(filepath, "utf8").toString()
        const index = contents.indexOf(theString)
        if (index !== -1) {
          const file = result.addFile(filepath, contents)
          file.addIssue(
            index,
            index + enzymeString.length,
            "We are trying to migrate away from Enzyme. Try using `renderWithWrappersTL` instead."
          )
        }
      })
    )
  })
}

const enzymeString = 'from "enzyme"'
export function removeEnzyme() {
  return new BettererFileTest(async (filepaths, result) => {
    await Promise.all(
      filepaths.map(async (filepath) => {
        const contents = fs.readFileSync(filepath, "utf8").toString()
        const index = contents.indexOf(enzymeString)
        if (index !== -1) {
          const file = result.addFile(filepath, contents)
          file.addIssue(
            index,
            index + enzymeString.length,
            "We are trying to migrate away from Enzyme. Try using `renderWithWrappersTL` instead."
          )
        }
      })
    )
  }).include("**/*.tests.tsx")
}

const migrationString =
  "// @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏"
export function removeMigrationComments() {
  return removeSpecificString(migrationString).include()
}

///circle needs `betterer ci`
