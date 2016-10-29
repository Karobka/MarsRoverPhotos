"use strict";
var roverChoice;
var cameraChoice = "all";
var usersolarDay;
var maxsolarDay;
var landedDate;
var totalPics;
var solDay;

//function that has all shared functions & methods for the rovers
function sharedMethods() {
    assignRoverChoice();
    getMaxsol(roverChoice);
    $(".camera-choices").children().remove();
    $(".submitbtn").attr('disabled', false);
    $(".camera-choices").attr('disabled', false);
}

//function that adds cameras shared by both Opportunity and Spirit to drop-down choices
/*function sharedCameras() {
    $(".camera-choices").append(
        "<option value='all'>" + "All Cameras" + "</option>" +
        "<option value='fhaz'>" + "Front Hazard Avoidance Camera" + "</option>" +
        "<option value='rhaz'>" + "Rear Hazard Avoidance Camera" + "</option>" +
        "<option value='navcam'>" + "Navigation Camera" + "</option>" +
        "<option value='pancam'>" + "Panoramic Camera" + "</option>" +
        "<option value='minites'>" + "Miniature Thermal Emission Spectrometer" + "</option>"
    )
};*/

//remove existing info then add info to rover-info div
function updateRoverinfo() {
    $(".rover-info").children().remove();
    $(".rover-info").append(
        "<p>This rover landed on " + landedDate + " and has taken " + totalPics + " photos since then!</p>"
    )
}

//append error message
function errorMessage(error) {
    $(".error-message").children().remove();
    $(".error-message").append("<p class='bg-warning'>" + error + ". Please try a different Solar Day</p>");
}

//update roverChoice with current selection
function assignRoverChoice() {
    roverChoice = $("input:radio[name=inlineRadioOptions]:checked").val();
}

//update cameraChoice with current selection
/*function assignCameraChoice() {
    cameraChoice = $(".camera-choices").val();
}*/

//update usersolarDay with input
function updateusersolarDay() {
    usersolarDay = $(".solar-day").val();
}

//update placeholder text with max solar day value of selected rover
function updatePlaceholder(maxsolarDay) {
    $(".solar-day").attr({
        placeholder: 'Enter number from 0 to ' + maxsolarDay,
        disabled: false
    });
    $(".help_block_days").html("");
    $(".help_block_days").html(
        "Enter from 0 to " + maxsolarDay + "<br>" +
        "Tip: 0 (zero) was the day it landed on Mars, 1 was its first day on Mars, 2 was its second day, and so on.  It hasn't taken pictures everyday so keep trying other days if you get no results."
        );
}

//function to GET max_sol value from endpoint for selected rover
function getMaxsol(roverChoice) {
    var maxparams = {
        rover: roverChoice,
        api_key: 'I4dfNHxd1LPVg6P96qNQlu9cJNz50UNBIAyR2LXO'
    };
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?sol=1&api_key=' + maxparams.api_key
    }).done(function (dateresults) {
        //update maxsolarDay/landedDate/totalPics with endpoint values
        maxsolarDay = dateresults.photos[0].rover.max_sol;
        landedDate = dateresults.photos[0].rover.landing_date;
        totalPics = dateresults.photos[0].rover.total_photos;
        updatePlaceholder(maxsolarDay);
        updateRoverinfo();
    });
}
//GET images
function getImages(roverChoice, solDay, cameraChoice) {
    var params = {
        rover: roverChoice,
        sol: solDay,
        camera: cameraChoice,
        page: 1,
        api_key: 'I4dfNHxd1LPVg6P96qNQlu9cJNz50UNBIAyR2LXO'
    };
    //if statement to remove camera choice from url if 'all' cameras is selected
    if (cameraChoice == "all") {
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?sol=' + solDay + '&api_key=' + params.api_key
        }).done(function (results) {
            $.each(results.photos, function (i, photos) {
                $("#pic-results").append(
                    "<a href=" + '"' + photos.img_src + '"' + 'data-lightbox=' + roverChoice + ">" +
                    "<img class='thumbnail col-xs-3 col-centered' src=" + photos.img_src + ">" +
                    "</a>"
                );
            });
        }).fail(function (error) {
            errorMessage(error.responseJSON.errors);
            console.log(error);
        });
    } else {
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverChoice + '/photos?sol=' + solDay + '&camera=' + cameraChoice + '&api_key=' + params.api_key
        }).done(function (results) {
            $.each(results.photos, function (i, photos) {
                console.log(photos.img_src);
                $("#pic-results").append(
                    "<a href=" + '"' + photos.img_src + '"' + "data-lightbox=" + roverChoice + ">" +
                    "<img class='thumbnail col-xs-3 col-centered' src=" + photos.img_src + ">" +
                    "</a>"
                );
            });
        }).fail(function (error) {
            errorMessage(error.responseJSON.errors);
            console.log(error);
        });
    }
}

$(document).ready(function () {
    $(".start_wrap").css("display", "inline-block");
    //event listener for curiosity radio button
    $("#curiosity").click(function () {
        sharedMethods();
        /*$(".camera-choices").append(
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
        )*/
    });

    //event listener for clicking opportunity and spirit radio buttons
    $("#opportunity, #spirit").click(function () {
        sharedMethods();
        //sharedCameras();
    });

    //form submit events
    $("#picGetterForm").submit(function (event) {
        event.preventDefault();
        $(".error-message").children().remove();
        solDay = $(".solar-day").val();
        //assignCameraChoice();
        $(".feedback").children().remove();
        getImages(roverChoice, solDay, cameraChoice);
        $("#pic-results").children().remove();
        $(".photo-info").remove();
    });



});