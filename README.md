# Image Puzzle
<img src="screenshot.jpg" width="250"/>

## Description

This repo is the week5 assignment of the "Hand Held: Creative Tools for Phones" course at ITP.  
The assignment was to build a second prototype of an interface that allows the user to combine image layers in different ways and producing artworks.  
I decided to create a simple puzzle game using a random image which is divided into five pieces, and shuffled randomly.

Here's the [Live Demo on Glitch](https://cuinjune-image-puzzle.glitch.me/).

I used the [CSS Scroll Snap](https://drafts.csswg.org/css-scroll-snap/) feature based on [this documentation](https://developers.google.com/web/updates/2018/07/css-scroll-snap).

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
* [Zack Lee](https://www.cuinjune.com/about): an MPS Candidate at [NYU ITP](https://itp.nyu.edu).
