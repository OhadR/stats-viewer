var SERVER_ADDRESS = 'http://localhost:8080/rest-api';
var LOGIN_URL = SERVER_ADDRESS + '/login';
var CREATE_CASE = SERVER_ADDRESS + '/case/';
var ASSIGN_USER_TO_CASE = SERVER_ADDRESS + '/privilege';

$(document).ready(function() {
	$("#submit").click(function(){
		
	});
});

var createCaseRequestData = 
{
	"entities": [
    {
      "type": "case",
      "configuration": {
        "autoIndex": true,
        "publicPersons": false,
        "ownerMergeEnabled": false,
        "showTranslations": true,
        "parseDocuments": false,
        "parseUncategorizedDocuments": false,
        "paths": [
          "C:\\Program Files\\Cellebrite Mobile Synchronization\\UFED Analytics Server\\DataDir\\Extractions"
        ],
        "mediaCategories": [
          "Face"
        ],
        "caseCreationFileTypes": {
          "dd": true,
          "zip": true,
          "txt": true,
          "001": true,
          "img": true,
          "ufd": true,
          "tar": true,
          "xml": true,
          "csv": true,
          "e01": true,
          "ufdr": true,
          "xls": true
        },
        "watchlists": null,
        "adhoc-watchlists": null,
        "path": []
      },
      "extractions": [],
      "extractionsOwners": {},
      "creationDate": "2019-09-15T14:40:46.165Z",
      "status": "0",
      "name": "testApi2",
      "number": "TestNumber2"
    }
  ]
};

var caseAssignmentRequestData = 
{
	"entities": [
	    {
	      "type": "privilege",
	      "error": null,
	      "name": "ohads",
	      "email": "a@b.com",
	      "firstName": "ohads",
	      "lastName": "redred",
	      "fullName": "ohads redred",
	      "isNew": true,
	      "isDeleted": false,
	      "role": "INVESTIGATOR",
	      "entityId": "b46a9fde-b5a4-41f4-aa7a-5cdaaf7ac3fd",
	      "entityType": "case"
	    }
	]
}

function init() 
{
//    login();
}

function login()
{
	var requestData = {
			username: 'ayala',
			password: 'q1w2e3r4!',
			submit: 'Login'
		};

	$.ajax({
		url: LOGIN_URL,
		type: 'POST',
		data: requestData,
        dataType: 'text',    //The type of data that you're expecting back from the server
        contentType: 'application/x-www-form-urlencoded',    //When sending data to the server, use this content type
		success: function(response, textStatus, jqXHR){
			alert('login OK');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('login error');
		}
	});
}

function createCases()
{
	let caseName = Math.random().toString(36).substring(2, 7);

    var distanceKM = $("#distance").val();
    
    createCaseRequestData.entities[0].name = 
    createCaseRequestData.entities[0].number = caseName;

    $.ajax({
		url: CREATE_CASE,
        type: 'POST',
        data: JSON.stringify(createCaseRequestData),
        dataType: 'text',    //The type of data that you're expecting back from the server
        contentType: 'application/json',    //When sending data to the server, use this content type
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, jqXHR){
            var parseResponse = JSON.parse(response);
            if(parseResponse.hasErrors === false)
            {
            	assignUserToCase(parseResponse);
            }
            else
            {
                alert('error creating case: ' + parseResponse.entities[0].error.message)
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error creating case: ' + textStatus)
        }
    });
}

function assignUserToCase(caseObj)
{
	var caseId = caseObj.entities[0].id;

	caseAssignmentRequestData.entities[0].entityId = caseId;
    $.ajax({
		url: ASSIGN_USER_TO_CASE,
        type: 'POST',
        data: JSON.stringify(caseAssignmentRequestData),
        dataType: 'text',    //The type of data that you're expecting back from the server
        contentType: 'application/json',    //When sending data to the server, use this content type
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, jqXHR){
            var parseResponse = JSON.parse(response);
            if(parseResponse.hasErrors === false)
            {
            	console.log('user assigned to case ' + caseId);
            }
            else
            {
                alert('error assigning user to case: ' + parseResponse.entities[0].error.message)
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error assigning user to case: ' + textStatus)
        }
    });

}