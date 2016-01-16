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
            body: ["This site was created for a freelance project in 2014. I developed it based on PSD files given to me by a designer. The site was fully responsive and mobile ready."]
        },
                {
            title: "UMass Boston News",
            languages: [ "ExpressionEngine", "Kube 3", "HTML", "CSS", "Gulp", "LESS", "Git", "Bitbucket" ],
            image: "../img/umb-news.png",
            //link: [{}],
            body: ["This was an update to an existing webpage, with minor changes in design given to me by a designer. I redid the page to use a new framework, Kube, making it mobile friendly and responsive. I created the pages as templates in ExpressionEngine."]
        },
                {
            title: "The Abiding Light",
            languages: [ "Foundation 5", "Wordpress", "PHP", "HTML", "CSS", "Grunt", "SASS" ],
            image: "../img/abidinglight.png",
            //link: [{}],
            body: ["This site was built for a local church using Foundation and Wordpress. I did all of the design and development on this one."]
        },
                    {
            title: "Deal Me Local",
            languages: [ "Polymer 0.5", "FourSquare API", "Open Street Map", "JavaScript", "CSS", "HTML", "Cordova", "Phonegap" ],
            image: "../img/dealmelocal.png",
            //link: [{}],
            body: ["While this app never got off the ground, the underlaying technology still works. I used FourSquare's API to fetch a list of locations from a local shopping organization and display them on a map. The app would also show a list of local deals going on, as well as details and photos of each business."]
        }
            
          ];

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.work-placeholder').html(theCompiledHtml);
});