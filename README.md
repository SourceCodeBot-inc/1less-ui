# 1lessUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## how to start

just by typing `npm start` into the cli or open it via IDE.

### Prepration

first of all it required an installation of all required node_modules by `npm i`.

## Status of that Project

### what we did

1. simple interaction via an UI made with angular and material design
2. simple chart which currently use randomized data to visualize the result
3. 2 PoS instances and 2 smart bins simulated in the UI
4. 1 Control plane where you can choose where to sold dish goes into a bin
5. with `+` at the top bar you can generate more dishes

### what's TODO

1. the dish washing action at a bin is not implemented
2. Event log may can be optimized
3. PoS and Bins can't managed at the moment
4. for simulation purpose it's necessary to define a loop which run in an interval for example which handle
   1. creation and deletion of items
   2. selling dishes at different PoS's
   3. washing dishes in a batch process (how many dishes can be wash at once per machine?)
5. also how is the way from bin to wash to PoS returning
