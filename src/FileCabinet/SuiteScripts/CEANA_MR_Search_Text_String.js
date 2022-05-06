/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/record', 'N/search', 'N/file'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, file) => {

        const getInputData = (inputContext) => {

            var folderSearchObj = search.create({
                type: "folder",
                filters:
                    [
                        ["file.filetype","anyof","JAVASCRIPT"]
                    ],
                columns:
                    [
                        search.createColumn({
                            name: "name",
                            join: "file"
                        }),
                        search.createColumn({
                            name: "internalid",
                            join: "file"
                        })
                    ]
            });
            var searchResultCount = folderSearchObj.runPaged().count;

            var arrRet = new Array();

            folderSearchObj.run().each(function(result){
                var fileId = result.getValue({
                    name: "internalid",
                    join: "file"
                });

                arrRet.push(fileId);
                return true;
            });

            log.debug("arrRet",arrRet);

            return arrRet;

        }

        const map = (mapContext) => {

            //log.debug("MAP RAW", mapContext);

            //Custom115
            var searchText = "custentity_stg_cust_subsidiarylimit";
            //var searchText = "custrecord_stg_stageclaim_fulfilled";

            try{

                //var mapData = JSON.parse(mapContext.value);
                var fileId = parseInt(mapContext.value);
                //log.debug("fileId",fileId);

                var fileObj = file.load({
                    id: fileId
                })

                //log.debug("fileObj loaded",fileObj);

                var fileContent = fileObj.getContents().toLowerCase()
                //log.debug("fileContent",fileContent);

                var intSearchTextFound = fileContent.indexOf(searchText.toLowerCase());
                //log.debug("intSearchTextFound",intSearchTextFound);

                //log.debug('DEBUG', 'Text ' + (intSearchTextFound > 0 ? 'FOUND' : 'NOT found') + ' on File ' + fileObj.getName() + ' (' + fileId + ')');

                if(intSearchTextFound != -1) {
                    //log.debug("intSearchTextFound",intSearchTextFound);
                    log.debug("Found on file: ", fileObj.name);
                }

            }catch(e){
                log.debug( 'DEBUG', 'ERROR While loading File ID: ' + fileId, (e instanceof nlobjError ? e.getCode() + '<br />' + e.getDetails() : e.toString()) );
            }

        }
        const reduce = (reduceContext) => {

        }

        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });
