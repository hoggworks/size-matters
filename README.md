# size-matters
SizeMatters is a class that determines how big the text you're using will be, and how much text you can fit in a given area, using loaded CSS classes. The intent of this is to replicate some old Flash functionality where you could know the size of text *before* putting it to the screen/DOM. It isn't needed all the time, but if it is? Yowza!

*The current version of SizeMatters requires jQuery to run. In addition, any CSS you're going to use for size calculation need to be loaded.*

Usage is simple: include the file (either sizeMatters.coffee or sizeMatters.js, depending on your workflow). Then invoke it in one of two ways:

## howBigWillThisBe
This method is used to determine the onscreen size of text given a specified style. Pass either two parameters (text and the options) or one (the options, including the text).

Expected parameters are:

**text** - this is the text we're checking the size of.

**className** - this is the css class we're using to determine the size.

In CoffeeScript, the usage would be:
```
howBigOptions =
  text: 'This is my text.'
  className: 'myClass'

textSize = window.SizeMatters.howBigWillThisBe howBigOptions
```

This returns an object with the properties height and width.

In JavaScript, the usage would be:
```
var howBigOptions = {
  text: 'This is my text.',
  className: 'myClass'
};

textSize = window.SizeMatters.howBigWillThisBe(howBigOptions)
```

## howMuchWillFit
This method will return a substring of text that will fit in a specified object. The intent of this is to create intelligent excerpt lengths. CSS has text-overflow, but it yields inconsistent results.

Expected parameters are:

  **text** -  either as a string as the first params or as a param of a has passed as the first param

  **className** - this is the css class used for size calculation.

  **width**, **height** - size of text area (if you want to specify this without referencing an on-screen element's size)
  
  **target** - DOM reference to extract height and width from (if you want to check an existing on-screen element's size)

In CoffeeScript, the usage would be:
```
params =
  text: fitTestText
  target: $("#fit-test")
  className: "fit-test"

$("#fit-test").html(sizeMatters.howMuchWillFit(params))
```

In JavaScript, the usage would be:
```
var params = {
  text: fitTestText,
  target: $("#fit-test"),
  className: "fit-test"
}

$("#fit-test").html(sizeMatters.howMuchWillFit(params))
```
