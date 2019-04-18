var searchLocation;
var searchTerm;

function startSearch() {
    $('#results').html("");
    searchLocation = document.getElementById("search-location").value;
    searchTerm = document.getElementById("search-term").value;
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + searchLocation + "&term=" + searchTerm;

    if (searchLocation == null || searchLocation == "") {
        $('#results').append('<h5 style="color:red;">** Please specify a location! **</h5>');
    } else {
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
                    // Display a header on the page with the number of results
                    $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function (i, item) {
                        // Store each business's object in a variable
                        var id = item.id;
                        var phone = item.display_phone;
                        var image = item.image_url;
                        var name = item.name;
                        var price = item.price;
                        var rating = item.rating;
                        var reviewcount = item.review_count;
                        var address = item.location.address1;
                        var city = item.location.city;
                        var state = item.location.state;
                        var zipcode = item.location.zip_code;
                        // Append our result into our page
                        $('#results').append('<div id="' + id + '" style="width:46%;float:left;margin-top:30px;margin-bottom:40px;margin-left:2%;margin-right:2%">' + 
                        '<img src="' + image + '" style="width:200px;height:150px;float:left;border:1px solid black;border-radius:2%;box-shadow:2px 2px 2px darkslategrey;margin-bottom:10px;margin-right:4%">' + 
                        '<h4>' + name + '</h4> ' + 
                        'Address: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + 
                        '<br>Phone: ' + phone + 
                        //'<br>Price: ' + price +
                        '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
                    });
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    $('#results').append('<h5>We discovered no results!</h5>');
                }
            }
        });
    }
}