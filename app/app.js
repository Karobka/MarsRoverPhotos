"use strict";
var roverChoice;
var cameraChoice;
var usersolarDay;
var maxsolarDay;
$(document).ready(function() {

    //event listener for curiosity radio button
    $("#curiosity").click(function() {
        assignRoverChoice();
        getMaxsol(roverChoice);
        $("#camera-choices").children().remove();
        $("#camera-choices, #solar-day").attr('disabled',false);
        $("#camera-choices").append(
            "<option value='all'>" + "All Cameras" + "</option>" +
            "<option value='fhaz'>" + "Front Hazard Avoidance Camera" + "</option>" +
            "<option value='rhaz'>" + "Rear Hazard Avoidance Camera" + "</option>" +
            "<option value='mast'>" + "Mast Camera" + "</option>" +
            "<option value='chemcam'>" + "Chemistry and Camera Complex" + "</option>" +
            "<option value='mahli'>" + "Mars Hand Lens Imager" + "</option>" +
            "<option value='mardi'>" + "Mars Descent Imager" + "</option>" +
            "<option value='navcam'>" + "Navigation Camera" + "</option>" +
            "<option value='pancam'>" + "Panoramic Camera" + "</option>" +
            "<option value='minites'>" + "Miniature Thermal Emission Spectrometer" + "</option>"
        )
    });
    //Adding cameras shared by both opportunity and spirit to drop-down choices
    function sharedCameras(){
        $("#camera-choices").append(
            "<option value='all'>" + "All Cameras" + "</option>" +
            "<option value='fhaz'>" + "Front Hazard Avoidance Camera" + "</option>" +
            "<option value='rhaz'>" + "Rear Hazard Avoidance Camera" + "</option>" +
            "<option value='navcam'>" + "Navigation Camera" + "</option>" +
            "<option value='pancam'>" + "Panoramic Camera" + "</option>" +
            "<option value='minites'>" + "Miniature Thermal Emission Spectrometer" + "</option>"
        )
    };
    //event listener for clicking opportunity and spirit radio buttons
    $("#opportunity, #spirit").click(function() {
        assignRoverChoice();
        getMaxsol(roverChoice);
        $("#camera-choices").children().remove();
        $("#camera-choices, #solar-day").attr('disabled', false);
        sharedCameras();
    });
    
    //update roverChoice with current selection
    function assignRoverChoice() {
        roverChoice = $("input:radio[name=inlineRadioOptions]:checked").val();
    }
    
    //update cameraChoice with current selection
    function assignCameraChoice() {
        cameraChoice = $("#camera-choices").val();
    }

    //update usersolarDay with input
    function updateusersolarDay() {
        usersolarDay = $(".solar-day").val();
    }

    //update placeholder text with max solar day value of selected rover
    function updatePlaceholder(maxsolarDay) {
        $(".solar-day").attr('placeholder', 'Enter number from 0 to ' + maxsolarDay);
    }

    //function to get max_sol value from endpoint for selected rover
    function getMaxsol (roverChoice) {
        var maxparams = {
            rover: roverChoice,
            api_key: 'I4dfNHxd1LPVg6P96qNQlu9cJNz50UNBIAyR2LXO'
        };
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?sol=1&api_key=' + maxparams.api_key
        }).done(function(dateresults) {
            //update maxsolarDay with endpoint value
            maxsolarDay = dateresults.photos[0].rover.max_sol;
            console.log(maxsolarDay);
            updatePlaceholder(maxsolarDay);
        });
    }

    $("#picGetterForm").submit(function(event) {
        event.preventDefault();
        $(".feedback").children().remove();
        $("#pic-results").children().remove();
        assignCameraChoice();
        getImages(roverChoice, cameraChoice);
        
    });
     


    function getImages(roverChoice, cameraChoice) {
        var params = {
            rover: roverChoice,
            sol: null,
            camera: cameraChoice,
            page: 1,  //how do I get multiple pages of results?
            api_key: 'I4dfNHxd1LPVg6P96qNQlu9cJNz50UNBIAyR2LXO'
        };
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?sol=' + null + '&camera=' + cameraChoice + '&api_key=' + params.api_key
        }).done(function(results) {
            $.each(results.photos, function(i, photos) {
                console.log(photos.img_src);
                $("#pic-results").append(
                "<img src=" + photos.img_src + ">"
                );
            });
        }).fail(function(jqXHR, errors){
            $(".feedback").children().remove();
            $(".feedback").append(
                "<div class='alert alert-warning col-md-2 col-md-offset-2' role='alert'>" +
                "<p>" + errors + "</p>" +
                "</div"  //error if endpoint returns {"errors":"No Photos Found"}
                );
        });
        
    }
    function findImages(picobjects) {
        var picResults = picResults.find(picobjects.img_src)
    }
    function displayImages(photos) {
        $("#pic-results").children().remove();
        $("#pic-results").append(
            "<img src=" + photos + ">"
        );
    }





});