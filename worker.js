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

    console.log(`processing ${job.id}`)
    console.log(job.data)

    // try {
    //     let result = child_process.execSync(`conda run -n bot-annotation python3 python-scripts/${EaProjectId}.py ${FilePath}`)
    //     result = result.toString()[0]
    //     console.log(result)

    //     await db.EaAnnotationValue.create({
    //         FieldName: EaProjectId,
    //         Value: result,
    //         EaAnnotationId: EaAnnotationId
    //     })

    //     db.EaAnnotation.update(
    //         {
    //             Completed: true,
    //         },
    //         {
    //             where: {
    //                 Id: EaAnnotationId
    //             }
    //         }).catch((err) => console.log(err))
    // } catch (e) {
    //     console.error(e)
    // }


}

const worker = new Worker('mlqueue', process_jobs, redisConfiguration)

worker.on('completed', job => {
    console.info(`${job.id} has completed!`);
})

worker.on('failed', (job, err) => {
    console.error(`${job.id} has failed with ${err.message}`);
});