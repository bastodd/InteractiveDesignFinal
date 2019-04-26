var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var result = url.searchParams.get("test");

var id;

$('#results1').html("");
//id = "GWwa6DzhA-Z2_BDZbunYPw";
id = result;

var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id;

$.ajax({
    url: myurl,
    headers: {
        'Authorization': 'Bearer o-RQ82YyXSV_0vi4Ku0SBdxLA2Ff4w0HaNGCTuHaNXIJ6a1TRK3MVF9srnF3119vbWEXZENglkvdO7Q6DNDB46stRfZE2hCjzOjrogVm4hmWBgY3LaowAb4KS8ezXHYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Store each business's object in a variable
        var businessid = data.id;
        var name = data.name;
        var imageurl = data.image_url;
        var url = data.url;
        var phone = data.display_phone;
        var category1 = data.categories[0].title;
        var category2 = data.categories[1].title;
        var category3 = data.categories[2].title;
        var price = data.price;
        var rating = data.rating;
        var reviewcount = data.review_count;
        var address = data.location.address1;
        var city = data.location.city;
        var zipcode = data.location.zip_code;
        var state = data.location.state;
        var photo1 = data.photos[0];
        var photo2 = data.photos[1];
        var photo3 = data.photos[2];

        var sunhours = data.hours[0].open[0].start + ' - ' + data.hours[0].open[0].end;
        var monhours = data.hours[0].open[1].start + ' - ' + data.hours[0].open[1].end;
        var tueshours = data.hours[0].open[2].start + ' - ' + data.hours[0].open[2].end;
        var wedhours = data.hours[0].open[3].start + ' - ' + data.hours[0].open[3].end;
        var thurhours = data.hours[0].open[4].start + ' - ' + data.hours[0].open[4].end;
        var frihours = data.hours[0].open[5].start + ' - ' + data.hours[0].open[5].end;
        var sathours = data.hours[0].open[6].start + ' - ' + data.hours[0].open[6].end;

        // Append our result into our page
        $('#results1').append('<div id="' + businessid + '" style="width:100%;margin-top:30px;margin-bottom:40px;margin-left:2%;margin-right:2%;padding-right:4%">' +
            '<h3>' + name + '</h3> ' +
            '<img src="' + imageurl + '" width="80%" style="border:1px solid black;border-radius:2%;box-shadow:2px 2px 2px darkslategrey" />' +

            '<br><br><div style="display:flex"><div style="flex:50%;padding-right:4%">' +
            '<b>Address: </b>' + address + ' ' + city + ', ' + state + ' ' + zipcode +
            '<br><b>Phone: </b>' + phone +
            '<br><b>Rating: </b>' + rating  +
            '<br><b>Price: </b>' + price +
            '<br><b>Categories: </b>' + category1 + ', ' + category2 + ', ' + category3 + '</div>' +

            '<div style="flex:50%">' +
            '<b>Operating Hours: </b>' +
            '<br>Monday: ' + monhours +
            '<br>Tuesday: ' + tueshours +
            '<br>Wednesday: ' + wedhours +
            '<br>Thursday: ' + thurhours +
            '<br>Friday: ' + frihours +
            '<br>Saturday: ' + sathours +
            '<br>Sunday: ' + sunhours + '</div></div>' +
            '<br><br><div style="display:flex; width="30%"><img src="' + photo2 + '"/>' +
            '<img src="' + photo3 + '"/>' + '</div></div>');
    }
});


