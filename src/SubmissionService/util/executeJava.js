const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { checkCorrectness, createCodeFile, createInputFile, cleanupJava } = require('./helper');

exports.executeJava = async (code, testcases, timeLimit, memory) => {
    try {
        await createCodeFile('Solution.java', code);
        try {
            const { stdout, stderr } = await exec('javac util/code/Solution.java');
        }
        catch(error) {
            return {
                result: 'Failed',
                message: 'Compile Time Error',
                time: 0,
                log: error.stderr.split('\r\n')
            }
        }

        let maxTime = 0;

        for(const testcase of testcases) {
            await createInputFile(testcase.input);
            const timeBeforeExecution = new Date().getTime();

            try {
                const { stdout, stderr } = await exec('java -cp util/code Solution < util/code/input.txt > util/code/output.txt', {timeout: timeLimit, maxBuffer: memory*1024*1024});

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
                    log: ['Your Code fails on Few Test Cases']
                }
            }
        }

        return {
            result: 'Accepted',
            message: 'Correct Answer',
            time: maxTime,
            log: ['Your Code Passes all Test Cases']
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}