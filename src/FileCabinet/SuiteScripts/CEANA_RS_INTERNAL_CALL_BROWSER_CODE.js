require(['N/https','N/url'],(https, url)=>{

        var strRESTletUrl = url.resolveScript({
                scriptId: 'customscript_ceana_devshare_rs_int_call',
                deploymentId: 'customdeploy_ceana_devshare_rs_int_call'
        });
        console.log("URL: " + strRESTletUrl);

        var objGETHeaders = new Object();
        objGETHeaders["Content-Type"] = "application/json";

        var objGETResponse = https.get({
                headers: objGETHeaders,
                url: strRESTletUrl
        });
        console.log("Code: " + objGETResponse.code);
        console.log("Body: " + objGETResponse.body);
        console.log(objGETResponse);


});