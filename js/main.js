// Add main scripts here
$(function () {
    // Grab the template script
    var theTemplateScript = $("#address-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = [
        {
            title: "University of Massachusetts Boston",
            date: "October 2015 - December 2015",
            link: [{
                    link_url: "https://www.umb.com/",
                    link_title: "www.umb.com"
            }],
            body: ["I worked with the University’s IT department to create ExpressionEngine templates from design documents."]
        },
        {
            title: "Homesite Insurance",
            date: "April - October 2015",
            link: [{
                    link_url: "https://www.homesite.com/",
                    link_title: "www.homesite.com"
            }],
            body: ["I worked with the company’s creative team to create an internal website to track and manage creative requests, as well as working prototypes based on wireframes and design documents."]
        },
        {
            title: "Preview Media",
            date: "October 2014 - April 2015",
            body: [
                "Preview Media was a small team of designers and programmers who created web pages for local business in Portland, ME. I handled most of the front-end development and some of the design."
            ]
        },
        {
            title: "Convener",
            date: "  May - October 2014",
            body: [
                "Convener was a start up company that never got off the ground, but I spent five months learning a lot. I created email templates and client registration pages, and I handled the company's blog and social media. It was my job to find creative solutions on a low budget."
                   ]
        },
        {
            title: "Destructoid",
            date: "2011 - 2014",
            link: [{
                    link_url: "https://www.destructoid.com/",
                    link_title: "www.destructoid.com"
            }],
            body: ["Destructoid is one of the largest independent video game blogs, with an average of 3 million monthly pageviews. It is well regarded by the gaming community at large, and quotes from our reviews have been featured in advertising for big titles like The Last of Us, Saint’s Row the Third, Forza Motorsport, Luigi’s Mansion: Dark Moon, and tons of other games. Over my three years working for the site, I reviewed PC games including SimCity, Company of Heroes 2, and X Rebirth. I covered the latest news and wrote opinion pieces. I am familiar with the gaming industry, and I’ve spent time with developers and other press members at industry events.",
                  "My writing has also been published on BitMob and Front Towards Gamer."]
        },
        {
            title: "Proficient Languages and Software",
            list: [

                'HTML',
                'CSS',
                'JavaScript',
                'jQuery',
                'Linux',
                'Apache2',
                'MYSQL',
                'PHP',
                'Handlebars',
                'Bootstrap',
                'Foundation',
                'Bourbon.io',
                'Jade',
                'ExpressionEngine',
                'Wordpress (Plugins and themes)',
                'Tumblr (Themes)',
                'Git',
                'NPM',
                'Grunt',
                'Gulp',
                'Bower',
                'Yeoman',
                'SASS',
                'Less',
                'Audacity',
                'Photoshop',
                'Gimp',
                'Google Docs'


            ]

        }
          ];

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
});