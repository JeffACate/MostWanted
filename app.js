"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let traits = getTraits();
      searchResults = searchByTraits(traits,people);
      break;
      default:
      app(people); // restart app
      break;
  }
  mainMenu(searchResults, people);
}
// Call the mainMenu function ONLY after you find the SINGLE person you are looking for

  function getTraits(){
    let traits = [];
    let done = false;
    while(!done){
      let trait = promptFor("What is the trait to search? type 'done' to exit", chars).toLowerCase();
      if(trait !== "done"){
        traits.push(trait);
      }
      else{
        break;
      }
    }
    return traits;
  }

  function searchByTraits(traits,people){

    let gender;
    let height;
    let weight;
    let occupation;
    let eye;

    let choosenTraits = [];
    let traitDetails = [];
    for(let i = 0; i < traits.length; i++){
      switch(traits[i]){
        case 'gender':
          gender = promptFor("What is the gender? (male/female)", chars);
          choosenTraits.push("gender");
          traitDetails.push(gender);
          break;
        case 'height':
          height = promptFor("What is the height in inches?", chars);
          choosenTraits.push("height");
          traitDetails.push(height);
          break;
        case 'weight':
          weight = promptFor("What is the weight in lbs?", chars);
          choosenTraits.push("weight");
          traitDetails.push(weight);
          break;
        case 'occupation':
          occupation = promptFor("What is the occupation?", chars);
          choosenTraits.push("occupation");
          traitDetails.push(occupation);
          break;
        case 'eye color':
          eye = promptFor("What is the eye color?", chars)
          choosenTraits.push("eye");
          traitDetails.push(eye);
          break;
        default:
          prompt("Not a valid trait");
          break;
      }
    }
    
    let peopleSearched = [];
    let peopleFound = people.filter(function(person){
      let hasGender = true;
      let hasHeight = true;
      let hasWeight = true;
      let hasJob = true;
      let hasEye = true;
      for(let i = 0; i < choosenTraits.length; i++){
        
          switch(choosenTraits[i]){
            case 'gender':
              if(person.gender === traitDetails[i]){
                 hasGender = true;
                 continue;
              }
              else{
                 hasGender = false;
                 break;
              }
            case 'height':
              if(person.height === traitDetails[i]){
                 hasHeight = true;
                 continue;
              }
              else{
                 hasHeight = false;
                 break;
              }
            case 'weight':
              if(person.weight === traitDetails[i]){
                 hasWeight = true;
                 continue;
              }
              else{
                 hasWeight = false;
                 break;
              }
            case 'occupation':
              if(person.occupation === traitDetails[i]){
                 hasJob = true;
                 continue;
              }
              else{
                 hasJob = false;
                 break;
              }
            case 'eye':
              if(person.eyeColor === traitDetails[i]){
                 hasEye = true;
                 continue;
              }
               else{
                 hasEye = false;
                 break;
              }
          }
      } 
      if(hasGender && hasHeight && hasWeight && hasJob && hasEye){
        peopleSearched.unshift(person);
      }
      return peopleSearched; 
    })
    peopleFound = peopleSearched;
    return peopleFound 
  }
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function display3People(){
  let people = { first :  data[8], second : data[9], third :  data[10]};
  displayPeople(people);
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color, gender, 
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse;

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
