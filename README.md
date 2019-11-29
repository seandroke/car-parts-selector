# Car Part Selection Application

The idea for this applicaiton was born when I was comparing vehicles for purchase and noticed a key factor
in the decision making process was price of replacement parts. Many eCommerce sites exist to search for parts,
but there exists no way to see a comprehensive listing of average prices for specific vehicle parts without traversing
various filters and making multiple searches. This full stack application is meant to eliminate this and allow the user
to search for their respective vehicle and quickly see a listing of the most commonly replaced car parts and the prices you
can expect to pay to allow the buyer to make an educated decision on ease of repairability.

## Getting Started

The following is an explanation of how the existing version of the application works, what technologies are being used, and
how and where contributions can be made.

### Technologies & Prerequisites

<table style="width: 100%">
<tr>
<th>Technology</th>
<th>Purpose</th>
</tr>
<tr>
<th><strong>React.js</strong></th>
<th style="text-align: left">React is an easy to use front end library to deliver quick single page user interfaces such as the one implemented here.
While the current implementation is very simple, it is more meant to be used as a plugin to existing interfaces or in a
personal standalone environment.</th>
</tr>
<tr>
<th>Django</th>
<th>Django is a python based backend web framework for use in developing API's and and manipulating databases. This application
relies upon the framework to query (web scrape) results from google and return a JSON response for front end display.
</table>

### Dependencies
<strong>Front End</strong>


- Axios: A JQuery like package for making GET and POST requests. Especially effective with Django.
- React-Bootstrap: A means of integrating bootstrap effectively with React.


<strong>Back End</strong>
- Django Cors Headers: A means of controlling CORS usually essential during the development phase.
- Django REST framework: The REST framework is a means of creating efficient and structured API's it incorporates functionality for web applications that would otherwise lengthen the development process.
- SelectorLib: A web scraping library to pull content from sites/platforms without public API's.


### Versioning & Future Functionality

<i>Version: 0.0.1</i>

Core functionality implemented. React front end pairs with compatible django back end. Currently a single view is used to
accept year make and model and via a custom URL, google shopping is web scraped for the top result for each of the various parts
listed. Currently, product name is spotty, certain vehicles will feature products without names. Additionally, links have to be
fixed as Google routinely adjusts how they create URL's for their shopping platform.

Future intended functionlaity is to widen the scope of product queries and massage data that is web scraped to attempt to
eliminate situations where the product name is not accurately scraped. Incorporating Amazon or other auto parts stores would
allow us to refine the products displayed to ensure best price. Multithreading the python view as well as adding searched vehicles
to a database for ease of access would enhance speed.


### Screenshots

![alt text](https://github.com/seandroke/car-parts-selector/blob/master/screenshots/Screen%20Shot%202019-11-29%20at%205.01.31%20PM.png)


![alt text](https://github.com/seandroke/car-parts-selector/blob/master/screenshots/Screen%20Shot%202019-11-29%20at%205.02.06%20PM.png)


![alt text](https://github.com/seandroke/car-parts-selector/blob/master/screenshots/Screen%20Shot%202019-11-29%20at%205.04.07%20PM.png)
