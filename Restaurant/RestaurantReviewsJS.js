var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var result = url.searchParams.get("test");

var id;

$('#results2').html("");
id = "GWwa6DzhA-Z2_BDZbunYPw"; //Reminder: change this later
id = result;

var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id + "/reviews";

$.ajax({
    url: myurl,
    headers: {
        'Authorization': 'Bearer o-RQ82YyXSV_0vi4Ku0SBdxLA2Ff4w0HaNGCTuHaNXIJ6a1TRK3MVF9srnF3119vbWEXZENglkvdO7Q6DNDB46stRfZE2hCjzOjrogVm4hmWBgY3LaowAb4KS8ezXHYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Grab the results from the API JSON return
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0) {
            // Itirate through the JSON array of 'businesses' which was returned by the API
            $.each(data.reviews, function (i, item) {
                // Store each business's object in a variable
                var reviewid = item.id;
                var rating = item.rating;
                var userid = item.user.id;
                var userimage = item.user.image_url;
                var username = item.user.name;
                var text = item.text;
                var timecreated = item.time_created;
                // Append our result into our page
                $('#results2').append('<div id="' + reviewid + '" style="margin-top:30px;margin-bottom:40px;margin-left:2%;margin-right:2%">' +
                    '<img src="' + userimage + '" style="width:80px;height:80px;float:left;border:1px solid black;border-radius:2%;box-shadow:2px 2px 2px darkslategrey;margin-bottom:10px;margin-right:4%">' +
                    '<h4>' + username + '</h4> ' +
                    '<b>Rating: </b>' + rating + ' out of 5' +
                    '<br><b>Date: </b>' + timecreated +
                    '<br>' + text + '</div><hr>');
            });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
            $('#results2').append('<h5>We discovered no results!</h5>');
        }
    }
});