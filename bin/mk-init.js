#!/usr/bin/env node

// inquirer.prompt([{
//     type: 'input',
//     name: 'projectName',
//     message: '请输入项目名：',
//     validate(input) {
//       if (!input) {
//         return '项目名不能为空';
//       }
//       if (fse.existsSync(input)) {
//         return '当前目录已存在同名项目，请更换项目名';
//       }
//       return true;
//     }
//   }]);

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

program
 .usage('<template-name> [project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()

// 好比 vue init webpack project-name 的命令一样，第一个参数是 webpack，第二个参数是 project-name
let templateName = program.args[0]
let projectName = program.args[1]
// 小小校验一下参数
if (!tplObj[templateName]) {
 console.log(chalk.red('\n Template does not exit! \n '))
 return
}
if (!projectName) {
 console.log(chalk.red('\n Project should not be empty! \n '))
 return
}

url = tplObj[templateName]

console.log(chalk.white('\n Start generating... \n'))
// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();
// 执行下载方法并传入参数
download (
 url,
 projectName,
 err => {
 if (err) {
  spinner.fail();
  console.log(chalk.red(`Generation failed. ${err}`))
  return
 }
 // 结束加载图标
 spinner.succeed();
 console.log(chalk.green('\n Generation completed!'))
 console.log('\n To get started')
 console.log(`\n cd ${projectName} \n`)
 }
)