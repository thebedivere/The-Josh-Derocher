// Add main scripts here
$(function () {
    // Grab the template script
    var theTemplateScript = $("#work-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = [
        {
            title: "Personal website",
            languages: ["Handlebars.js", "Angular.js", "Express.js", "Node.js", "MongoDB", "JavaScript", "jQuery", "HTML", "CSS", "Grunt", "SASS", "Git", "Jenkins"],
            image: "../img/thejoshderocher.png",
            link: [{
                link_url: "https://github.com/thebedivere/The-Josh-Derocher",
                link_title: "Github"
                }],
            body: ["You're looking at it! The entire website is being served up through Node.js. The homepage is using Handlebars.js to show you all of this content, and the blog (coming soon) is an Angular.js app that uses Express.js and MongoDB."]
        },
        {
            title: "Creative Portal",
            languages: ["Wordpress", "PHP", "mySQL", "HTML", "CSS", "Grunt", "SASS", "Jira",  "Team Foundation Server"],
            image: "../img/portal2.png",
            body: ["This was an internal website I built while at Homesite to help the creative team keep track of incoming requests. It allowed the team to track what projects they were working on, and management could see reports on time allocation"]
        },
        {
            title: "Pinegrove School",
            languages: ["Bootstrap", "JavaScript", "jQuery", "HTML", "CSS", "Grunt", "SASS", "Git"],
            image: "../img/pinegrove.png",
            body: ["This site was created for a freelance project in 2014. I developed it based on PSD files given to me by a designer. The site was fully responsive and mobile ready."]
        },
        {
            title: "UMass Boston News",
            languages: ["ExpressionEngine", "Kube 3", "HTML", "CSS", "Gulp", "LESS", "Git", "Bitbucket"],
            image: "../img/umb-news.png",
            body: ["This was an update to an existing webpage, with minor changes in design given to me by a designer. I redid the page to use a new framework, Kube, making it mobile friendly and responsive. I created the pages as templates in ExpressionEngine."]
        },
        {
            title: "The Abiding Light",
            languages: ["Foundation 5", "Wordpress", "PHP", "HTML", "CSS", "Grunt", "SASS"],
            image: "../img/abidinglight.png",
            link: [{
                link_url: "https://github.com/thebedivere/abiding-light",
                link_title: "Github"
                }],
            body: ["This site was built for a local church using Foundation and Wordpress. I did all of the design and development on this one."]
        },
        {
            title: "Deal Me Local",
            languages: ["Polymer 0.5", "FourSquare API", "Open Street Map", "JavaScript", "CSS", "HTML", "Cordova", "Phonegap"],
            image: "../img/dealmelocal.png",
            body: ["While this app never got off the ground, the underlaying technology still works. I used FourSquare's API to fetch a list of locations from a local shopping organization and display them on a map. The app would also show a list of local deals going on, as well as details and photos of each business."]
        }
          ];
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.work-placeholder').html(theCompiledHtml);
});
