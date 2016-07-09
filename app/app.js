"use strict";
var roverChoice;
$(document).ready(function() {
    $("#curiosity").click(function() {
        roverChoice = $("input:radio[name=inlineRadioOptions]:checked").val();
        $("#camera-choices").children().remove();
        $("#camera-choices").attr('disabled',false);
        $("#camera-choices").append(
            "<option>" + "All Cameras" + "</option>" +
            "<option>" + "Front Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Rear Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Mast Camera" + "</option>" +
            "<option>" + "Chemistry and Camera Complex" + "</option>" +
            "<option>" + "Mars Hand Lens Imager" + "</option>" +
            "<option>" + "Mars Descent Imager" + "</option>" +
            "<option>" + "Navigation Camera" + "</option>" +
            "<option>" + "Panoramic Camera" + "</option>" +
            "<option>" + "Miniature Thermal Emission Spectrometer" + "</option>"
        )
    });
    function sharedCameras(){
        $("#camera-choices").append(
            "<option>" + "All Cameras" + "</option>" +
            "<option>" + "Front Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Rear Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Navigation Camera" + "</option>" +
            "<option>" + "Panoramic Camera" + "</option>" +
            "<option>" + "Miniature Thermal Emission Spectrometer" + "</option>"
        )
    };
    $("#opportunity, #spirit").click(function() {
        roverChoice = $("input:radio[name=inlineRadioOptions]:checked").val();
        $("#camera-choices").children().remove();
        $("#camera-choices").attr('disabled', false);
        sharedCameras();  
    });
    
    var cameraChoice = $("#camera-choices").val();
    function getImages(roverChoice, cameraChoice) {
        var params = {
            rover: roverChoice,
            earth_date: 'none',
            camera: cameraChoice,
            page: 1,
            api_key: 'I4dfNHxd1LPVg6P96qNQlu9cJNz50UNBIAyR2LXO'
        };
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?earth_date=none&api_key=' + api_key,
        });
        
    }



});