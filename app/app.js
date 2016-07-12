"use strict";
var roverChoice;
var cameraChoice;
$(document).ready(function() {

    //event listener for curiosity radio button
    $("#curiosity").click(function() {
        assignRoverChoice();
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

    $("#picGetterForm").submit(function(event) {
        event.preventDefault();
        $("#pic-results").children().remove();
        assignCameraChoice();
        getImages(roverChoice, cameraChoice);
        //displayImages();
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
            $("#pic-results").append(
                "<p class='col-md-3 col-md-offset-4'>" + errors + "</p>"  //error if endpoint returns {"errors":"No Photos Found"}
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