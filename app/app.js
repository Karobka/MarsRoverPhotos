"use strict";

$(document).ready(function() {
    $("#curiosity").click(function() {
        $("#camera-choices").children().remove();
        $("#camera-choices").attr('disabled',false);
        $("#camera-choices").append(
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
            "<option>" + "Front Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Rear Hazard Avoidance Camera" + "</option>" +
            "<option>" + "Navigation Camera" + "</option>" +
            "<option>" + "Panoramic Camera" + "</option>" +
            "<option>" + "Miniature Thermal Emission Spectrometer" + "</option>"
        )
    };
    $("#opportunity, #spirit").click(function() {
        $("#camera-choices").children().remove();
        $("#camera-choices").attr('disabled', false);
        sharedCameras();  
    });




});