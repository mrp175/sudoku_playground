# The Sudoku Playground

Experience backtracking like you've never seen it before! The app is hosted [here](https://mrp175.github.io/sudoku_playground/), although please do read the rest of this readme before diving in. 

![project image](https://github.com/mrp175/sudoku_playground/blob/master/readme_image.gif)

## About


Sudoku Playground is a web app that solves Sudoku puzzles using a brute force backtracking algorithm in real-time providing feedback through the use of engaging animations to emphasise changes as they happen.

## Usage notes

* The 'Numbers Per Second" dial is operated by dragging on it vertically!
* Any board can be edited by selecting a number from the blue number selection panel. Click/tap anywhere on the board to place a number. Numbers can be deleted with a double-click/double-tap.
* Preset puzzles can be selected from the "select board" menu located at the bottom of the app. The board can also be generated from Sudoku "puzzle strings" from within this menu.
* Choosing different options from the 'traversal type' menu will change the order in which the algorithm solves any puzzle. Apart from providing a visual change, it also demonstrates how order can drastically change the amount of work required to find a solution.

## Current features

* Can solve Sudoku puzzles using a brute force backtracking algorithm.
* Different traversal directions that the algorithm can take when solving the board. 
* Animate board changes as they happen (numbers and cell highlights).
* Controls for algorithm speed, as well as animation durations.
* Preset board selection menu with different difficulty options.
* Import custom puzzles through with Sudoku "puzzle strings".
* Ability to edit the board by adding or deleting numbers.
* Visually differentiate between original board numbers and user placed numbers.
* Board change animations when choosing a preset or importing a puzzle string.
* Animation when placing individual numbers on the board. 
* Responsive design.

## Current state and the future

* Currently there is no tutorial or any useful information provided to the user on load. The UI isn't unintuitive, however, it is something that needs to be added to demonstrate how to use the app and what features are available. This is currently being worked on. 
* Performance is not amazing, so I may rework how the animations are implemented. Currently, it uses canvas elements, but I may consider implementing animations through dom-manipulation instead if it is more performant.
* Currently it only uses a backtracking algorithm, but I would like to implement different algorithms to demonstrate some of the more intuitive and efficient ways of solving Sudoku boards. 
* Currently traversal directions are chosen from a single list, and the list is limited. I would like to implement a more feature-rich selection, perhaps with a full-screen modal that allows for a highly customisable experience. 
* The ability to solve different types of Sudoku puzzles is also something I have considered. 4x4 or 16x16 puzzles for example, or X-Sudoku or Jigsaw-Sudoku. Whilst these would be nice, it really would require a lot of work, and as such is not something I am considering at the moment. 


## Tech Stack

* React
* Typescript

## Run locally

These instructions will help you set up a local development instance of the app if you want to run it locally.

### Get the repo

```
git clone https://github.com/mrp175/sudoku_playground.git
```

### Navigate to the folder

```
cd sudoku_playground
```

### Install the dependencies

```
npm install
```

### Start the app in development mode

```
npm start
```
Then go to http://localhost:3000 to view it in the browser.

## Contributions