const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { checkCorrectness, createCodeFile, createInputFile } = require('./helper');

exports.executePython = async (code, testcases, timeLimit, memory) => {
    try {
        await createCodeFile('Solution.py', code);

        let maxTime = 0;

        for(const testcase of testcases) {
            await createInputFile(testcase.input);
            const timeBeforeExecution = new Date().getTime();

            try {
                const { stdout, stderr } = await exec('python util/code/Solution.py < util/code/input.txt > util/code/output.txt', {timeout: timeLimit, maxBuffer: memory*1024*1024});

                const timeAfterExecution = new Date().getTime();

                const timeToExecute = timeAfterExecution - timeBeforeExecution;

                maxTime = Math.max(maxTime, timeToExecute);
            }
            catch(error) {
                const timeAfterExecution = new Date().getTime();

                const timeToExecute = timeAfterExecution - timeBeforeExecution;

                if(error.killed) {
                    return {
                        result: 'Failed',
                        message: 'Time Limit Exceded',
                        time: timeToExecute,
                        log: ['Time Limit Exceded on Hidden Test Cases, Try to optimized your code']
                    }
                }
                else {
                    return {
                        result: 'Failed',
                        message: 'Run Time Error',
                        time: timeToExecute,
                        log: error.stderr.split('\r\n')
                    }
                }
            }

            const result = await checkCorrectness(testcase.output);
            if(!result) {
                return {
                    result: 'Failed',
                    message: 'Wrong Answer',
                    time: maxTime,
                    log: ['Your Code fails on Hidden Test Cases']
                }
            }
        }

        return {
            result: 'Accepted',
            message: 'Correct Answer',
            time: maxTime,
            log: ['Your Code Passes all Hidden Test Cases']
        }
    }
    catch(error) {
        throw error;
    }
}