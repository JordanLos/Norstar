Understanding the Layout and Structure of the Webpage


LIBRARIES
1. Jquery
2. GSAP (for animations)
3. Fullpage.js
http://alvarotrigo.com/fullPage/

1. CRITICAL CONCEPT: When fullpage.js is used to trigger animations to move the 
content on/off the page. The sections which fullpage uses are themselves empty 
and triggers only.  Hence, the html structure contains a 'section' for each page, including the 
landing section. Each of those 'sections' are empty within the html structure, 
but are activated by javascript functions to move the contents on/off the page.

2. Problems requiring additional scripts/functions
	A. Navigating the site without JS.
Since navigating the webpage requires Javascript, the css files contain 
declarations for where the JS should animate from. E.g. each section is set to 
'visibility: hidden'. To allow non-js users to still browse the site, a 
secondary style sheet is also included. The two sheets are exclusive of each 
other--they will not style the page correctly if both are loaded.

	B. Loading two incompatible style sheets
To solve this problem, a <noscript> tag has been added to load the styles 
necessary for browsing without Javascript. Since the two style sheets are 
exclusive, a special script is required to load the necessary styles for when 
javascript is enabled. This script can be found within the <head> tag.

	C. Preventing the FOUC from loading a stylesheet with JS
The inclusion of the CSS loading script within the <head> tag, while allowing 
for a JS and non-JS style sheet, introduces a noticable FOUC (flash of unstyled 
content). To avoid this FOUC a few delcarations are made in the head, including 
a body image and making the contents which flash invisible using 
'visibility:invisible".  The main.css style sheet, when loaded, immediately 
returns the visibility of the hidden elements to their proper state. 

3. Mobile Safari Browser
	iOS Safari uses a small element on the bottom of the page for navigation, which 
interferes with the placement of the elements. The beginning of the javascript 
file includes a small snippet of code to identify a safari user agent and make a 
few small changes to prevent the overlap of elements.

4. Z-index on Contact Section
	Fullpage.js does not allow swiping if one of the non-fullpage elements are on top of the 
stacking order. The contact page has some buttons that allow for making 
calls/emails/google location/etc, which are not clickable because they are lower 
in the stacking context than the fullpage elements. I attempted to fix this 
problem, but could not find a way without having the clickable contact elements prevent further swiping 
and break the design. This is a significant drawback for a mobile website, 
however I do not think there is current a solution that would allow the user to 
tap an element without breaking the design. This was an unforseen problem of my 
novel design that appeared late in the project. 

Smaller issues related to accomplishing the goals above can be found in the 
comments.

- Jordan
