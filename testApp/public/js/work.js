// Add main scripts here
$(function () {
    // Grab the template script
    var theTemplateScript = $("#work-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = [
        {
            title: "Pinegrove School",
            languages: [ "Bootstrap", "JavaScript", "jQuery", "HTML", "CSS", "Grunt", "SASS", "Git" ],
            image: "../img/pinegrove.png",
            //link: [{}],
            //body: [""]
        },
                {
            title: "UMass Boston News",
            languages: [ "ExpressionEngine", "Kube 3", "HTML", "CSS", "Gulp", "LESS", "Git", "Bitbucket" ],
            image: "../img/umb-news.png",
            //link: [{}],
            //body: [""]
        },
                {
            title: "The Abiding Light",
            languages: [ "Foundation 5", "Wordpress", "PHP", "HTML", "CSS", "Grunt", "SASS" ],
            image: "../img/abidinglight.png",
            //link: [{}],
            //body: [""]
        },
                    {
            title: "Deal Me Local",
            languages: [ "Polymer 0.5", "FourSquare API", "Open Street Map", "JavaScript", "CSS", "HTML" ],
            image: "../img/dealmelocal.png",
            //link: [{}],
            //body: [""]
        }
            
          ];

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.work-placeholder').html(theCompiledHtml);
});