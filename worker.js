const { Worker } = require('bullmq')
const child_process = require('child_process')
const db = require("./models");

const redisConfiguration = {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
}

const process_jobs = async (job) => {

    // fileNames and fileContent are arrays
    const { modelId, userId, fileNames, fileContent } = job.data

    console.log(`processing ${job.id}`) // converti job.id to int and use it to save the result

    // check if this job has been removed at the end 
    
    // filepath: data filepath
    try {
        let result = child_process.execSync(`conda run -n bot-annotation python3 python-scripts/${modelId}.py ${FilePath}`)
        result = result.toString()[0]
        console.log(result)

        await db.EaAnnotationValue.create({
            FieldName: EaProjectId,
            Value: result,
            EaAnnotationId: EaAnnotationId
        })

        db.Result.update(
            {
                Value: result,
                Status: 'Done',
                DataSaved: 1,
            },
            {
                where: {
                    Id: modelId
                }
            }).catch((err) => console.log(err))
    } catch (e) {
        console.error(e)
    }


}

const worker = new Worker('mlqueue', process_jobs, redisConfiguration)

worker.on('completed', job => {
    console.info(`${job.id} has completed!`);
})

worker.on('failed', (job, err) => {
    console.error(`${job.id} has failed with ${err.message}`);
});