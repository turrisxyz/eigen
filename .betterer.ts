import { BettererTest, BettererFileTest } from "@betterer/betterer"
import lineColumn from "line-column"
import { smaller } from "@betterer/constraints"
import fs from "fs"
import glob from "glob"

// const files = glob.sync("**/*")
// .filter((filename) => !filename.includes("node_modules"))
// .filter((filename) => !filename.includes("__generated__"))
// .filter((filename) => !filename.endsWith(".lock"))
// .filter((filename) => !filename.endsWith(".png"))
// .filter((filename) => !filename.endsWith(".webp"))
// .filter((filename) => !filename.endsWith(".jpg"))
// .filter((filename) => !filename.endsWith(".jar"))

// export const removeEnzyme11 = () => {
//   const getNumberOfFilesImportingEnzyme = () => {
//     return files
//       .map((f) => {
//         console.log(f)
//         return f
//       })
//       .filter((filename) => filename.includes(".tests.tsx"))
//       .filter((filename) => {
//         const content = fs.readFileSync(filename).toString()
//         return content.includes('from "enzyme"')
//       }).length
//   }

//   return new BettererTest({
//     test: () => getNumberOfFilesImportingEnzyme(),
//     constraint: smaller,
//     goal: 0,
//   })
// }

export const removeEnzyme = () =>
  new BettererFileTest(async (filepaths, result) => {
    await Promise.all(
      filepaths.map(async (filepath) => {
        const contents = fs.readFileSync(filepath, "utf8").toString()
        const index = contents.indexOf('from "enzyme"')
        if (index !== -1) {
          const { line, column } = lineColumn(contents, { origin: 0 }).fromIndex(index)
          const file = result.addFile(filepath, contents)
          file.addIssue(line, column, `lol ${index}`)
        }
      })
    )
  }).include("**/*.tests.tsx")

// export const removeMigrationComments = () => {
//   const getNumberOfMigrationComments = () => {
//     return files
//       .map((f) => {
//         console.log(f)
//         return f
//       })
//       .filter((filename) => {
//         console.log(filename)
//         const content = fs.readFileSync(filename).toString()
//         return content.includes(
//           "// @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏"
//         )
//       }).length
//   }

//   return new BettererTest({
//     test: () => getNumberOfMigrationComments(),
//     constraint: smaller,
//     goal: 0,
//   })
// }
