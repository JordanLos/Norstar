Understanding the Layout and Structure of the Webpage


I will outline below how the webpage works, since I've employed a novel 
approach. The user navigates the page by scrolling/swiping. Each scroll or swipe 
will remove the current 'section' and introduce another. The first scroll 
animates a landing section to the pattern for the rest of the website. To 
accomplish the effect of 1page/scroll I've employed the Fullpage.js library:

http://alvarotrigo.com/fullPage/

However, I've also used the library in a somewhat novel way. The library is 
intended to move the entirety of the page one section at a time. I've used the 
library to give the impression scrolling moves elements on the page in or our of 
focus, rather than giving the impression of scrolling. To accomplish this, 
almost everything on the page is a fixed element, including the 'sections' that 
have the content. 

1. CRITICAL CONCEPT: Fullpage.js does not serve to scroll the pages, but acts a 
trigger for animating in/out elements on the page. This is the novel approach.

Hence, the html structure contains a 'section' for each page, including the 
landing section. Each of those 'sections' are empty within the html structure, 
but are activated by javascript functions to move the contents on/off the page.

2. Problems requiring additional scripts/functions
	A. Navigating the site without JS.
Since navigating the webpage requires Javascript, the css files contain many 
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

	D. Reflection
On reflection, this was perhaps not the best way to build the website. I likely 
should have begun with the non-js enabled styles and loaded the necessary ones 
for when JS was enabled. However, this was a realization I made late into the 
project and refactoring the entire CSS/JS code base was not realistic. The 
solution, however, works without noticable effect to the user (in fact, 
inlinging the background image to the body makes initial loading much smoother.

MOBILE SAFARI PROBLEMS
	iOS Safari uses a small element on the bottom of the page for navigation, which 
interferes with the placement of the elements. The beginning of the javascript 
file includes a small snippet of code to identify a safari user agent and make a 
few small changes to prevent the overlap of elements.

Z-INDEX PROBLEM ON CONTACT SECTION
	Fullpage.js does not allow swiping if one of the elements are on top of the 
stacking order. The contact page has some buttons that allow for making 
calls/emails/google location/etc, which are not clickable because they are below 
the z-index of fullpage elements. I attempted to fix this problem, but could not 
find a way without having the clickable contact elements prevent further swiping 
and break the design. This is a significant drawback for a mobile website, 
however I do not think there is current a solution that would allow the user to 
tap an element without breaking the design. This was an unforseen problem of my 
novel design that appeared late in the project. It is the most significant 
drawback of the website.
arose latebbbb

Smaller issues related to accomplishing the goals above can be found in the 
comments.

- Jordan
