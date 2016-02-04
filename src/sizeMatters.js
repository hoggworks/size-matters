/*
  SizeMatters originally coded by Brian Hogg
  brian@hoggworks.com with any questions.
 */
var SizeMatters;

SizeMatters = (function() {
  var $, defaultSuffix, housingDiv, housingDivID, housingDivStyle;

  housingDivID = "_sizeMattersHousing";

  housingDivStyle = "opacity: 0; left: -100000px; top: -100000px;";

  housingDiv = '';

  defaultSuffix = '...';

  $ = jQuery;


  /*
    PRIVATE METHODS
   */

  function SizeMatters(namespace) {
    if (!this.doesjQueryExist()) {
      return false;
    }
    if (namespace != null) {
      housingDivID = namespace;
    }
    this.housingDivString = "<div id='" + housingDivID + "'></div>";
  }

  SizeMatters.prototype.doesjQueryExist = function() {
    if (jQuery) {
      return true;
    } else {
      console.warn("SizeMatters requires jQuery to run.");
      return false;
    }
  };


  /*
    PUBLIC METHODS
   */

  SizeMatters.prototype.willItFit = function(text, params) {
    if (!this.doesjQueryExist()) {
      return false;
    }
  };

  SizeMatters.prototype.howMuchWillFit = function(text, params) {
    var checkDirection, checkIndex, comparisonHeight, comparisonWidth, currentText, dimensions, distance, divParams, divText, fullText, suffix;
    if (!this.doesjQueryExist()) {
      return false;
    }

    /*
      Requires
      text -  either as a string as the first params
              or as a param of a has passed as the first param
      className - just a class name
      width
      height    - Either defined explicitly as a param,
                  or extracted from DOM reference
      target    - DOM reference to extract height and width from
     */
    if (typeof text === 'string') {
      divText = text;
      divParams = params;
    } else if (typeof text === 'object') {
      divText = text.text;
      divParams = text;
    }
    if (divParams.suffix == null) {
      suffix = defaultSuffix;
    } else {
      suffix = divParams.suffix;
    }
    fullText = divText.split(/(\S+\s+)/).filter(function(n) {
      return n;
    });
    currentText = fullText.join("");
    if (divParams.target == null) {
      comparisonWidth = divParams.width;
      comparisonHeight = divParams.height;
    } else {
      comparisonWidth = divParams.target.width();
      comparisonHeight = divParams.target.height();
    }
    distance = Math.floor(fullText.length / 2);
    checkIndex = fullText.length - 1;
    while (distance > 1) {
      divParams.width = divParams.target.width() + "px";
      dimensions = this.howBigWillThisBe(currentText, divParams);
      if (dimensions.width <= comparisonWidth && dimensions.height <= comparisonHeight) {
        checkDirection = 1;
        distance = Math.floor(distance / 2) - 1;
        if (checkIndex === fullText.length - 1) {
          break;
        }
      } else {
        checkDirection = -1;
      }
      checkIndex += Math.floor(checkDirection * distance);
      currentText = fullText.slice(0, checkIndex).join("") + suffix;
    }
    if (currentText === suffix) {
      return "ERROR";
    } else {
      return currentText;
    }
  };

  SizeMatters.prototype.howBigWillThisBe = function(text, params) {
    var dimensions, divParams, divText, item_height, item_width, margin, marginBottom, marginLeft, marginRight, marginTop, newItem, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, tempItemHandle;
    if (!this.doesjQueryExist()) {
      return false;
    }
    $("body").append(this.housingDivString);
    housingDiv = $("#" + housingDivID);
    if (typeof text === 'string') {
      divText = text;
      divParams = params;
    } else if (typeof text === 'object') {
      divText = text.text;
      divParams = text;
    }
    if (divParams.className != null) {
      newItem = "<div id='_sizeMatters_tempItem' ";
      newItem += "class='" + divParams.className + "'";
    }
    newItem += " style='";
    if (divParams.fontFamily != null) {
      newItem += "font-family: " + (divParams.font - family) + "; ";
    }
    if (divParams.fontSize != null) {
      newItem += "font-size: " + (divParams.font - size) + "; ";
    }
    if (divParams.width != null) {
      newItem += "width: " + divParams.width + " !important;";
    }
    newItem += "'>";
    newItem += divText;
    newItem += '</div>';
    housingDiv.append(newItem);
    tempItemHandle = housingDiv.find("#_sizeMatters_tempItem");
    item_width = tempItemHandle.outerWidth();
    item_height = tempItemHandle.outerHeight();
    margin = parseFloat(tempItemHandle.css('margin'));
    marginLeft = parseFloat(tempItemHandle.css('margin-left'));
    marginRight = parseFloat(tempItemHandle.css('margin-right'));
    marginTop = parseFloat(tempItemHandle.css('margin-top'));
    marginBottom = parseFloat(tempItemHandle.css('margin-bottom'));
    if (margin) {
      item_width += margin * 2;
      item_height += margin * 2;
    } else {
      if (marginLeft) {
        item_width += marginLeft;
      }
      if (marginRight) {
        item_width += marginRight;
      }
      if (marginTop) {
        item_height += marginTop;
      }
      if (marginBottom) {
        item_height += marginBottom;
      }
    }
    if (divParams.dontCalculatePadding !== true) {
      padding = parseFloat(tempItemHandle.css('padding'));
      paddingLeft = parseFloat(tempItemHandle.css('padding-left'));
      paddingRight = parseFloat(tempItemHandle.css('padding-right'));
      paddingTop = parseFloat(tempItemHandle.css('padding-top'));
      paddingBottom = parseFloat(tempItemHandle.css('padding-bottom'));
    } else {
      padding = false;
      paddingLeft = 0;
      paddingRight = 0;
      paddingTop = 0;
      paddingBottom = 0;
    }
    if (padding) {
      item_width += padding * 2;
      item_height += padding * 2;
    } else {
      if (paddingLeft) {
        item_width += paddingLeft;
      }
      if (paddingRight) {
        item_width += paddingRight;
      }
      if (paddingTop) {
        item_height += paddingTop;
      }
      if (paddingBottom) {
        item_height += paddingBottom;
      }
    }
    dimensions = {
      width: item_width,
      height: item_height
    };
    tempItemHandle.remove();
    housingDiv.remove();
    return dimensions;
  };

  return SizeMatters;

})();

window.SizeMatters = SizeMatters;

// ---
// generated by coffee-script 1.9.2
