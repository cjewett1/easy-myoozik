
## API access has been removed 

I was able to use BandsInTown's API to access artists information regarding concerts, but that was for 3 months only, which sadly expired in June. I am working on a new similar project with API access that isn't so limited and time sensitive. While I knew I was only going to have site functionality for 3 months, I am happy I created the site and it was an incredible learning tool for me. I will leave the repo up so that my code is still visible. I plan on making a bigger and better project in the near future! Thanks for reading.

## Overview

Welcome to the Eazy Myoozik repo. This is my passion project. Being an avid music lover, especially live music, I decided to create an app that allows a user to search for their favorite artist, view upcoming and previous concerts as well as leave a review for a concert they had previously attended. 

This site features muliple API calls and data fetching, as well as sending data to firebase. I took it upon myself to reach out to BandsInTown to get access to their API, they gave me limited access, so I am a bit limited in the information that I can access, but it ended up working very well for me. The site also features Nextjs routing, the use of various React hooks such as useEffect and useState, server side rendering and the use of many 3rd party libraries such as FontAwesome, SASS, SVGR and Axios to handle the API calls. 

## Why did I make this project? Why did I use React and Next.js?
I made this project using React and Nextjs because I wanted to really learn the fundamentals of these two powerful libraries. I did get a basic understanding in my React course but I really wanted to learn more, as I find it so fun to work with.

This project has been immensely rewarding and satisfying to work on. It has pushed me to be resourceful and has tested my problem solving skills, many, many times. I feel that this project has really helped me understand the fundamentals of React and Nexjs, and well as getting data from an API and learning how to extract and manipulate that data and make it usable on your website. I am using Axios because I wanted to give it a try. I normally use Fetch but I had seen people mention Axios, so I decided to try it out. These reasons are why I decided to create this app in the first place. 

## Project Status
Right now, the site is almost finished. I have a bit of styling left to do as well as the ability for a logged in user to edit their reviews. Ill get there! A lot of my time is taken up by schoolwork and general life stuff, but I love working on this project and look forward to finishing it.

## Code Examples

Here is an example of sending data via a query string to ensure that the aritst's data is properly rendered when they are pushed to the artist page.

This did take me a little while to figure out, but it was very satisfying when I got it all to work!

I really like this method of passing data, and it was interesting to learn about. You learn about query strings in PHP quite early on but up until this project I didn't know you could do this with Nextjs as well! Things like this are why I really enjoy using Nextjs. 

```
    <Link
        href={{
            pathname: "/artist",
            query: {
                name: artistInfo.name,
                url: artistInfo.image_url,
            },
        }}
    >
        View Artist's Page
    </Link>

```

## When I get more time, I am going to work on
 - [x]  Add the ability to login using google authentication and firebase
 - [x]  Add the ability for logged in users to leave reviews
 - [x]  I need to add validation to the search form and eventually to the review form
 - [x]  I will add the most recent reviews to the home page for all to see
 - [ ]   Styling and layout are still fairly fluid, so I will continue to work on this over time
 - [ ]   Ability for user to edit their reviews in the admin dashboard

## Challenges I faced while making this
While this has been a fun and rewarding project to develop, it has come with its fair share of challenges. 

Being fairly new to React and Nextjs, I had to spend some time looking things up and playing around to get things to work the way I wanted them to. For instance, having a user search for an artist, then that artist comes up via an API call, then the user can click on the artist to view their details and upcoming concerts on another page. I had to learn how to pass data through query strings/params to ensure that the artist's data was being rendered properly when the page loaded.

## Useful Links
I will post the link to this website when I deploy it. I have not done so yet as its not yet complete, but you can download and run it locally if you wanted to test it.

## Contact
## Connect with me
[![Phone](https://img.shields.io/badge/Phone-%23333.svg?&style=for-the-badge&logo=telephone&logoColor=white)](tel:+7802424053)
[![Email](https://img.shields.io/badge/Email-%23D14836.svg?&style=for-the-badge&logo=gmail&logoColor=white)](mailto:clintondgorda@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/clintonjewett/)
[![Discord](https://img.shields.io/badge/Discord-clint(booma)%234826-%237289DA?logo=discord&logoColor=white&style=for-the-badge)](https://discord.com/users/clint(booma)#4826)

[![Portfolio](https://img.shields.io/badge/Portfolio-Check%20out%20my%20website-blue?style=for-the-badge&logo=portfolio&logoColor=white)](https://www.clinton-gorda.com)

[![Resume](https://img.shields.io/badge/Resume-View%20my%20resume-orange?style=for-the-badge&logo=Resume-Icons&logoColor=white)](https://drive.google.com/file/d/1fO-yFbp0v9N1611nk4rxw1zoYp_w1jmg/view?usp=sharing)
