# contact-book

A simple searchable contact-book web app based on Angular and Clarity.

## Prerequisites

1. Angular CLI - used for running build, tests and server
2. Google Chrome - browser used for development, hence 100% support guaranteed

## Installation

1. Clone the app and navigate to the directory.
2. Run `npm install` to install dependencies.
3. Run `ng serve --prod` to build and serve the app.
4. Open `http://localhost:4200` in Google Chrome.

Any route will redirect to the base route `/`. Click on `Add Seed Contacts` button to save some contacts to the server to be able to use the app. Obviously, make sure the server is running at `http://localhost:1337` first. You may add seed contacts multiple times since there are no unique constraints applied on the back-end.

## Features

1. Search on a column by clicking the filter icon and typing keywords.
2. Paginate contacts by clicking on the page numbers in the datagrid footer.
3. Hide / Show columns by clicking on the column selector in the datagrid footer.
4. Sort items by clicking on the column header.

## Tests

Run `ng test --single-run` to run all tests once.