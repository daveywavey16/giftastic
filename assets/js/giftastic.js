var carsArray = ["Aston Martin One-77", "Koenigsegg Agera R", "Hennessey Venom GT", "Bugatti Veyron 16.4 Super Sport", "Lamborghini Aventador"];

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=NIzhYaHxM8DjZ8h648Ovp7uoUi9ZbC6R',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

$(document).ready(function() {
    for (var i = 0; i < carsArray.length; i++) {
        $("#car-buttons").append("<button type='button' onclick='searchGif(\"" + carsArray[i] + "\")' class='btn btn-danger' value=' " + carsArray[i] + "'> " + carsArray[i] + " </button>");
    }
});

function carButtonClicked() {
    var userInput = $('#car-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#car-input').val();

    if (userInput) {
        $('#car-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-danger' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function displayGif(response) {
    $('#cars').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img class="img-responsive" src= "' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage " style="height:200px; width:340px;">';

        image = '<div class="col-lg-4 px-2">' + image + "</div>";
        $('#cars').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}