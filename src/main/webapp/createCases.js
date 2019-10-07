var LOGIN_URL = '/rest-api/login';
var CASE = '/rest-api/case';
var ASSIGN_USER_TO_CASE = '/rest-api/privilege';
var DISCO_EXTRACTION = CASE + '/discoverExtractions/';
var USER = '/rest-api/user';

var CONNOR_PATH = "\\\\qaforensic-lab/qaforensic-lab/UAE/Scipts and Demos/Terrorism/Old Trafford Bombing/Extractions/Connor.ufdr";

var serverAddress;
var username; 

$(document).ready(function() {
	$("#submit").click(function(){
		
	});
});


var createUserRequestData = 
{
	"entities": [
	{
	  fullName: "placeholder",
	  firstName: "placeholder",
	  lastName: "placeholder",
	  username: "placeholder",
	  "email": "X@X.COM",
	  "password": "Ohads111!",
	  "isDisabled": "false",
	  "role": "1",
	  "isEnabled": true,
	  "confirmPassword": "Ohads111!",
	  "type": "user"
	}]
}

var discoverExtractionRequestData = 
{
	"path": CONNOR_PATH,
	"fileTypes": {
		"zip": true,
		"dd": true,
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
	"caseId": null
}

var createCaseRequestData = 
{
	entities: [
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
        mediaCategories: [
          "Face"
        ],
        caseCreationFileTypes: {
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
        "path": [
        	CONNOR_PATH
        ]
      },
      "extractions": [
          {
              "type": "extraction",
              "ownerId": "b894b927-5e4a-48f3-8c7f-bcde89b52bf9",
              "ufd": CONNOR_PATH,
              "category": "Mobile",
              "mainPath": CONNOR_PATH
            }
      ],
      "extractionsOwners": {
          "b894b927-5e4a-48f3-8c7f-bcde89b52bf9": {
              "id": "b894b927-5e4a-48f3-8c7f-bcde89b52bf9",
              "type": "extractionOwner",
              "isExpanded": true,
              "name": "Person 1",
              "color": "#98a5ab",
              "keepName": false
            }
      },
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
	      "name": "placeholder",
		  "email": "placeholder",
	      "firstName": "ohads",
	      "lastName": "redred",
	      "fullName": "ohads redred",
	      "isNew": true,
	      "isDeleted": false,
	      "role": "INVESTIGATOR",
	      "entityId": "placeholder",
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

/**
 * the flow: first generate case name prefix. it will be the prefix for all cases, and the suffix is the counter. example for case
 * name is: X0df1_1. 'X0df1' is the prefix. we also use this prefix for the new-created user, which its name is 'user_X0df1'.
 * after we generate this String, we create the user. If the action is successful, we start a loop to create the cases, and for each case 
 * we assign the user that was created. So the user is unique for this test. Each test has its own user. 
 * @returns
 */
function createCasesHandler()
{
	serverAddress = getServerAddress();
    var numCasesToCreate = $("#num_cases_to_create").val();
	let caseName = Math.random().toString(36).substring(2, 7);
    
	username = 'user_' + caseName;
	createUser(username);
	
	for(i=0; i < numCasesToCreate; ++i)
	{
		createCaseProcess(caseName + '-' + i);
	}
}

function createCaseProcess(caseName)
{
	discoverExtraction(caseName);
}

function createUser(userName)
{
	createUserRequestData.entities[0].username = userName; 
	createUserRequestData.entities[0].fullName = userName; 
	createUserRequestData.entities[0].firstName = userName; 
	createUserRequestData.entities[0].lastName = userName; 

    $.ajax({
		url: serverAddress + USER,
        type: 'POST',
        data: JSON.stringify(createUserRequestData),
        dataType: 'text',    //The type of data that you're expecting back from the server
        contentType: 'application/json',    //When sending data to the server, use this content type
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, jqXHR){
            var createUserResponse = JSON.parse(response);
           	console.log('user was created.' + createUserResponse);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error creating user: ' + textStatus)
        }
    });
}

function discoverExtraction(caseName)
{
    $.ajax({
		url: serverAddress + DISCO_EXTRACTION,
        type: 'POST',
        data: JSON.stringify(discoverExtractionRequestData),
        dataType: 'text',    //The type of data that you're expecting back from the server
        contentType: 'application/json',    //When sending data to the server, use this content type
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, jqXHR){
            var discoverExtractionsResponse = JSON.parse(response);
           	createCase(discoverExtractionsResponse, caseName);
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.log('error discoverExtraction: ' + textStatus);
            alert('error discoverExtraction: ' + textStatus)
        }
    });
}


function createCase(discoverExtractionsResponse, caseName)
{
	var ownerId = discoverExtractionsResponse.extractions[0].ownerId;

    createCaseRequestData.entities[0].name = 
    createCaseRequestData.entities[0].number = caseName;
    createCaseRequestData.entities[0].extractions.ownerId = ownerId; 

    $.ajax({
		url: serverAddress + CASE,
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
            	console.log('case ' + caseName + ' created suXessfully. id = ' + parseResponse.entities[0].id);
            	assignUserToCase(parseResponse);
            }
            else
            {
            	console.log('error creating case ' + caseName + ': ' + parseResponse.entities[0].error.message);
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
	var caseName = caseObj.entities[0].name;

	caseAssignmentRequestData.entities[0].entityId = caseId;
	caseAssignmentRequestData.entities[0].name = username;
	
    $.ajax({
		url: serverAddress + ASSIGN_USER_TO_CASE,
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
            	console.log('user assigned to case ' + caseName);
            }
            else
            {
                alert('error assigning user to case: ' + parseResponse.entities[0].error.message)
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.error(jqXHR.responseText);
        	console.error('error assigning user to case.')
        }
    });

}