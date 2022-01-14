/**
 * @NApiVersion 2.1
 */
define(['N/email', 'N/file', 'N/record', 'N/render'],
    /**
     * @param{email} email
     * @param{file} file
     * @param{record} record
     * @param{render} render
     */
    (email, file, record, render) => {

        const sendNonTransactionEmail = (pRecId) => {

            var objPDFFile = render.create();
            objPDFFile.setTemplateByScriptId({
                scriptId: 'CUSTTMPL_COMP_FORM_43'
            });

            var objComplianceRecord = record.load({
                type: 'customrecord_stg_comp',
                id: pRecId
            })
            objPDFFile.addRecord({
                record: objComplianceRecord,
                templateName: 'record',
            });

            var objPDF = objPDFFile.renderAsPdf();
            objPDF.name = "Non-Transaction Form.pdf"

            email.send({
                attachments: [objPDF]
            })
        }
        return {sendNonTransactionEmail}

    });
