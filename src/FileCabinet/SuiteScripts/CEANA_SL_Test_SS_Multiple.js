/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/task'],
    /**
 * @param{task} task
 */
    (task) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            for(var i = 0; i < 5; i++){
                var schdTask = task.create({
                    taskType: task.TaskType.SCHEDULED_SCRIPT,
                    scriptId: 'customscript411'
                });

                var schdTaskId = schdTask.submit();
                log.debug("onRequest schdTaskId",schdTaskId);
            }

        }

        return {onRequest}

    });
