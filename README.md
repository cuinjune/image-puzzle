# Image Puzzle
<img src="screenshot.jpeg" width="250"/>

## Description
This project was an assignment for the "Hand Held: Creative Tools for Phones" course at ITP.  
The assignment was to build a second prototype of an interface that allows the user to combine image layers in different ways and producing artworks.  

I decided to create a simple puzzle game using a random image which is divided into five pieces, and shuffled randomly.  
Here's the [Live Demo on Glitch](https://cuinjune-image-puzzle.glitch.me/).

You can also use the following QR Code to visit the app link in your phone's browser:

<img src="qrcode.png" width="150"/>

## How to play
- In Desktop browser, you need to use horizontal mouse scrolling to move image pieces.
- In Mobile browser, you need to swipe left or right to move image pieces.

## Process & Thoughts
In terms of the user interface, instead of using icons and texts to instruct the user how to play, I used an animation in the beginning to show the user what the completed image looks like(for 2 seconds), and how its pieces are shuffled. I assume this will sufficiently demonstrate how the game works in a quite simple manner.

For the interactivity, I used the [CSS Scroll Snap](https://drafts.csswg.org/css-scroll-snap/) feature based on [this documentation](https://developers.google.com/web/updates/2018/07/css-scroll-snap).

Although it was pretty straightforward to use, I think there are some problems that need to be addressed. For example, the scrolling of one element stops as soon as the other element is being scrolled. I fixed this behavior by force snapping the scrolled elements whenever a new touch is detected but this is not ideal.

The random images used in the app are fetched from [Lorem Picsum](https://picsum.photos/).

## Setup
1. You need to have [Python](https://realpython.com/installing-python/) installed on your computer
2. Run the following commands in the Terminal
```
git clone https://github.com/cuinjune/image-puzzle.git
cd image-puzzle
python -m http.server 8080
```
3. Open your web browser and navigate to http://localhost:8080

## Author
* [Zack Lee](https://www.cuinjune.com/about): MPS Candidate at [NYU ITP](https://itp.nyu.edu).
