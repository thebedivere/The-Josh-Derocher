// Add main scripts here
$(function () {
    // Grab the template script
    var theTemplateScript = $("#resume-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = [
        {
            title: "Hitachi Data Systems",
            date: "February 2016 - Present",
            link: [{
                link_url: "https://www.hds.com/",
                link_title: "www.hds.com"
            }],
            languages: ["Struts", "HTML", "CSS", "Git", "Review Board", "Jira", "Gradle"],
            body: ["I'll be working as a UI/UX developer."]
        },
        {
            title: "University of Massachusetts Boston",
            date: "October 2015 - December 2015",
            link: [{
                link_url: "https://www.umb.com/",
                link_title: "www.umb.com"
            }],
            languages: ["ExpressionEngine", "Kube 3", "HTML", "CSS", "Gulp", "LESS", "Git", "Bitbucket"],
            body: ["I worked with the University’s IT department to create ExpressionEngine templates from design documents."]
        },
        {
            title: "Homesite Insurance",
            date: "April - October 2015",
            link: [{
                link_url: "https://www.homesite.com/",
                link_title: "www.homesite.com"
            }],
            languages: ["Wordpress", "PHP", "mSQL", "HTML", "CSS", "Grunt", "SASS", "Jira", "Team Foundation Server"],
            body: ["Created website along with UX/UI team to track and manage creative requests.", "Created custom Wordpress Plugins and themes using PHP, mySQL, HTML, CSS, and Sass.",
"Created working prototypes based on wireframes and design documents using HTML, CSS, and JavaScript.",
"Used JIRA and Team Foundation Server for version control and project tracking."
]
        },
        {
            title: "Preview Media",
            date: "October 2014 - April 2015",
            languages: ["HTML", "CSS", "JavaScript", "Grunt", "Sass", "Bootstrap", "Foundation"],
            body: [
                "Developed and designed websites for clients using HTML, CSS, JavaScript, jQuery, Sass, Grunt, and Git."
            ]
        },
        {
            title: "Convener",
            date: "May - October 2014",
            languages: ["HTML", "CSS", "CRM management", "Landing page development", "HTML email development", "email campaigns", "user tracking", "analytics"],
            body: [
               "Growth Hacker",
"Created email templates and client registration pages using HTML, CSS, JavaScript, jQuery, Wordpress, AWS, and PHP.",
"Created content for blog and social media.",
"Found creative solutions on a low budget."

                   ]
        },
        {
            title: "Destructoid",
            date: "2011 - 2014",
            link: [{
                link_url: "https://www.destructoid.com/",
                link_title: "www.destructoid.com"
            }],
            languages: ["Content creation", "Copy writing", "Product reviewing", "Press releases", "Analytics", "Social media marketing"],
            body: ["Destructoid is one of the largest independent video game blogs, with an average of 3 million monthly pageviews. Over my three years working for the site, I reviewed PC games including SimCity, Company of Heroes 2, and X Rebirth.",
                  "My writing has also been published on BitMob and Front Towards Gamer."]
        }
          ];

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.resume-placeholder').html(theCompiledHtml);
});
