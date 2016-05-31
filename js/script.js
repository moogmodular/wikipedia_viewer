/**
 * Created by MKS on 22.09.2015.
 */
$(document).ready(function () {
    //ALWAYS
    $("#footer_load").load("footer.html");
    //ALWAYS

    var searchTerm;
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
    var callback = '&callback=JSON_CALLBACK';

    $("#form").keyup(function () {
        searchTerm = $(this).val();
            $("#res_test").html(searchTerm);
        }).keyup();

    $('#form').keypress(function (e) {
        if (e.which == 13) {
            console.log('enter hit');
            $("#form").val();

            $.ajax({
                type: 'GET',
                url: url + searchTerm + callback,
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    console.dir(json.sites);
                    console.log(json);
                    populateDivs(json);
                },
                error: function(e) {
                    console.log(e.message);
                }
            });

            return false;    //<---- Add this line
        }

    });

    function populateDivs(jsonObj) {
        for (var i = 0; i < jsonObj[1].length; i++) {

            var arrArticle = jsonObj[1];
            var arrArticleText = jsonObj[2];
            var arrArticleLink = jsonObj[3];

            $("#to_populate").append("<div style='background-color: #aaaaaa; padding: 2px'>" + "<h2>" + arrArticle[i] + "</h2>");
            $("#to_populate").append("<p>" + arrArticleText[i] + "</p>");
            $("#to_populate").append("<h4>" + arrArticleLink[i] + "</h4>" + "</div>");

        }
        return;
    }

});