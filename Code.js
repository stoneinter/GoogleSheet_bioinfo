// generate helper file automatically
// make some of the functions private by adding _ to the name
// make tests so that things do not break


/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @private
 */
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('Custom Menu')
      .addItem('color char by SS', 'runSS')
      .addItem('color char by AA', 'runAA')
      .addItem('View Documentation', 'showHelp')
      .addToUi();
      
  // Add a quick function to run
//  Welcome();
}

//https://developers.google.com/apps-script/guides/triggers
//https://yagisanatode.com/2019/02/22/google-apps-script-why-isnt-my-add-on-showing-up-in-the-add-on-menu-when-i-test-it/
//https://www.cloudsponge.com/blog/google-oauth-verification-video/
/**
 * The event handler triggered when installing the add-on.
 * @param {Event} e The onInstall event.
 * @private
 */
function onInstall(e) {
  onOpen(e);
}

//check out this reference to add html!!
//https://script.google.com/d/1eSvQMHBpjkt13USxpH4CFOp9mxzyr5hv08M4E3Iz1Cw7gDxxoStH4eLU/edit?usp=sharing
//https://github.com/brucemcpherson/ColorArranger

// code to insert the symbol
//https://www.benlcollins.com/apps-script/google-apps-script-beginner-guide/
//function Welcome() {  
//  Browser.msgBox("This is a collection of simple functions that helps biologist working with Googlesheet."+
//  " Almost all credits to Sequence Manipulation Suite (http://www.bioinformatics.org/sms2/index.html) and Biopython!" +
//  "Currently available functions are " +
//  " translate() "
//  );
//};

//custom count and sum has a great documentation
//a project is more than a script. Html file can be included too
//https://developers.google.com/apps-script/guides/projects
//https://www.youtube.com/watch?v=6zFowiTNhqI
//https://getbootstrap.com/
//use bootstrap for some nice templates
//https://developers.google.com/apps-script/guides/dialogs#code.gs_1
//https://developers.google.com/apps-script/reference/html/html-service#createHtmlOutput(String)
function showHelp() {
      const htmlServ = HtmlService.createTemplateFromFile("main");
      const html = htmlServ.evaluate();
      html.setWidth(425).setHeight(300);
      const ui = SpreadsheetApp.getUi();
//      ui.showSidebar(html);
      ui.showModalDialog(html, "help manual for all functions")
      
//  var html = HtmlService.createHtmlOutput('<b>Hello world!</b>').setTitle('Documentation').setWidth(300);
//  SpreadsheetApp.getUi().showSidebar(html);
}

// @file Color Character by Amino Acid type
//{@link https://support.google.com/docs/thread/11987044}
//https://github.com/contributorpw/google-apps-script-snippets/blob/master/snippets/sheets/spreadsheet_painting-specific-characters/painting-specific-characters.js

/**
  *@private
  *@customfunction
*/
function runAA() {
  var range = SpreadsheetApp.getActiveRange();
  paintingSpecificCharacters_(range);
//  paintingSpecificCharacters_(range, 'E', 'red');
//  paintingSpecificCharacters_(range, 'K', 'blue');
//  paintingSpecificCharacters_(range, 'R', 'blue');
//  paintingSpecificCharacters_(range, 'H', 'blue');
}

/**
  *@private
  *@customfunction
*/
function runSS() {
  var range = SpreadsheetApp.getActiveRange();
  paintingSpecificCharactersSS_(range);
}


/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @param {string} char
 * @param {string} color
 * @private
 */
function paintingSpecificCharacters_(range) {
  var textStyleBuilder = SpreadsheetApp.newTextStyle();
  var textStyle_red = textStyleBuilder.setForegroundColor('red').build();
  var textStyle_blue = textStyleBuilder.setForegroundColor('blue').build();
  var textStyle_grey = textStyleBuilder.setForegroundColor('grey').build();
  var textStyle_black = textStyleBuilder.setForegroundColor('black').build();
  var textStyle_green = textStyleBuilder.setForegroundColor('green').build();
  var textStyle_yellow = textStyleBuilder.setForegroundColor('yellow').build();
  
//  var length = char.length;
  
  var richTextValues = range.getRichTextValues().map(function(row) {
    return row.map(function(richTextValue) {
      var value = richTextValue.getText();
      var richTextBuilder = SpreadsheetApp.newRichTextValue();
      richTextBuilder.setText(value);
      //this part we can potentially add different colors
      //each values need to be adjusted
      
      //simple loop through value
      for (var i = 0; i < value.length; i++) {
        if ((value[i] == 'D') || (value[i] == 'E')) {
          richTextBuilder.setTextStyle(i, i+1, textStyle_red)
        }
        else if ((value[i] == 'R') || (value[i] == 'K') || (value[i] == 'H') ) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_blue)
        }
        else if ((value[i] == 'F') || (value[i] == 'W') || (value[i] == 'Y') || (value[i] == 'I') || (value[i] == 'L') || (value[i] == 'V') ) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_black)
        }
        else if ((value[i] == 'P')) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_green)
        }
        else if ((value[i] == 'C')) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_yellow)
        }
        else {
        richTextBuilder.setTextStyle(i, i+1, textStyle_grey)
        }
      }
//      var indexOf = value.indexOf(char);
//      while (indexOf > -1) {
//        richTextBuilder.setTextStyle(indexOf, indexOf + length, textStyle);
//        indexOf = value.indexOf(char, indexOf + length);
//      }
//      
      return richTextBuilder.build();
    });
  });

  range.setRichTextValues(richTextValues);
}


/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @param {string} char
 * @param {string} color
 * @private
 */
function paintingSpecificCharactersSS_(range) {
  var textStyleBuilder = SpreadsheetApp.newTextStyle();
  var textStyle_red = textStyleBuilder.setForegroundColor('red').build();
  var textStyle_blue = textStyleBuilder.setForegroundColor('blue').build();
  var textStyle_grey = textStyleBuilder.setForegroundColor('grey').build();
  var textStyle_black = textStyleBuilder.setForegroundColor('black').build();
  var textStyle_green = textStyleBuilder.setForegroundColor('green').build();
  var textStyle_yellow = textStyleBuilder.setForegroundColor('yellow').build();
  
//  var length = char.length;
  
  var richTextValues = range.getRichTextValues().map(function(row) {
    return row.map(function(richTextValue) {
      var value = richTextValue.getText();
      var richTextBuilder = SpreadsheetApp.newRichTextValue();
      richTextBuilder.setText(value);
      //this part we can potentially add different colors
      //each values need to be adjusted
      
      //simple loop through value
      for (var i = 0; i < value.length; i++) {
        if (value[i] == 'E') {
          richTextBuilder.setTextStyle(i, i+1, textStyle_red)
        }
        else if (value[i] == 'H' ) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_blue)
        }
        else if ((value[i] == 'C')) { 
          richTextBuilder.setTextStyle(i, i+1, textStyle_grey)
        }
      }
//      var indexOf = value.indexOf(char);
//      while (indexOf > -1) {
//        richTextBuilder.setTextStyle(indexOf, indexOf + length, textStyle);
//        indexOf = value.indexOf(char, indexOf + length);
//      }
//      
      return richTextBuilder.build();
    });
  });

  range.setRichTextValues(richTextValues);
}


//port many useful functions from SMS to Google sheet add on
//https://github.com/paulstothard/sequence_manipulation_suite/tree/master/docs/scripts
//The Sequence Manipulation Suite was written by Paul Stothard, University of Alberta

//sms_common.js
//utility functions are copied directly
function removeFormatting(sequence) {
  return sequence.replace(/[\d\s]/g, "");
}

function removeNonDna(sequence) {
  return sequence.replace(/[^gatucryswkmbdhvnxGATUCRYSWKMBDHVNX]/g, "");
}

function removeNonDnaStrict(sequence) {
  return sequence.replace(/[^gatucGATUC]/g, "");
}

function removeNonProtein(sequence) {
  return sequence.replace(
    /[^ACDEFGHIKLMNPQRSTVWYZacdefghiklmnpqrstvwyz\*]/g,
    ""
  );
}

function removeNonProteinStrict(sequence) {
  return sequence.replace(
    /[^ACDEFGHIKLMNPQRSTVWYZacdefghiklmnpqrstvwyz\*]/g,
    ""
  );
}

function removeNonProteinAllowDegen(sequence) {
  return sequence.replace(
    /[^ABCDEFGHIKLMNPQRSTVWYXZabcdefghiklmnpqrstvwyxz\*]/g,
    ""
  );
}

function removeNonProteinAllowX(sequence) {
  return sequence.replace(
    /[^ACDEFGHIKLMNPQRSTVWYZXacdefghiklmnpqrstvwyzx\*]/g,
    ""
  );
}

function removeWhiteSpace(text) {
  return text.replace(/\s/g, "");
}

function removeNonLetters(sequence) {
  return sequence.replace(/[^A-Z]/gi, "");
}

function verifyDna(dnaSequence) {
  if (dnaSequence.search(/[^gatucryswkmbdhvnx\s]/i) != -1) {
//    alert("The sequence contains non-DNA characters, which will be omitted.");
//  }
//  return true;
    throw new Error(dnaSequence+" contains non-DNA characters");
  } else {
    return true;
  }
}

function verifyProtein(proteinSequence) {
  if (proteinSequence.search(/[^acdefghiklmnpqrstvwyz\*\s]/i) != -1) {
//    alert(
//      "The sequence contains non-protein characters, which will be omitted."
//    );
//  }
//  return true;
    throw new Error(proteinSequence+" contains non-protein characters");
  } else {
    return true;
  }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_restriction_sites.js
function getRestrictionSiteString(type) {
  if (type.toLowerCase() == "standard") {
    return (
      "/aggcct/ (AatI agg|cct)3," +
      "/gacgtc/ (AatII gacgt|c)1," +
      "/tgcgca/ (Acc16I tgc|gca)3," +
      "/cgcg/ (AccII cg|cg)2," +
      "/tccgga/ (AccIII t|ccgga)5," +
      "/aacgtt/ (AclI aa|cgtt)4," +
      "/cacgtg/ (AcvI cac|gtg)3," +
      "/gtac/ (AfaI gt|ac)2," +
      "/agcgct/ (AfeI agc|gct)3," +
      "/cttaag/ (AflII c|ttaag)5," +
      "/accggt/ (AgeI a|ccggt)5," +
      "/actagt/ (AhlI a|ctagt)5," +
      "/gtgcac/ (Alw441 g|tgcac)5," +
      "/agct/ (AluI ag|ct)2," +
      "/agcgct/ (Aor51HI agc|gct)3," +
      "/gggccc/ (ApaI gggcc|c)1," +
      "/gtgcac/ (ApaLI g|tgcac)5," +
      "/ggcgcgcc/ (AscI gg|cgcgcc)6," +
      "/attaat/ (AseI at|taat)4," +
      "/ggtacc/ (Asp718I g|gtacc)5," +
      "/ttcgaa/ (AsuII tt|cgaa)4," +
      "/c[cty]cg[agr]g/ (AvaI c|ycgrg)5," +
      "/tgcgca/ (AviII tgc|gca)3," +
      "/cctagg/ (AvrII c|ctagg)5," +
      "/tggcca/ (BalI tgg|cca)3," +
      "/ggatcc/ (BamHI g|gatcc)5," +
      "/atcgat/ (BanIII at|cgat)4," +
      "/ggcgcc/ (BbeI ggcgc|c)1," +
      "/cacgtg/ (BbrPI cac|gtg)3," +
      "/gcatgc/ (BbuI gcatg|c)1," +
      "/actagt/ (BcuI a|ctagt)5," +
      "/tgatca/ (BclI t|gatca)5," +
      "/ctag/ (BfaI c|tag)3," +
      "/cttaag/ (BfrI c|ttaag)5," +
      "/atgcat/ (BfrBI atg|cat)3," +
      "/agatct/ (BglII a|gatct)5," +
      "/cctagg/ (BlnI c|ctagg)5," +
      "/atcgat/ (BseCI at|cgat)4," +
      "/gcgcgc/ (BsePI g|cgcgc)5," +
      "/cggccg/ (BseX3I c|ggccg)5," +
      "/accggt/ (BshTI a|ccggt)5," +
      "/tgtaca/ (Bsp1407I t|gtaca)5," +
      "/ccatgg/ (Bsp19I c|catgg)5," +
      "/atcgat/ (BspDI at|cgat)4," +
      "/tccgga/ (BspEI t|ccgga)5," +
      "/tgtaca/ (BsrGI t|gtaca)5," +
      "/gcgcgc/ (BssHII g|cgcgc)5," +
      "/cgcg/ (BstUI cg|cg)2," +
      "/atcgat/ (ClaI at|cgat)4," +
      "/gatc/ (DpnII |gatc)4," +
      "/tttaaa/ (DraI ttt|aaa)3," +
      "/cggccg/ (EagI c|ggccg)5," +
      "/gaattc/ (EcoRI g|aattc)5," +
      "/gatatc/ (EcoRV gat|atc)3," +
      "/ggcgcc/ (EgeI ggc|gcc)3," +
      "/ggccggcc/ (FseI ggccgg|cc)2," +
      "/tgcgca/ (FspI tgc|gca)3," +
      "/ggcc/ (HaeIII gg|cc)2," +
      "/gt[cty][agr]ac/ (HincII gty|rac)3," +
      "/aagctt/ (HindIII a|agctt)5," +
      "/ga[acgturyswkmbdhvn]tc/ (HinfI g|antc)4," +
      "/gttaac/ (HpaI gtt|aac)3," +
      "/ccgg/ (HpaII c|cgg)3," +
      "/ggcgcc/ (KasI g|gcgcc)5," +
      "/ggtacc/ (KpnI ggtac|c)1," +
      "/[acgturyswkmbdhvn]gatc[acgturyswkmbdhvn]/ (MboI |gatc)5," +
      "/caattg/ (MfeI c|aattg)5," +
      "/acgcgt/ (MluI a|cgcgt)5," +
      "/tggcca/ (MscI tgg|cca)3," +
      "/ttaa/ (MseI t|taa)3," +
      "/ccgg/ (MspI c|cgg)3," +
      "/gccggc/ (NaeI gcc|ggc)3," +
      "/ggcgcc/ (NarI gg|cgcc)4," +
      "/ccatgg/ (NcoI c|catgg)5," +
      "/catatg/ (NdeI ca|tatg)4," +
      "/gatc/ (NdeII |gatc)4," +
      "/gccggc/ (NgoMIV g|ccggc)5," +
      "/gctagc/ (NheI g|ctagc)5," +
      "/catg/ (NlaIII catg|)0," +
      "/gcggccgc/ (NotI gc|ggccgc)6," +
      "/tcgcga/ (NruI tcg|cga)3," +
      "/atgcat/ (NsiI atgca|t)1," +
      "/ttaattaa/ (PacI ttaat|taa)3," +
      "/acatgt/ (PciI a|catgt)5," +
      "/ggcc/ (PhoI gg|cc)2," +
      "/gtttaaac/ (PmeI gttt|aaac)4," +
      "/cacgtg/ (PmlI cac|gtg)3," +
      "/ttataa/ (PsiI tta|taa)3," +
      "/ctgcag/ (PstI ctgca|g)1," +
      "/cgatcg/ (PvuI cgat|cg)2," +
      "/cagctg/ (PvuII cag|ctg)3," +
      "/gtac/ (RsaI gt|ac)2," +
      "/gagctc/ (SacI gagct|c)1," +
      "/ccgcgg/ (SacII ccgc|gg)2," +
      "/gtcgac/ (SalI g|tcgac)5," +
      "/cctgcagg/ (SbfI cctgca|gg)2," +
      "/agtact/ (ScaI agt|act)3," +
      "/ggcgcc/ (SfoI ggc|gcc)3," +
      "/cccggg/ (SmaI ccc|ggg)3," +
      "/tacgta/ (SnaBI tac|gta)3," +
      "/actagt/ (SpeI a|ctagt)5," +
      "/gcatgc/ (SphI gcatg|c)1," +
      "/aatatt/ (SspI aat|att)3," +
      "/gagctc/ (SstI gagct|c)1," +
      "/ccgcgg/ (SstII ccgc|gg)2," +
      "/aggcct/ (StuI agg|cct)3," +
      "/atttaaat/ (SwaI attt|aaat)4," +
      "/tcga/ (TaqI t|cga)3," +
      "/ctcgag/ (TliI c|tcgag)5," +
      "/attaat/ (VspI at|taat)4," +
      "/tctaga/ (XbaI t|ctaga)5," +
      "/ctcgag/ (XhoI c|tcgag)5," +
      "/cccggg/ (XmaI c|ccggg)5"
    );
  }

  return true;
}



//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
function moreExpressionCheck(expressionToCheck) {
  if (
    expressionToCheck.search(/\[[A-Za-z\|]*\[/) != -1 ||
    expressionToCheck.search(/\][A-Za-z\|]*\]/) != -1 ||
    expressionToCheck.search(/\[\]/) != -1 ||
    expressionToCheck.search(/\/[A-Za-z\|]*\]/) != -1 ||
    expressionToCheck.search(/\[[A-Za-z\|]*\//) != -1 ||
    expressionToCheck.search(/\|\|/) != -1 ||
    expressionToCheck.search(/\/\|/) != -1 ||
    expressionToCheck.search(/\|\//) != -1 ||
    expressionToCheck.search(/\[.\]/) != -1 ||
    expressionToCheck.search(/\</) != -1 ||
    expressionToCheck.search(/\>/) != -1
  ) {
    return false;
  }
  return true;
}


function checkRestPatterns(arrayOfPatterns) {
  var z = 0;
  while (z < arrayOfPatterns.length) {
    if (
      arrayOfPatterns[z].search(
        /^\s*\/[acgturyswkmbdhvn\[\]]+\/\s+\([^\/]+\)\d+/i
      ) == -1
    ) {
      alert("One or more patterns have been entered incorrectly.");
      return false;
    }
    if (moreExpressionCheck(arrayOfPatterns[z]) == false) {
      alert("One or more patterns have been entered incorrectly.");
      return false;
    }
    z = z + 1;
  }
  return true;
}


//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
function writeRestrictionSites(sequence, arrayOfItems, dnaConformation) {
  var resultArray = new Array();
  var lookAhead = 50;
  var lowerLimit = 0;
  var upperLimit = sequence.length;
  var shiftValue = 0;
  var cutDistance;
  var matchExp;
  var matchPosition;
  var tempString;
  var backGroundClass;
  var matchArray;
  var timesFound = 0;
  var output="";
  if (dnaConformation == "circular") {
    shiftValue = sequence.substring(0, lookAhead).length;
    sequence =
      sequence.substring(sequence.length - lookAhead, sequence.length) +
      sequence +
      sequence.substring(0, lookAhead);
    lowerLimit = 0 + shiftValue;
    upperLimit = upperLimit + shiftValue;
  }
//  outputWindow.document.write(
//    '<table border="1" width="100%" cellspacing="0" cellpadding="2"><tbody>\n'
//  );
//  outputWindow.document.write(
//    '<tr><td class="title" width="200px">' +
//      "Site:" +
//      '</td><td class="title">' +
//      "Positions:" +
//      "</td></tr>\n"
//  );
  for (var i = 0; i < arrayOfItems.length; i++) {
    tempString = "none";
    backGroundClass = "many";
    matchExp = arrayOfItems[i].match(/\/.+\//) + "gi";
    matchPosition = 0;
    matchExp = eval(matchExp);
    cutDistance = parseFloat(
      arrayOfItems[i]
        .match(/\)\D*\d+/)
        .toString()
        .replace(/\)\D*/, "")
    );

    while ((matchArray = matchExp.exec(sequence))) {
      matchPosition = matchExp.lastIndex - cutDistance;
      if (matchPosition >= lowerLimit && matchPosition < upperLimit) {
        timesFound++;
        tempString = tempString + ", " + (matchPosition - shiftValue + 1);
      }
      matchExp.lastIndex = matchExp.lastIndex - RegExp.lastMatch.length + 1;
    }

    if (tempString.search(/\d/) != -1) {
      tempString = tempString.replace(/none,\s*/, "");
    }

//    if (timesFound == 0) {
//      backGroundClass = "none";
//    } else if (timesFound == 1) {
//      backGroundClass = "one";
//    } else if (timesFound == 2) {
//      backGroundClass = "two";
//    } else if (timesFound == 3) {
//      backGroundClass = "three";
//    } else {
//      backGroundClass = "many";
//    }
    if ( timesFound > 0 ) {
      output = output + arrayOfItems[i].match(/\([^\(]+\)/).toString().replace(/\(|\)/g, "")+" "+timesFound+";";
    }

//    outputWindow.document.write(
//      '<tr><td class="' +
//        backGroundClass +
//        '">' +
//        arrayOfItems[i]
//          .match(/\([^\(]+\)/)
//          .toString()
//          .replace(/\(|\)/g, "") +
//        '</td><td class="' +
//        backGroundClass +
//        '">' +
//        tempString +
//        "</td></tr>\n"
//    );

    timesFound = 0;
  }
//  outputWindow.document.write("</tbody></table>\n");
  return output;
}

//will need to add functions to check DNA or protein to handle errors or empty?
//maybe a good idea to throw an error first!!

//getSequenceFromFasta
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
/**
  *Function to get the sequence only field of input, ignore the ">" part
  *
  *@param {string} sequenceRecord Input DNA/protein sequence
  *@return sequence compoent
  *@customfunction
  *@private
*/
function getSequenceFromFasta(sequenceRecord) {
  if (sequenceRecord.map) {
  return sequenceRecord.map(getSequenceFromFasta);
  } else {
  if (sequenceRecord.search(/\>[^\f\n\r]+[\f\n\r]/) != -1) {
    sequenceRecord = sequenceRecord.replace(/\>[^\f\n\r]+[\f\n\r]/, "");
  }
  return sequenceRecord;
  }
}

//ScoringMatrix class
class ScoringMatrix {

    constructor() {
      this.scoreHash = {};
    }
//    
//    //create and throw away a prototype object
//    new ScoringMatrix();
    //------------------------------------ ScoringMatrix Abstract Class
    //ScoringMatrix getScore method
    scoringMatrix_getScore(r1, r2) {
      r1 = r1.toLowerCase();
      r2 = r2.toLowerCase();
      if (this.scoreHash[r1 + r2] == null) {
        throw "Unrecognized residue pair: " + r1 + ", " + r2 + ".";
      } else {
        return this.scoreHash[r1 + r2];
      }
    }
    
    scoringMatrix_fillHash(matrix) {
      var cols = matrix[0].split(/\s+/);
      var cells;
      //go through rows
      for (var i = 1; i < matrix.length; i++) {
        cells = matrix[i].split(/\s+/);
        //go through cells in this row
        for (var j = 1; j < cols.length + 1; j++) {
          this.scoreHash[
            cells[0].toLowerCase() + cols[j - 1].toLowerCase()
          ] = parseInt(cells[j]);
        }
      }
    }
    
//    //define object methods
//    ScoringMatrix.prototype.scoringMatrix_getScore = scoringMatrix_getScore;
//    ScoringMatrix.prototype.scoringMatrix_fillHash = scoringMatrix_fillHash;
    
    //------------------------------------ Blosum62 Class extends ScoringMatrix Class
    //constructor
    Blosum62() {
      var matrix = new Array(
        "A  R  N  D  C  Q  E  G  H  I  L  K  M  F  P  S  T  W  Y  V",
        "A  4 -1 -2 -2  0 -1 -1  0 -2 -1 -1 -1 -1 -2 -1  1  0 -3 -2  0",
        "R -1  5  0 -2 -3  1  0 -2  0 -3 -2  2 -1 -3 -2 -1 -1 -3 -2 -3",
        "N -2  0  6  1 -3  0  0  0  1 -3 -3  0 -2 -3 -2  1  0 -4 -2 -3",
        "D -2 -2  1  6 -3  0  2 -1 -1 -3 -4 -1 -3 -3 -1  0 -1 -4 -3 -3",
        "C  0 -3 -3 -3  9 -3 -4 -3 -3 -1 -1 -3 -1 -2 -3 -1 -1 -2 -2 -1",
        "Q -1  1  0  0 -3  5  2 -2  0 -3 -2  1  0 -3 -1  0 -1 -2 -1 -2",
        "E -1  0  0  2 -4  2  5 -2  0 -3 -3  1 -2 -3 -1  0 -1 -3 -2 -2",
        "G  0 -2  0 -1 -3 -2 -2  6 -2 -4 -4 -2 -3 -3 -2  0 -2 -2 -3 -3",
        "H -2  0  1 -1 -3  0  0 -2  8 -3 -3 -1 -2 -1 -2 -1 -2 -2  2 -3",
        "I -1 -3 -3 -3 -1 -3 -3 -4 -3  4  2 -3  1  0 -3 -2 -1 -3 -1  3",
        "L -1 -2 -3 -4 -1 -2 -3 -4 -3  2  4 -2  2  0 -3 -2 -1 -2 -1  1",
        "K -1  2  0 -1 -3  1  1 -2 -1 -3 -2  5 -1 -3 -1  0 -1 -3 -2 -2",
        "M -1 -1 -2 -3 -1  0 -2 -3 -2  1  2 -1  5  0 -2 -1 -1 -1 -1  1",
        "F -2 -3 -3 -3 -2 -3 -3 -3 -1  0  0 -3  0  6 -4 -2 -2  1  3 -1",
        "P -1 -2 -2 -1 -3 -1 -1 -2 -2 -3 -3 -1 -2 -4  7 -1 -1 -4 -3 -2",
        "S  1 -1  1  0 -1  0  0  0 -1 -2 -2  0 -1 -2 -1  4  1 -3 -2 -2",
        "T  0 -1  0 -1 -1 -1 -1 -2 -2 -1 -1 -1 -1 -2 -1  1  5 -2 -2  0",
        "W -3 -3 -4 -4 -2 -2 -3 -2 -2 -3 -2 -3 -1  1 -4 -3 -2 11  2 -3",
        "Y -2 -2 -2 -3 -2 -1 -2 -3  2 -1 -1 -2 -1  3 -3 -2 -2  2  7 -1",
        "V  0 -3 -3 -3 -1 -2 -2 -3 -3  3  1 -2  1 -1 -2 -2  0 -3 -1  4"
      );
    
      this.scoringMatrix_fillHash(matrix);
    }
    
//    Blosum62.prototype = new ScoringMatrix();
    
    //------------------------------------ Blosum45 Class extends ScoringMatrix Class
    //constructor
    Blosum45() {
      var matrix = new Array(
        "A  R  N  D  C  Q  E  G  H  I  L  K  M  F  P  S  T  W  Y  V",
        "A  5 -2 -1 -2 -1 -1 -1  0 -2 -1 -1 -1 -1 -2 -1  1  0 -2 -2  0",
        "R -2  7  0 -1 -3  1  0 -2  0 -3 -2  3 -1 -2 -2 -1 -1 -2 -1 -2",
        "N -1  0  6  2 -2  0  0  0  1 -2 -3  0 -2 -2 -2  1  0 -4 -2 -3",
        "D -2 -1  2  7 -3  0  2 -1  0 -4 -3  0 -3 -4 -1  0 -1 -4 -2 -3",
        "C -1 -3 -2 -3 12 -3 -3 -3 -3 -3 -2 -3 -2 -2 -4 -1 -1 -5 -3 -1",
        "Q -1  1  0  0 -3  6  2 -2  1 -2 -2  1  0 -4 -1  0 -1 -2 -1 -3",
        "E -1  0  0  2 -3  2  6 -2  0 -3 -2  1 -2 -3  0  0 -1 -3 -2 -3",
        "G  0 -2  0 -1 -3 -2 -2  7 -2 -4 -3 -2 -2 -3 -2  0 -2 -2 -3 -3",
        "H -2  0  1  0 -3  1  0 -2 10 -3 -2 -1  0 -2 -2 -1 -2 -3  2 -3",
        "I -1 -3 -2 -4 -3 -2 -3 -4 -3  5  2 -3  2  0 -2 -2 -1 -2  0  3",
        "L -1 -2 -3 -3 -2 -2 -2 -3 -2  2  5 -3  2  1 -3 -3 -1 -2  0  1",
        "K -1  3  0  0 -3  1  1 -2 -1 -3 -3  5 -1 -3 -1 -1 -1 -2 -1 -2",
        "M -1 -1 -2 -3 -2  0 -2 -2  0  2  2 -1  6  0 -2 -2 -1 -2  0  1",
        "F -2 -2 -2 -4 -2 -4 -3 -3 -2  0  1 -3  0  8 -3 -2 -1  1  3  0",
        "P -1 -2 -2 -1 -4 -1  0 -2 -2 -2 -3 -1 -2 -3  9 -1 -1 -3 -3 -3",
        "S  1 -1  1  0 -1  0  0  0 -1 -2 -3 -1 -2 -2 -1  4  2 -4 -2 -1",
        "T  0 -1  0 -1 -1 -1 -1 -2 -2 -1 -1 -1 -1 -1 -1  2  5 -3 -1  0",
        "W -2 -2 -4 -4 -5 -2 -3 -2 -3 -2 -2 -2 -2  1 -3 -4 -3 15  3 -3",
        "Y -2 -1 -2 -2 -3 -1 -2 -3  2  0  0 -1  0  3 -3 -2 -1  3  8 -1",
        "V  0 -2 -3 -3 -1 -3 -3 -3 -3  3  1 -2  1  0 -3 -1  0 -3 -1  5"
      );
    
      this.scoringMatrix_fillHash(matrix);
    }
    
//    Blosum45.prototype = new ScoringMatrix();
    
    //------------------------------------ Blosum80 Class extends ScoringMatrix Class
    //constructor
    Blosum80() {
      var matrix = new Array(
        "A  R  N  D  C  Q  E  G  H  I  L  K  M  F  P  S  T  W  Y  V",
        "A  5 -2 -2 -2 -1 -1 -1  0 -2 -2 -2 -1 -1 -3 -1  1  0 -3 -2  0",
        "R -2  6 -1 -2 -4  1 -1 -3  0 -3 -3  2 -2 -4 -2 -1 -1 -4 -3 -3",
        "N -2 -1  6  1 -3  0 -1 -1  0 -4 -4  0 -3 -4 -3  0  0 -4 -3 -4",
        "D -2 -2  1  6 -4 -1  1 -2 -2 -4 -5 -1 -4 -4 -2 -1 -1 -6 -4 -4",
        "C -1 -4 -3 -4  9 -4 -5 -4 -4 -2 -2 -4 -2 -3 -4 -2 -1 -3 -3 -1",
        "Q -1  1  0 -1 -4  6  2 -2  1 -3 -3  1  0 -4 -2  0 -1 -3 -2 -3",
        "E -1 -1 -1  1 -5  2  6 -3  0 -4 -4  1 -2 -4 -2  0 -1 -4 -3 -3",
        "G  0 -3 -1 -2 -4 -2 -3  6 -3 -5 -4 -2 -4 -4 -3 -1 -2 -4 -4 -4",
        "H -2  0  0 -2 -4  1  0 -3  8 -4 -3 -1 -2 -2 -3 -1 -2 -3  2 -4",
        "I -2 -3 -4 -4 -2 -3 -4 -5 -4  5  1 -3  1 -1 -4 -3 -1 -3 -2  3",
        "L -2 -3 -4 -5 -2 -3 -4 -4 -3  1  4 -3  2  0 -3 -3 -2 -2 -2  1",
        "K -1  2  0 -1 -4  1  1 -2 -1 -3 -3  5 -2 -4 -1 -1 -1 -4 -3 -3",
        "M -1 -2 -3 -4 -2  0 -2 -4 -2  1  2 -2  6  0 -3 -2 -1 -2 -2  1",
        "F -3 -4 -4 -4 -3 -4 -4 -4 -2 -1  0 -4  0  6 -4 -3 -2  0  3 -1",
        "P -1 -2 -3 -2 -4 -2 -2 -3 -3 -4 -3 -1 -3 -4  8 -1 -2 -5 -4 -3",
        "S  1 -1  0 -1 -2  0  0 -1 -1 -3 -3 -1 -2 -3 -1  5  1 -4 -2 -2",
        "T  0 -1  0 -1 -1 -1 -1 -2 -2 -1 -2 -1 -1 -2 -2  1  5 -4 -2  0",
        "W -3 -4 -4 -6 -3 -3 -4 -4 -3 -3 -2 -4 -2  0 -5 -4 -4 11  2 -3",
        "Y -2 -3 -3 -4 -3 -2 -3 -4  2 -2 -2 -3 -2  3 -4 -2 -2  2  7 -2",
        "V  0 -3 -4 -4 -1 -3 -3 -4 -4  3  1 -3  1 -1 -3 -2  0 -3 -2  4"
      );
    
      this.scoringMatrix_fillHash(matrix);
    }
    
//    Blosum80.prototype = new ScoringMatrix();
    
    //------------------------------------ Pam70 Class extends ScoringMatrix Class
    //constructor
    Pam70() {
      var matrix = new Array(
        "A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V",
        "A   5  -4  -2  -1  -4  -2  -1   0  -4  -2  -4  -4  -3  -6   0   1   1  -9  -5  -1",
        "R  -4   8  -3  -6  -5   0  -5  -6   0  -3  -6   2  -2  -7  -2  -1  -4   0  -7  -5",
        "N  -2  -3   6   3  -7  -1   0  -1   1  -3  -5   0  -5  -6  -3   1   0  -6  -3  -5",
        "D  -1  -6   3   6  -9   0   3  -1  -1  -5  -8  -2  -7 -10  -4  -1  -2 -10  -7  -5",
        "C  -4  -5  -7  -9   9  -9  -9  -6  -5  -4 -10  -9  -9  -8  -5  -1  -5 -11  -2  -4",
        "Q  -2   0  -1   0  -9   7   2  -4   2  -5  -3  -1  -2  -9  -1  -3  -3  -8  -8  -4",
        "E  -1  -5   0   3  -9   2   6  -2  -2  -4  -6  -2  -4  -9  -3  -2  -3 -11  -6  -4",
        "G   0  -6  -1  -1  -6  -4  -2   6  -6  -6  -7  -5  -6  -7  -3   0  -3 -10  -9  -3",
        "H  -4   0   1  -1  -5   2  -2  -6   8  -6  -4  -3  -6  -4  -2  -3  -4  -5  -1  -4",
        "I  -2  -3  -3  -5  -4  -5  -4  -6  -6   7   1  -4   1   0  -5  -4  -1  -9  -4   3",
        "L  -4  -6  -5  -8 -10  -3  -6  -7  -4   1   6  -5   2  -1  -5  -6  -4  -4  -4   0",
        "K  -4   2   0  -2  -9  -1  -2  -5  -3  -4  -5   6   0  -9  -4  -2  -1  -7  -7  -6",
        "M  -3  -2  -5  -7  -9  -2  -4  -6  -6   1   2   0  10  -2  -5  -3  -2  -8  -7   0",
        "F  -6  -7  -6 -10  -8  -9  -9  -7  -4   0  -1  -9  -2   8  -7  -4  -6  -2   4  -5",
        "P   0  -2  -3  -4  -5  -1  -3  -3  -2  -5  -5  -4  -5  -7   7   0  -2  -9  -9  -3",
        "S   1  -1   1  -1  -1  -3  -2   0  -3  -4  -6  -2  -3  -4   0   5   2  -3  -5  -3",
        "T   1  -4   0  -2  -5  -3  -3  -3  -4  -1  -4  -1  -2  -6  -2   2   6  -8  -4  -1",
        "W  -9   0  -6 -10 -11  -8 -11 -10  -5  -9  -4  -7  -8  -2  -9  -3  -8  13  -3 -10",
        "Y  -5  -7  -3  -7  -2  -8  -6  -9  -1  -4  -4  -7  -7   4  -9  -5  -4  -3   9  -5",
        "V  -1  -5  -5  -5  -4  -4  -4  -3  -4   3   0  -6   0  -5  -3  -3  -1 -10  -5   6"
      );
    
      this.scoringMatrix_fillHash(matrix);
    }
    
//    Pam70.prototype = new ScoringMatrix();
    
    //------------------------------------ Pam30 Class extends ScoringMatrix Class
    //constructor
    Pam30() {
      var matrix = new Array(
        "A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V",
        "A   6  -7  -4  -3  -6  -4  -2  -2  -7  -5  -6  -7  -5  -8  -2   0  -1 -13  -8  -2",
        "R  -7   8  -6 -10  -8  -2  -9  -9  -2  -5  -8   0  -4  -9  -4  -3  -6  -2 -10  -8",
        "N  -4  -6   8   2 -11  -3  -2  -3   0  -5  -7  -1  -9  -9  -6   0  -2  -8  -4  -8",
        "D  -3 -10   2   8 -14  -2   2  -3  -4  -7 -12  -4 -11 -15  -8  -4  -5 -15 -11  -8",
        "C  -6  -8 -11 -14  10 -14 -14  -9  -7  -6 -15 -14 -13 -13  -8  -3  -8 -15  -4  -6",
        "Q  -4  -2  -3  -2 -14   8   1  -7   1  -8  -5  -3  -4 -13  -3  -5  -5 -13 -12  -7",
        "E  -2  -9  -2   2 -14   1   8  -4  -5  -5  -9  -4  -7 -14  -5  -4  -6 -17  -8  -6",
        "G  -2  -9  -3  -3  -9  -7  -4   6  -9 -11 -10  -7  -8  -9  -6  -2  -6 -15 -14  -5",
        "H  -7  -2   0  -4  -7   1  -5  -9   9  -9  -6  -6 -10  -6  -4  -6  -7  -7  -3  -6",
        "I  -5  -5  -5  -7  -6  -8  -5 -11  -9   8  -1  -6  -1  -2  -8  -7  -2 -14  -6   2",
        "L  -6  -8  -7 -12 -15  -5  -9 -10  -6  -1   7  -8   1  -3  -7  -8  -7  -6  -7  -2",
        "K  -7   0  -1  -4 -14  -3  -4  -7  -6  -6  -8   7  -2 -14  -6  -4  -3 -12  -9  -9",
        "M  -5  -4  -9 -11 -13  -4  -7  -8 -10  -1   1  -2  11  -4  -8  -5  -4 -13 -11  -1",
        "F  -8  -9  -9 -15 -13 -13 -14  -9  -6  -2  -3 -14  -4   9 -10  -6  -9  -4   2  -8",
        "P  -2  -4  -6  -8  -8  -3  -5  -6  -4  -8  -7  -6  -8 -10   8  -2  -4 -14 -13  -6",
        "S   0  -3   0  -4  -3  -5  -4  -2  -6  -7  -8  -4  -5  -6  -2   6   0  -5  -7  -6",
        "T  -1  -6  -2  -5  -8  -5  -6  -6  -7  -2  -7  -3  -4  -9  -4   0   7 -13  -6  -3",
        "W -13  -2  -8 -15 -15 -13 -17 -15  -7 -14  -6 -12 -13  -4 -14  -5 -13  13  -5 -15",
        "Y  -8 -10  -4 -11  -4 -12  -8 -14  -3  -6  -7  -9 -11   2 -13  -7  -6  -5  10  -7",
        "V  -2  -8  -8  -8  -6  -7  -6  -5  -6   2  -2  -9  -1  -8  -6  -6  -3 -15  -7   7"
      );
    
      this.scoringMatrix_fillHash(matrix);
    }
    
//    Pam30.prototype = new ScoringMatrix();
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pairwise_align_dna.js
//------------------------------------ Identity ScoringMatrix abstract class
class Identity {
//constructor
    constructor() {
      this.match;
      this.mismatch;
    }

//------------------------------------ Identity class extends ScoringMatrix Class
//Identity class setMismatch method
  setMismatch(mismatchScore) {
    this.mismatch = mismatchScore;
  }

//Identity class setMatch method
  setMatch(matchScore) {
    this.match = matchScore;
  }

//ScoringMatrix getScore method
  scoringMatrix_getScore(r1, r2) {
    r1 = r1.toLowerCase();
    r2 = r2.toLowerCase();
    if (r1 == r2) {
      return this.match;
    } else {
      return this.mismatch;
    }
  }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pcr_primer_stats.js
////Complementarity class
class Complementarity {
  //constructor
    constructor() {
      this.match;
      this.mismatch;
    }

  //Complementarity class setMismatch method
   setMismatch(mismatchScore) {
    this.mismatch = mismatchScore;
  }
  
  //Complementarity class setMatch method
   setMatch(matchScore) {
    this.match = matchScore;
  }
  
    //Complementarity class getMismatch method
   getMismatch() {
    return this.mismatch;
  }
  
  //Complementarity class getMatch method
   getMatch() {
    return this.match;
  }
  
  scoringMatrix_getScore(r1, r2) {
  r1 = r1.toLowerCase();
  r2 = r2.toLowerCase();
  if ((r1 == "g" && r2 == "c") || (r2 == "g" && r1 == "c")) {
    return this.match;
  } else if ((r1 == "a" && r2 == "t") || (r2 == "a" && r1 == "t")) {
    return this.match;
  } else {
    return this.mismatch;
  }
}
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pairwise_align_protein.js
    //------------------------------------ ScoreSet class
class ScoreSet {    
    //ScoreSet getScore
    getScore(r1, r2) {
      return this.scoringMatrix.scoringMatrix_getScore(r1, r2);
    }
    
    //ScoreSet setScoreSetParam
    setScoreSetParam(
      scoringMatrix,
      gapPenalty,
      beginGapPenalty,
      endGapPenalty
    ) {
      this.scoringMatrix = scoringMatrix;
      this.gap = gapPenalty;
      this.beginGap = beginGapPenalty;
      this.endGap = endGapPenalty;
    }
    
    //ScoreSet class
    ScoreSet() {
      this.scoringMatrix;
      this.gap;
      this.beginGap;
      this.endGap;
      this.useBeginGapTop = true;
      this.useBeginGapLeft = true;
      this.useEndGapBottom = true;
      this.useEndGapRight = true;
    }
}    
//    //create and throw away a prototype object
//    new ScoreSet();
//    
//    //define object methods
//    ScoreSet.prototype.getScore = getScore;
//    ScoreSet.prototype.setScoreSetParam = setScoreSetParam;

//alignment
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pairwise_align_protein.js
//------------------------------------ AlignPairLinear class
class AlignPairLinear {


//AlignPairLinear class
AlignPairLinear() {
  this.M;
  this.N;
  this.alignedM;
  this.alignedN;
  this.scoreSet;
  this.Sn;
  this.Sp;
  this.score;
}

//AlignPairLinear class align() method
align() {
  if (this.M.length == 0) {
    for (var j = 1; j <= this.N.length; j++) {
      this.alignedM.push("-");
      this.alignedN.push(this.N[j - 1]);
      this.score = this.score + this.scoreSet.gap;
    }
  } else if (this.N.length == 0) {
    for (var j = 1; j <= this.M.length; j++) {
      this.alignedN.push("-");
      this.alignedM.push(this.M[j - 1]);
      this.score = this.score + this.scoreSet.gap;
    }
  } else if (this.M.length == 0 && this.N.length == 0) {
    //do nothing
  } else {
    this.path(0, 0, this.M.length, this.N.length);
  }
}

//AlignPairLinear class recursive method path()
path(i1, j1, i2, j2) {
  //alert ("i1, j1, : i2, j2 " + i1 +", " + j1 + ", " + i2 + ", " + j2);

  if (i1 + 1 == i2 || j1 == j2) {
    //align using quadratic space alignment
    var subM = new Array();
    var subN = new Array();

    for (var i = i1 + 1; i <= i2; i++) {
      subM.push(this.M[i - 1]);
    }

    for (var j = j1 + 1; j <= j2; j++) {
      subN.push(this.N[j - 1]);
    }

    var alignment = new AlignPairQuad();

    var subScoreSet = new ScoreSet();
    if (j1 == j2) {
      if (j1 == 0) {
        subScoreSet.setScoreSetParam(
          this.scoreSet.scoringMatrix,
          this.scoreSet.beginGap,
          this.scoreSet.beginGap,
          this.scoreSet.beginGap
        );
      } else if (j1 == this.N.length) {
        subScoreSet.setScoreSetParam(
          this.scoreSet.scoringMatrix,
          this.scoreSet.endGap,
          this.scoreSet.endGap,
          this.scoreSet.endGap
        );
      } else {
        subScoreSet.setScoreSetParam(
          this.scoreSet.scoringMatrix,
          this.scoreSet.gap,
          this.scoreSet.gap,
          this.scoreSet.gap
        );
      }
    } else {
      subScoreSet.setScoreSetParam(
        this.scoreSet.scoringMatrix,
        this.scoreSet.gap,
        this.scoreSet.beginGap,
        this.scoreSet.endGap
      );
      subScoreSet.useBeginGapTop = false;
      subScoreSet.useBeginGapLeft = false;
      subScoreSet.useEndGapBottom = false;
      subScoreSet.useEndGapRight = false;

      if (i1 == 0) {
        subScoreSet.useBeginGapTop = true;
      }

      if (j1 == 0) {
        subScoreSet.useBeginGapLeft = true;
      }

      if (j2 == this.N.length) {
        subScoreSet.useEndGapRight = true;
      }

      if (i2 == this.M.length) {
        subScoreSet.useEndGapBottom = true;
      }
    }

    alignment.initializeMatrix(subM, subN, subScoreSet);
    alignment.fillMatrix();
    alignment.align();
    //alignment.dumpMatrix();
    this.alignedM.push(alignment.getAlignedM());
    this.alignedN.push(alignment.getAlignedN());

    this.score = this.score + alignment.score;
  } else {
    var middle = Math.floor((i1 + i2) / 2);

    //linear-space computation of alignment score to middle row
    //forward pass

    //gaps along top

    this.Sn[j1] = 0;

    if (i1 == 0) {
      for (var j = j1 + 1; j <= j2; j++) {
        this.Sn[j] = this.Sn[j - 1] - this.scoreSet.beginGap;
      }
    } else {
      for (var j = j1 + 1; j <= j2; j++) {
        this.Sn[j] = this.Sn[j - 1] - this.scoreSet.gap;
      }
    }

    //now continue down rows to middle row
    var diag;
    var left;
    //for (var i = i1 + 1; i <= i2; i++) {
    for (var i = i1 + 1; i <= middle; i++) {
      diag = this.Sn[j1];
      left;
      if (j1 == 0) {
        left = this.Sn[j1] - this.scoreSet.beginGap;
      } else {
        left = this.Sn[j1] - this.scoreSet.gap;
      }

      this.Sn[j1] = left;

      //we need three values to set the score: diag, left, and above to fill in the row
      for (var j = j1 + 1; j <= j2; j++) {
        //above will be in the this.Sn array, which is holding a mixture of the previous row and the new row
        //var above = this.Sn[j];

        //pick max of three and store in next left
        if (j == this.N.length && i == this.M.length) {
          left = Math.max(
            this.Sn[j] - this.scoreSet.endGap,
            Math.max(
              left - this.scoreSet.endGap,
              diag + this.scoreSet.getScore(this.M[i - 1], this.N[j - 1])
            )
          );
        } else if (i == this.M.length) {
          left = Math.max(
            this.Sn[j] - this.scoreSet.gap,
            Math.max(
              left - this.scoreSet.endGap,
              diag + this.scoreSet.getScore(this.M[i - 1], this.N[j - 1])
            )
          );
        } else if (j == this.N.length) {
          left = Math.max(
            this.Sn[j] - this.scoreSet.endGap,
            Math.max(
              left - this.scoreSet.gap,
              diag + this.scoreSet.getScore(this.M[i - 1], this.N[j - 1])
            )
          );
        } else {
          left = Math.max(
            this.Sn[j] - this.scoreSet.gap,
            Math.max(
              left - this.scoreSet.gap,
              diag + this.scoreSet.getScore(this.M[i - 1], this.N[j - 1])
            )
          );
        }
        diag = this.Sn[j];

        //prepares this.Sn for use in next iteration of i loop
        this.Sn[j] = left;
      }
    }

    //linear-space computation of alignment score to middle row
    //reverse pass

    //gaps along bottom

    this.Sp[j2] = 0;

    if (i2 == this.M.length) {
      for (var j = j2 - 1; j >= j1; j--) {
        this.Sp[j] = this.Sp[j + 1] - this.scoreSet.endGap;
      }
    } else {
      for (var j = j2 - 1; j >= j1; j--) {
        this.Sp[j] = this.Sp[j + 1] - this.scoreSet.gap;
      }
    }

    //now continue up rows to middle row
    var right;
    //for (var i = i2 - 1; i >= i1; i--) {
    for (var i = i2 - 1; i >= middle; i--) {
      diag = this.Sp[j2];
      if (j2 == this.N.length) {
        right = this.Sp[j2] - this.scoreSet.endGap;
      } else {
        right = this.Sp[j2] - this.scoreSet.gap;
      }

      this.Sp[j2] = right;

      //we need three values to set the score: diag, right, and below to fill in the row
      for (var j = j2 - 1; j >= j1; j--) {
        //below will be in the this.Sp array, which is holding a mixture of the previous row and the new row
        //var below = this.Sp[j];

        //pick max of three and store in next right
        if (j == 0 && i == 0) {
          right = Math.max(
            this.Sp[j] - this.scoreSet.beginGap,
            Math.max(
              right - this.scoreSet.beginGap,
              diag +
                this.scoreSet.getScore(this.M[i + 1 - 1], this.N[j + 1 - 1])
            )
          );
        } else if (j == 0) {
          right = Math.max(
            this.Sp[j] - this.scoreSet.beginGap,
            Math.max(
              right - this.scoreSet.gap,
              diag +
                this.scoreSet.getScore(this.M[i + 1 - 1], this.N[j + 1 - 1])
            )
          );
        } else if (i == 0) {
          right = Math.max(
            this.Sp[j] - this.scoreSet.gap,
            Math.max(
              right - this.scoreSet.beginGap,
              diag +
                this.scoreSet.getScore(this.M[i + 1 - 1], this.N[j + 1 - 1])
            )
          );
        } else {
          right = Math.max(
            this.Sp[j] - this.scoreSet.gap,
            Math.max(
              right - this.scoreSet.gap,
              diag +
                this.scoreSet.getScore(this.M[i + 1 - 1], this.N[j + 1 - 1])
            )
          );
        }
        diag = this.Sp[j];
        this.Sp[j] = right;
      }
    }

    //now find the value of j that maximizes this.Sn[j] + this.Sp[j]
    //this point will be in the maximum scoring path in the final alignment.
    //once we have this point we can divide the problem into two new problems,

    var maxValue = this.Sn[j1] + this.Sp[j1];
    var maxJ = j1;

    for (var j = j1 + 1; j <= j2; j++) {
      if (this.Sn[j] + this.Sp[j] >= maxValue) {
        maxValue = this.Sn[j] + this.Sp[j];
        maxJ = j;
      }
    }

    this.path(i1, j1, middle, maxJ);
    this.path(middle, maxJ, i2, j2);
  }
}

//AlignPairLinear class getAlignedM() method
getAlignedM() {
  return this.alignedM.join("");
}

//AlignPairLinear class getAlignedN() method
getAlignedN() {
  return this.alignedN.join("");
}

//AlignPairLinear class setAlignParam method
setAlignParam(M, N, scoreSet) {
  this.M = M;
  this.N = N;
  this.alignedM = new Array();
  this.alignedN = new Array();
  this.scoreSet = scoreSet;
  this.Sn = new Array(this.N.length);
  this.Sp = new Array(this.N.length);
  this.score = 0;
}

}
////create and throw away a prototype object
//new AlignPairLinear();
//
////define object methods
//AlignPairLinear.prototype.align = align;
//AlignPairLinear.prototype.path = path;
//AlignPairLinear.prototype.setAlignParam = setAlignParam;
//AlignPairLinear.prototype.getAlignedM = getAlignedM;
//AlignPairLinear.prototype.getAlignedN = getAlignedN;

//------------------------------------ Node class
class Node {
  Node() {
  this.value;
  this.tracebackI;
  this.tracebackJ;
  }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/align_pair_codons_quad.js
//don't think this function works!!
class AlignPairQuad {

    //AlignPairQuad class
    AlignPairQuad() {
      this.M;
      this.N;
      this.scoreSet;
      this.nodes;
      this.alignedM;
      this.alignedN;
      this.score;
    }

    //AlignPairQuad class initializeMatrix method
    initializeMatrix(sequenceOne, sequenceTwo, scoreSet) {
      this.scoreSet = scoreSet;
    
      this.M = sequenceOne;
      this.N = sequenceTwo;
      this.score = 0;
    
      //create an two-dimensional array of nodes
      this.nodes = new Array(this.M.length + 1);
    
      //row i
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i] = new Array(this.N.length + 1);
        //column j
        for (var j = 0; j < this.nodes[i].length; j++) {
          this.nodes[i][j] = new Node();
        }
      }
    
      this.nodes[0][0].value = 0;
    
      //i rows
      for (var i = 1; i < this.nodes.length; i++) {
        if (this.scoreSet.useBeginGapLeft) {
          this.nodes[i][0].value =
            this.nodes[i - 1][0].value - this.scoreSet.beginGap;
        } else {
          this.nodes[i][0].value = this.nodes[i - 1][0].value - this.scoreSet.gap;
        }
        this.nodes[i][0].tracebackI = i - 1;
        this.nodes[i][0].tracebackJ = 0;
      }
    
      //j columns
      for (var j = 1; j < this.nodes[0].length; j++) {
        if (this.scoreSet.useBeginGapTop) {
          this.nodes[0][j].value =
            this.nodes[0][j - 1].value - this.scoreSet.beginGap;
        } else {
          this.nodes[0][j].value = this.nodes[0][j - 1].value - this.scoreSet.gap;
        }
        this.nodes[0][j].tracebackI = 0;
        this.nodes[0][j].tracebackJ = j - 1;
      }
    }
    
    //AlignPairQuad class dumpMatrix method
    dumpMatrix() {
    //  outputWindow.document.write(
    //    "Dynamic programming matrix i=" +
    //      this.nodes.length +
    //      " and j=" +
    //      this.nodes[0].length
    //  );
    //  outputWindow.document.write("\n");
      var output="";
      for (var i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < this.nodes[i].length; j++) {
          var traceI = this.nodes[i][j].tracebackI;
          var traceJ = this.nodes[i][j].tracebackJ;
    
          if (traceI == undefined) {
            traceI = "u";
          }
          if (traceJ == undefined) {
            traceJ = "u";
          }
          var output = output + 
            "(" +
            i +
            "," +
            j +
            ")[" +
            traceI +
            "," +
            traceJ +
            "]=" +
            this.nodes[i][j].value;
    //      outputWindow.document.write(rightNum(output, "", 20, " "));
        }
    //    outputWindow.document.write("\n");
      }
    //  outputWindow.document.write("\n");
       return output;
    }
    
    //AlignPairQuad class fillMatrix method
    fillMatrix() {
      //i rows
      for (var i = 1; i < this.nodes.length; i++) {
        //j columns
        for (var j = 1; j < this.nodes[0].length; j++) {
          var a;
          var b;
          var c;
    
          //handle end gaps here
    
          if (i == this.nodes.length - 1 && j == this.nodes[0].length - 1) {
            if (this.scoreSet.useEndGapRight) {
              a = this.nodes[i - 1][j].value - this.scoreSet.endGap;
            } else {
              a = this.nodes[i - 1][j].value - this.scoreSet.gap;
            }
    
            if (this.scoreSet.useEndGapBottom) {
              b = this.nodes[i][j - 1].value - this.scoreSet.endGap;
            } else {
              b = this.nodes[i][j - 1].value - this.scoreSet.gap;
            }
          } else if (i == this.nodes.length - 1) {
            a = this.nodes[i - 1][j].value - this.scoreSet.gap;
            if (this.scoreSet.useEndGapBottom) {
              b = this.nodes[i][j - 1].value - this.scoreSet.endGap;
            } else {
              b = this.nodes[i][j - 1].value - this.scoreSet.gap;
            }
          } else if (j == this.nodes[0].length - 1) {
            if (this.scoreSet.useEndGapRight) {
              a = this.nodes[i - 1][j].value - this.scoreSet.endGap;
            } else {
              a = this.nodes[i - 1][j].value - this.scoreSet.gap;
            }
            b = this.nodes[i][j - 1].value - this.scoreSet.gap;
          } else {
            a = this.nodes[i - 1][j].value - this.scoreSet.gap;
            b = this.nodes[i][j - 1].value - this.scoreSet.gap;
          }
    
          c =
            this.nodes[i - 1][j - 1].value +
            this.scoreSet.getScore(this.M[i - 1], this.N[j - 1]);
    
          if (a >= b && a >= c) {
            this.nodes[i][j].value = a;
            this.nodes[i][j].tracebackI = i - 1;
            this.nodes[i][j].tracebackJ = j;
          } else if (b >= c && b >= a) {
            this.nodes[i][j].value = b;
            this.nodes[i][j].tracebackI = i;
            this.nodes[i][j].tracebackJ = j - 1;
          } else {
            this.nodes[i][j].value = c;
            this.nodes[i][j].tracebackI = i - 1;
            this.nodes[i][j].tracebackJ = j - 1;
          }
        }
      }
      this.score = this.nodes[this.nodes.length - 1][
        this.nodes[0].length - 1
      ].value;
    }
    
    //AlignPairQuad class align() method
    align() {
      this.alignedM = new Array();
      this.alignedN = new Array();
    
      var currentI = this.nodes.length - 1;
      var currentJ = this.nodes[0].length - 1;
    
      var currentNode = this.nodes[this.nodes.length - 1][this.nodes[0].length - 1];
    
      while (
        currentNode.tracebackI != undefined &&
        currentNode.tracebackJ != undefined
      ) {
        if (
          currentNode.tracebackI == currentI - 1 &&
          currentNode.tracebackJ == currentJ - 1
        ) {
          this.alignedM.push(this.M.pop());
          this.alignedN.push(this.N.pop());
        }
        // edited here .-- instead of - because of codon width
        else if (currentNode.tracebackJ == currentJ - 1) {
          this.alignedM.push("-");
          this.alignedN.push(this.N.pop());
        } else {
          this.alignedM.push(this.M.pop());
          this.alignedN.push("-");
        }
    
        currentI = currentNode.tracebackI;
        currentJ = currentNode.tracebackJ;
    
        currentNode = this.nodes[currentNode.tracebackI][currentNode.tracebackJ];
      }
    
      this.alignedM = this.alignedM.reverse();
      this.alignedN = this.alignedN.reverse();
    }
    
    //AlignPairQuad class getAlignedM() method
    getAlignedM() {
      return this.alignedM.join("");
    }
    
    //AlignPairQuad class getAlignedN() method
    getAlignedN() {
      return this.alignedN.join("");
    }
}

//complement
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
//http://www.bioinformatics.org/sms2/rev_comp.html
/**
  *Function to complement counterpart of input DNA sequence. 
  *{@link http://www.bioinformatics.org/sms2/rev_comp.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@return complement of input DNA sequence
  *@customfunction
*/
function complement(dnaSequence) {
  if (dnaSequence.map) {
  return dnaSequence.map(complement);
  } else {
  verifyDna(dnaSequence);
  //there is no tr operator
  //should write a tr method to replace this
  dnaSequence = dnaSequence.replace(/g/g, "1");
  dnaSequence = dnaSequence.replace(/c/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "c");
  dnaSequence = dnaSequence.replace(/2/g, "g");
  dnaSequence = dnaSequence.replace(/G/g, "1");
  dnaSequence = dnaSequence.replace(/C/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "C");
  dnaSequence = dnaSequence.replace(/2/g, "G");

  dnaSequence = dnaSequence.replace(/a/g, "1");
  dnaSequence = dnaSequence.replace(/t/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "t");
  dnaSequence = dnaSequence.replace(/2/g, "a");
  dnaSequence = dnaSequence.replace(/A/g, "1");
  dnaSequence = dnaSequence.replace(/T/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "T");
  dnaSequence = dnaSequence.replace(/2/g, "A");

  dnaSequence = dnaSequence.replace(/u/g, "a");
  dnaSequence = dnaSequence.replace(/U/g, "A");

  dnaSequence = dnaSequence.replace(/r/g, "1");
  dnaSequence = dnaSequence.replace(/y/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "y");
  dnaSequence = dnaSequence.replace(/2/g, "r");
  dnaSequence = dnaSequence.replace(/R/g, "1");
  dnaSequence = dnaSequence.replace(/Y/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "Y");
  dnaSequence = dnaSequence.replace(/2/g, "R");

  dnaSequence = dnaSequence.replace(/k/g, "1");
  dnaSequence = dnaSequence.replace(/m/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "m");
  dnaSequence = dnaSequence.replace(/2/g, "k");
  dnaSequence = dnaSequence.replace(/K/g, "1");
  dnaSequence = dnaSequence.replace(/M/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "M");
  dnaSequence = dnaSequence.replace(/2/g, "K");

  dnaSequence = dnaSequence.replace(/b/g, "1");
  dnaSequence = dnaSequence.replace(/v/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "v");
  dnaSequence = dnaSequence.replace(/2/g, "b");
  dnaSequence = dnaSequence.replace(/B/g, "1");
  dnaSequence = dnaSequence.replace(/V/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "V");
  dnaSequence = dnaSequence.replace(/2/g, "B");

  dnaSequence = dnaSequence.replace(/d/g, "1");
  dnaSequence = dnaSequence.replace(/h/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "h");
  dnaSequence = dnaSequence.replace(/2/g, "d");
  dnaSequence = dnaSequence.replace(/D/g, "1");
  dnaSequence = dnaSequence.replace(/H/g, "2");
  dnaSequence = dnaSequence.replace(/1/g, "H");
  dnaSequence = dnaSequence.replace(/2/g, "D");

  return dnaSequence;
  }
}

/**
  *Function to convert degenerate base in a sequence.
  *{@link https://www.bioinformatics.org/sms/iupac.html}
  *
  *@param {sequence} sequence Input DNA sequence
  *@return degenerate base in a sequence
  *@customfunction
*/
function convertDegenerates(sequence) {
  if (sequence.map) {
  return sequence.map(convertDegenerates);
  } else {
    verifyDna(sequence);
    //this part to too much, possiblely
//    sequence = sequence.toLowerCase();
//    sequence = sequence.replace(/t/g, "[TU]");
//    sequence = sequence.replace(/r/g, "[AGR]");
//    sequence = sequence.replace(/y/g, "[CTUY]");
//    sequence = sequence.replace(/s/g, "[GCS]");
//    sequence = sequence.replace(/w/g, "[ATUW]");
//    sequence = sequence.replace(/k/g, "[GTUK]");
//    sequence = sequence.replace(/m/g, "[ACM]");
//    sequence = sequence.replace(/b/g, "[CGTUBSKY]");
//    sequence = sequence.replace(/d/g, "[AGTUDRKW]");
//    sequence = sequence.replace(/h/g, "[ACTUHMYW]");
//    sequence = sequence.replace(/v/g, "[ACGVSMR]");
//    sequence = sequence.replace(/n/g, "[ACGTURYSWKMBDHVN]");
    
    sequence = sequence.replace(/r/g, "[AG]");
    sequence = sequence.replace(/y/g, "[CT]");
    sequence = sequence.replace(/s/g, "[GC]");
    sequence = sequence.replace(/w/g, "[AT]");
    sequence = sequence.replace(/k/g, "[GT]");
    sequence = sequence.replace(/m/g, "[AC]");
    sequence = sequence.replace(/b/g, "[CGT]");
    sequence = sequence.replace(/d/g, "[AGT]");
    sequence = sequence.replace(/h/g, "[ACT]");
    sequence = sequence.replace(/v/g, "[ACG]");
    sequence = sequence.replace(/n/g, "[ACGT]");
    
    return sequence;
  }
}

//reverse
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
//http://www.bioinformatics.org/sms2/rev_comp.html
/**
  *Function to reverse counterpart of input DNA sequence. 
  *{@link http://www.bioinformatics.org/sms2/rev_comp.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@return reverse of input DNA sequence
  *@customfunction
*/
function reverse(dnaSequence) {
  
//this part allows to work on ranges
  if (dnaSequence.map) {
  return dnaSequence.map(reverse);
  } else {
    verifyDna(dnaSequence);
    var tempDnaArray = new Array();
    if (dnaSequence.search(/./) != -1) {
      tempDnaArray = dnaSequence.match(/./g);
      tempDnaArray = tempDnaArray.reverse();
      dnaSequence = tempDnaArray.join("");
    }
    return dnaSequence;
  }
}

//revComp
//hhttps://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/rev_comp.js
//http://www.bioinformatics.org/sms2/rev_comp.html
/**
  *Function to reverse-complement counterpart of input DNA sequence. 
  *{@link http://www.bioinformatics.org/sms2/rev_comp.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@return reverse-complement of input DNA sequence
  *@customfunction
*/
function revComp(dnaSequence) {
   
  if (dnaSequence.map) {
  return dnaSequence.map(revComp);
  } else {
  verifyDna(dnaSequence);
  var newDna = reverse(complement(removeNonDna(dnaSequence)));
  return newDna;
  }
}

function getGeneticCodeMatchExp(arrayOfPatterns) {
  var geneticCodeMatchExp = new Array(arrayOfPatterns.length);
  for (var j = 0; j < arrayOfPatterns.length; j++) {
    geneticCodeMatchExp[j] = eval(arrayOfPatterns[j].match(/\/.+\//) + "gi");
  }
  return geneticCodeMatchExp;
}

function getGeneticCodeMatchResult(arrayOfPatterns) {
  var geneticCodeMatchResult = new Array(arrayOfPatterns.length);
  for (var j = 0; j < arrayOfPatterns.length; j++) {
    geneticCodeMatchResult[j] = arrayOfPatterns[j]
      .match(/=[a-zA-Z\*]/)
      .toString();
    geneticCodeMatchResult[j] = geneticCodeMatchResult[j].replace(/=/g, "");
  }
  return geneticCodeMatchResult;
}

function checkGeneticCode(arrayOfPatterns) {
  var z = 0;
  var codon = "";
  var oneMatch = false;
  var testSequence =
    "gggggaggtggcgaggaagatgacgtggtagttgtcgcggcagctgccaggagaagtagcaagaaaaataacatgataattatcacgacaactacctggtgatgttgctagtaatattacttgttatttttctcgtcatcttcccggcgacgtcgccagcaacatcacctgctacttctcccgccacctccc";
  while (z < arrayOfPatterns.length) {
    if (arrayOfPatterns[z].search(/^\s*\/[a-zA-Z\|\[\]]+\/=[a-zA-Z\*]/) == -1) {
      alert(
        "Genetic code error: one or more patterns have been entered incorrectly."
      );
      return false;
    }
    if (moreExpressionCheck(arrayOfPatterns[z]) == false) {
      alert(
        "Genetic code error: one or more patterns have been entered incorrectly."
      );
      return false;
    }
    z = z + 1;
  }
  var geneticCodeMatchResult = new Array(arrayOfPatterns.length);
  var geneticCodeMatchExp = new Array(arrayOfPatterns.length);
  for (var j = 0; j < arrayOfPatterns.length; j++) {
    geneticCodeMatchExp[j] = eval(arrayOfPatterns[j].match(/\/.+\//) + "gi");
    geneticCodeMatchResult[j] = arrayOfPatterns[j]
      .match(/=[a-zA-Z\*]/)
      .toString();
    geneticCodeMatchResult[j] = geneticCodeMatchResult[j].replace(/=/g, "");
  }
  for (var i = 0; i <= testSequence.length - 3; i = i + 3) {
    codon = testSequence.substring(i, i + 3);
    for (var j = 0; j < geneticCodeMatchExp.length; j++) {
      if (codon.search(geneticCodeMatchExp[j]) != -1) {
        if (oneMatch == true) {
          alert(
            "Genetic code error: more than one amino acid is coded by the codon: " +
              codon +
              "."
          );
          return false;
        }
        oneMatch = true;
      }
    }
    if (oneMatch == false) {
      alert("The genetic code expressions are missing a codon.");
      return false;
    }
    oneMatch = false;
  }
  return true;
}

//http://www.bioinformatics.org/sms2/translate.html
function getGeneticCodeString(type) {
  //  The Standard Code (transl_table=1)
  //    AAs  = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = ---M---------------M---------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (
    type.toLowerCase() == "standard" ||
    type.toLowerCase() == "transl_table=1"
  ) {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*," + "/nnk/=X"
    );
  }

  //  The Vertebrate Mitochondrial Code (transl_table=2)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSS**VVVVAAAADDEEGGGG
  //  Starts = --------------------------------MMMM---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=2") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][tcuy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu][agr]/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]|ag[agr]/=*"
    );
  }

  //  The Yeast Mitochondrial Code (transl_table=3)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWTTTTPPPPHHQQRRRRIIMMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = ----------------------------------MM----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=3") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][tcuy]/=I," +
      "/aa[agr]/=K," +
      "/[tu][tu][agr]/=L," +
      "/a[tu][agr]/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]|c[tu][acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Mold, Protozoan, and Coelenterate Mitochondrial Code and the Mycoplasma/Spiroplasma Code (transl_table=4)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = --MM---------------M------------MMMM---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=4") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Invertebrate Mitochondrial Code (transl_table=5)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSSSSVVVVAAAADDEEGGGG
  //  Starts = ---M----------------------------MMMM---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=5") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][tcuy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu][agr]/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Ciliate, Dasycladacean and Hexamita Nuclear Code (transl_table=6)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYYQQCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=6") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]|[tu]a[agr]|[tcuy]a[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]ga/=*"
    );
  }

  //  The Echinoderm and Flatworm Mitochondrial Code (transl_table=9)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNNKSSSSVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=9") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aag/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[atcuwmhy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Euplotid Nuclear Code (transl_table=10)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCCWLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=10") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[atcuwmhy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Bacterial and Plant Plastid Code (transl_table=11)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = ---M---------------M------------MMMM---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=11") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*"
    );
  }

  //  The Alternative Yeast Nuclear Code (transl_table=12)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CC*WLLLSPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -------------------M---------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=12") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][atcuwmhy]|[tu][tu][agr]|[ctuy][tu]a/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]|c[tu]g/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*"
    );
  }

  //  The Ascidian Mitochondrial Code (transl_table=13)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSSGGVVVVAAAADDEEGGGG
  //  Starts = ---M------------------------------MM---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=13") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]|ag[agr]|[agr]g[agr]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][tcuy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu][agr]/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  The Alternative Flatworm Mitochondrial Code (transl_table=14)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYYY*CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNNKSSSSVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=14") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aag/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[atcuwmhy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[atcuwmhy]/=Y," +
      "/[tu]ag/=*"
    );
  }

  //  Blepharisma Nuclear Code (transl_table=15)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY*QCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=15") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]|[tu]ag|[tcuy]ag/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu][agr]a/=*"
    );
  }

  //  Chlorophycean Mitochondrial Code (transl_table=16)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY*LCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=16") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]|[tu]ag|[tu][atuw]g/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu][agr]a/=*"
    );
  }

  //  Trematode Mitochondrial Code (transl_table=21)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNNKSSSSVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=21") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][tcuy]/=I," +
      "/aag/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," +
      "/a[tu][agr]/=M," +
      "/aa[atcuwmhy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]g[agr]/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]/=*"
    );
  }

  //  Scenedesmus obliquus mitochondrial Code (transl_table=22)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FFLLSS*SYY*LCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = -----------------------------------M----------------------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=22") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]|[tu]ag|[tu][atuw]g/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[cgtyskb]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu][agcrsmv]a/=*"
    );
  }

  //  Thraustochytrium Mitochondrial Code (transl_table=23)
  //Standard = FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //    AAs  = FF*LSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG
  //  Starts = --------------------------------M--M---------------M------------
  //  Base1  = TTTTTTTTTTTTTTTTCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG
  //  Base2  = TTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGGTTTTCCCCAAAAGGGG
  //  Base3  = TCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAG

  if (type.toLowerCase() == "transl_table=23") {
    return (
      "/gc[acgturyswkmbdhvn]/=A," +
      "/[tu]g[ctuy]/=C," +
      "/ga[tcuy]/=D," +
      "/ga[agr]/=E," +
      "/[tu][tu][tcuy]/=F," +
      "/gg[acgturyswkmbdhvn]/=G," +
      "/ca[tcuy]/=H," +
      "/a[tu][atcuwmhy]/=I," +
      "/aa[agr]/=K," +
      "/c[tu][acgturyswkmbdhvn]|[ctuy][tu]g/=L," +
      "/a[tu]g/=M," +
      "/aa[tucy]/=N," +
      "/cc[acgturyswkmbdhvn]/=P," +
      "/ca[agr]/=Q," +
      "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," +
      "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," +
      "/ac[acgturyswkmbdhvn]/=T," +
      "/g[tu][acgturyswkmbdhvn]/=V," +
      "/[tu]gg/=W," +
      "/[tu]a[ctuy]/=Y," +
      "/[tu]a[agr]|[tu]ga|[tu][agtrwkd]a/=*"
    );
  }

  return true;
}

//https://developers.google.com/apps-script/guides/sheets/functions
//function DOUBLE(input) {
//  return Array.isArray(input) ?
//      input.map(row => row.map(cell => cell * 2)) :
//      input * 2;
//}
//x => multiplyBy(4, x)

//translate
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/translate.js
//http://www.bioinformatics.org/sms2/translate.html
/**
  *Function to converts DNA into a protein in the reading frame. 
  *{@link http://www.bioinformatics.org/sms2/translate.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@param {"standard"} type standard (default) or transl_table=1 etc see {@link http://www.bioinformatics.org/sms2/genetic_code.html}
  *@return translated DNA sequence
  *@customfunction
*/
function translate(dnaSequence,type="standard") {
  
  if (dnaSequence.map) {
  //https://stackoverflow.com/questions/45928903/how-to-pass-parameter-to-array-map
  return dnaSequence.map(dnaSequence => translate(dnaSequence,type));
  } else {
  verifyDna(dnaSequence);
  var geneticCode = getGeneticCodeString(type);
  geneticCode = geneticCode.split(/,/);
  var geneticCodeMatchExp = getGeneticCodeMatchExp(geneticCode);
  var geneticCodeMatchResult = getGeneticCodeMatchResult(geneticCode);
  //don't translate if fewer than three bases
  if (dnaSequence.replace(/[^A-Za-z]/g, "").length < 3) {
    return "";
  }

  dnaSequence = dnaSequence.replace(/(...)/g, function (str, p1, offset, s) {
    return " " + p1 + " ";
  });

  for (var i = 0; i < geneticCodeMatchExp.length; i++) {
    dnaSequence = dnaSequence.replace(
      geneticCodeMatchExp[i],
      geneticCodeMatchResult[i]
    );
  }

  dnaSequence = dnaSequence.replace(/\S{3}/g, "X");
  dnaSequence = dnaSequence.replace(/\s\S{1,2}$/, "");
  dnaSequence = dnaSequence.replace(/\s/g, "");
  
  return dnaSequence;
  }
}

//protein_mw
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/protein_mw.js
//http://www.bioinformatics.org/sms2/protein_mw.html
/**
  *Function to calculate MW (kDa) of protein sequence. 
  *{@link http://www.bioinformatics.org/sms2/protein_mw.html}
  *
  *@param {proteinSequence} proteinSequence Input Protein sequence
  *@return MW (kDa) of protein sequence
  *@customfunction
*/
function protein_mw(proteinSequence) {  
  
  //the weights below have water subtracted
  var arrayOfMw = [
    "/A/ (A)71.08",
    "/C/ (C)103.14",
    "/D/ (D)115.09",
    "/E/ (E)129.12",
    "/F/ (F)147.18",
    "/G/ (G)57.06",
    "/H/ (H)137.15",
    "/I/ (I)113.17",
    "/K/ (K)128.18",
    "/L/ (L)113.17",
    "/M/ (M)131.21",
    "/N/ (N)114.11",
    "/P/ (P)97.12",
    "/Q/ (Q)128.41",
    "/R/ (R)156.20",
    "/S/ (S)87.08",
    "/T/ (T)101.11",
    "/V/ (V)99.14",
    "/W/ (W)186.21",
    "/Y/ (Y)163.18",
  ];
  
  if (proteinSequence.map) {
  return proteinSequence.map(protein_mw);
  } else {
    verifyProtein(proteinSequence);

    var water = 18.015;
    var result = 0;
    
    for (var j = 0; j < arrayOfMw.length; j++) {
      var tempNumber = 0;
      var matchExp = arrayOfMw[j].match(/\/[^\/]+\//) + "gi";
      matchExp = eval(matchExp);
      if (proteinSequence.search(matchExp) != -1) {
        tempNumber = proteinSequence.match(matchExp).length;
      }
      result =
        result +
        tempNumber * parseFloat(arrayOfMw[j].match(/[\d\.]+/).toString());
    }
    
      result = result + water; //add the weight of water for the ends of the protein.
      result = result / 1000; //convert to kilodaltons.
      result = result.toFixed(2);
      return result;
    }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/one_to_three.js
/**
  *Function to convert one letter AA sequence to three letters
  *
  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
  *@return three letter sequence of one letter sequence
  *@customfunction
*/
function Seq3(proteinSequence) {
  
  if (proteinSequence.map) {
  return proteinSequence.map(Seq3);
  } else {
  verifyProtein(proteinSequence);
  proteinSequence = proteinSequence.toLowerCase();
  proteinSequence = proteinSequence.replace(/(.)/g, function (
    str,
    p1,
    offset,
    s
  ) {
    return " " + p1 + " ";
  });

  proteinSequence = proteinSequence.replace(/a/g, "ALA");
  proteinSequence = proteinSequence.replace(/b/g, "ASX");
  proteinSequence = proteinSequence.replace(/c/g, "CYS");
  proteinSequence = proteinSequence.replace(/d/g, "ASP");
  proteinSequence = proteinSequence.replace(/e/g, "GLU");
  proteinSequence = proteinSequence.replace(/f/g, "PHE");
  proteinSequence = proteinSequence.replace(/g/g, "GLY");
  proteinSequence = proteinSequence.replace(/h/g, "HIS");
  proteinSequence = proteinSequence.replace(/i/g, "ILE");
  proteinSequence = proteinSequence.replace(/k/g, "LYS");
  proteinSequence = proteinSequence.replace(/l/g, "LEU");
  proteinSequence = proteinSequence.replace(/m/g, "MET");
  proteinSequence = proteinSequence.replace(/n/g, "ASN");
  proteinSequence = proteinSequence.replace(/p/g, "PRO");
  proteinSequence = proteinSequence.replace(/q/g, "GLN");
  proteinSequence = proteinSequence.replace(/r/g, "ARG");
  proteinSequence = proteinSequence.replace(/s/g, "SER");
  proteinSequence = proteinSequence.replace(/t/g, "THR");
  proteinSequence = proteinSequence.replace(/v/g, "VAL");
  proteinSequence = proteinSequence.replace(/w/g, "TRP");
  proteinSequence = proteinSequence.replace(/x/g, "XAA");
  proteinSequence = proteinSequence.replace(/y/g, "TYR");
  proteinSequence = proteinSequence.replace(/z/g, "GLX");
  proteinSequence = proteinSequence.replace(/\*/g, "***");

  proteinSequence = proteinSequence.replace(/\s*(.)(.)(.)\s*/g, function (
    str,p1,p2,p3,offset,s) {
    return p1 + p2.toLowerCase() + p3.toLowerCase();
  });
  return proteinSequence; 
  }
}

//Seq1
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/three_to_one.js
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/sms_common.js
//http://www.bioinformatics.org/sms2/three_to_one.html
/**
  *Function to convert three letters AA sequence to one letter. 
  *{@link http://www.bioinformatics.org/sms2/three_to_one.html}
  *
  *@param {string} proteinSequence Input Protein three letter sequence
  *@return one letter sequence of three letters sequence
  *@customfunction
*/
function Seq1(proteinSequence) {
//  verifyProtein(proteinSequence);
  
  if (proteinSequence.map) {
  return proteinSequence.map(Seq1);
  } else {
  proteinSequence = proteinSequence.replace(/(.)(.)(.)/g, function (
    str,p1,p2,p3,offset,s) {
    return p1.toUpperCase() + p2.toLowerCase() + p3.toLowerCase();
  });
  proteinSequence = proteinSequence.replace(/Ala/g, " A ");
  proteinSequence = proteinSequence.replace(/Asx/g, " B ");
  proteinSequence = proteinSequence.replace(/Cys/g, " C ");
  proteinSequence = proteinSequence.replace(/Asp/g, " D ");
  proteinSequence = proteinSequence.replace(/Glu/g, " E ");
  proteinSequence = proteinSequence.replace(/Phe/g, " F ");
  proteinSequence = proteinSequence.replace(/Gly/g, " G ");
  proteinSequence = proteinSequence.replace(/His/g, " H ");
  proteinSequence = proteinSequence.replace(/Ile/g, " I ");
  proteinSequence = proteinSequence.replace(/Lys/g, " K ");
  proteinSequence = proteinSequence.replace(/Leu/g, " L ");
  proteinSequence = proteinSequence.replace(/Met/g, " M ");
  proteinSequence = proteinSequence.replace(/Asn/g, " N ");
  proteinSequence = proteinSequence.replace(/Pro/g, " P ");
  proteinSequence = proteinSequence.replace(/Gln/g, " Q ");
  proteinSequence = proteinSequence.replace(/Arg/g, " R ");
  proteinSequence = proteinSequence.replace(/Ser/g, " S ");
  proteinSequence = proteinSequence.replace(/Thr/g, " T ");
  proteinSequence = proteinSequence.replace(/Val/g, " V ");
  proteinSequence = proteinSequence.replace(/Trp/g, " W ");
  proteinSequence = proteinSequence.replace(/Xaa/g, " X ");
  proteinSequence = proteinSequence.replace(/Tyr/g, " Y ");
  proteinSequence = proteinSequence.replace(/Glx/g, " Z ");
  proteinSequence = proteinSequence.replace(/\*\*\*/g, " * ");

  proteinSequence = proteinSequence.replace(/\s/g, "");
  return proteinSequence;
  }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/protein_stats.js
//http://www.bioinformatics.org/sms2/protein_stats.html
/**
  *Function to calculate protein stats. 
  *{@link http://www.bioinformatics.org/sms2/protein_stats.html}
  *
  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
  *@return AA composition stats of input protein
  *@customfunction
*/
function proteinStats(proteinSequence) {
  
  var itemsToCheck = [
    "/A/ (A)1",
    "/B/ (B)1",
    "/C/ (C)1",
    "/D/ (D)1",
    "/E/ (E)1",
    "/F/ (F)1",
    "/G/ (G)1",
    "/H/ (H)1",
    "/I/ (I)1",
    "/K/ (K)1",
    "/L/ (L)1",
    "/M/ (M)1",
    "/N/ (N)1",
    "/P/ (P)1",
    "/Q/ (Q)1",
    "/R/ (R)1",
    "/S/ (S)1",
    "/T/ (T)1",
    "/V/ (V)1",
    "/W/ (W)1",
    "/X/ (X)1",
    "/Y/ (Y)1",
    "/Z/ (Z)1",
    "/[GAVLI]/ (Aliphatic G,A,V,L,I)1",
    "/[FWY]/ (Aromatic F,W,Y)1",
    "/[CM]/ (Sulphur C,M)1",
    "/[KRH]/ (Basic K,R,H)1",
    "/[BDENQZ]/ (Acidic B,D,E,N,Q,Z)1",
    "/[ST]/ (Aliphatic hydroxyl S,T)1",
    "/[ZEQRCMVILYW]/ (tRNA synthetase class I Z,E,Q,R,C,M,V,I,L,Y,W)1",
    "/[BGAPSTHDNKF]/ (tRNA synthetase class II B,G,A,P,S,T,H,D,N,K,F)1",
  ];
  
  if (proteinSequence.map) {
  return proteinSequence.map(proteinStats);
  } else {
   verifyProtein(proteinSequence);

   var aa_stats="";
   var originalLength = proteinSequence.length;

   for (var i = 0; i < itemsToCheck.length; i++) {
    var tempNumber = 0;
    var matchExp = itemsToCheck[i].match(/\/[^\/]+\//) + "gi";
    matchExp = eval(matchExp);
    if (proteinSequence.search(matchExp) != -1) {
      tempNumber = proteinSequence.match(matchExp).length;
    }
    var percentage = 0;
    if (originalLength + 1 - parseFloat(itemsToCheck[i].match(/\d+/)) > 0) {
      percentage =
        (100 * tempNumber) /
        (originalLength + 1 - parseFloat(itemsToCheck[i].match(/\d+/)));
    }
    
    aa_stats=aa_stats+ itemsToCheck[i].match(/\([^\(]+\)\b/).toString().replace(/\(|\)/g, "") +":"+tempNumber +":" +percentage.toFixed(2)+";";
  }
  //how to return a comma separated string
  return aa_stats;
  }
}

//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/dna_stats.js
//http://www.bioinformatics.org/sms2/dna_stats.html
/**
  *Function to DNA stats of a sequence. 
  *{@link http://www.bioinformatics.org/sms2/dna_stats.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@return NT composition stats of Input DNA sequence
  *@customfunction
*/
function dnaStats(dnaSequence) {
  
  
  var itemsToCheck = [
    "/g/ (g)1",
    "/a/ (a)1",
    "/t/ (t)1",
    "/c/ (c)1",
    "/n/ (n)1",
    "/u/ (u)1",
    "/r/ (r)1",
    "/y/ (y)1",
    "/s/ (s)1",
    "/w/ (w)1",
    "/k/ (k)1",
    "/m/ (m)1",
    "/b/ (b)1",
    "/d/ (d)1",
    "/h/ (h)1",
    "/v/ (v)1",
    "/g(?=g)/ (gg)2",
    "/g(?=a)/ (ga)2",
    "/g(?=t)/ (gt)2",
    "/g(?=c)/ (gc)2",
    "/g(?=n)/ (gn)2",
    "/a(?=g)/ (ag)2",
    "/a(?=a)/ (aa)2",
    "/a(?=t)/ (at)2",
    "/a(?=c)/ (ac)2",
    "/a(?=n)/ (an)2",
    "/t(?=g)/ (tg)2",
    "/t(?=a)/ (ta)2",
    "/t(?=t)/ (tt)2",
    "/t(?=c)/ (tc)2",
    "/t(?=n)/ (tn)2",
    "/c(?=g)/ (cg)2",
    "/c(?=a)/ (ca)2",
    "/c(?=t)/ (ct)2",
    "/c(?=c)/ (cc)2",
    "/c(?=n)/ (cn)2",
    "/n(?=g)/ (ng)2",
    "/n(?=a)/ (na)2",
    "/n(?=t)/ (nt)2",
    "/n(?=c)/ (nc)2",
    "/n(?=n)/ (nn)2",
    "/g|c/ (g,c)1",
    "/a|t/ (a,t)1",
    "/r|y|s|w|k/ (r,y,s,w,k)1",
    "/b|h|d|v|n/ (b,h,d,v,n)1",
    "/r|y|s|w|k|m|b|d|h|v|n/ (r,y,s,w,k,m,b,d,h,v,n)1",
  ];
  
  if (dnaSequence.map) {
  return dnaSequence.map(dnaStats);
  } else {
   verifyDna(dnaSequence);
   var nt_stats="";
   var originalLength = dnaSequence.length;

   for (var i = 0; i < itemsToCheck.length; i++) {
    var tempNumber = 0;
    var matchExp = itemsToCheck[i].match(/\/[^\/]+\//) + "gi";
    matchExp = eval(matchExp);
    if (dnaSequence.search(matchExp) != -1) {
      tempNumber = dnaSequence.match(matchExp).length;
    }
    var percentage = 0;
    if (originalLength + 1 - parseFloat(itemsToCheck[i].match(/\d+/)) > 0) {
      percentage =
        (100 * tempNumber) /
        (originalLength + 1 - parseFloat(itemsToCheck[i].match(/\d+/)));
    }
    
    nt_stats=nt_stats+ itemsToCheck[i].match(/\([^\(]+\)\b/).toString().replace(/\(|\)/g, "") +":"+tempNumber +":" +percentage.toFixed(2)+";";
  }
  //how to return a comma separated string
  return nt_stats;
  }
}


//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/protein_gravy.js
//http://www.bioinformatics.org/sms2/protein_gravy.html
/**
  *Function to calculate GRAVY (grand average of hydropathy) value for the protein sequences. 
  *{@link http://www.bioinformatics.org/sms2/protein_gravy.html}
  *
  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
  *@return GRAVY of input protein
  *@customfunction
*/
function proteinGravy(proteinSequence) {
  
  function getProteinGravy(sequence) {
    sequence = sequence.toLowerCase();
    var gravyResult = 0;
    //The GRAVY value for a peptide or protein is calculated as the sum of hydropathy values [9]
    //of all the amino acids, divided by the number of residues in the sequence.
    var gravyValues = _getGravyHash();
    for (var i = 0; i < sequence.length; i++) {
      gravyResult = gravyResult + gravyValues[sequence.charAt(i)];
    }
    if (sequence.length > 0) {
      gravyResult = gravyResult / sequence.length;
    } else {
      return "The sequence is too short";
    }
    return gravyResult.toFixed(3);
  }
  
  function _getGravyHash() {
    //Author(s): Kyte J., Doolittle R.F.
    //Reference: J. Mol. Biol. 157:105-132(1982).
    var hash = {};
    hash["a"] = 1.8;
    hash["r"] = -4.5;
    hash["n"] = -3.5;
    hash["d"] = -3.5;
    hash["c"] = 2.5;
    hash["q"] = -3.5;
    hash["e"] = -3.5;
    hash["g"] = -0.4;
    hash["h"] = -3.2;
    hash["i"] = 4.5;
    hash["l"] = 3.8;
    hash["k"] = -3.9;
    hash["m"] = 1.9;
    hash["f"] = 2.8;
    hash["p"] = -1.6;
    hash["s"] = -0.8;
    hash["t"] = -0.7;
    hash["w"] = -0.9;
    hash["y"] = -1.3;
    hash["v"] = 4.2;
    return hash;
  }
  
   if (proteinSequence.map) {
      return proteinSequence.map(proteinGravy);
    } else {
      verifyProtein(proteinSequence);
      return getProteinGravy(proteinSequence);
    }
}


//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/protein_iep.js
//http://www.bioinformatics.org/sms2/protein_iep.html
/**
  *Function to calculate theoretical pI (isoelectric point) for the protein sequence.
  *{@link http://www.bioinformatics.org/sms2/protein_iep.html}
  *
  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
  *@param {"DTAselect"} pKSet DTAselect (default) or EMBOSS
  *@return theoretical pI of input protein
  *@customfunction
*/
function proteinIep(proteinSequence, pKSet="DTAselect") {
  
  function partial_charge(first, second) {
    var charge = Math.pow(10, first - second);
    return charge / (charge + 1);
  }
  
  if (proteinSequence.map) {
  return proteinSequence.map(proteinSequence => proteinIep(proteinSequence,pKSet));
  } else {
  verifyProtein(proteinSequence);

  
  //calculates pI of protein.
  var pH = 7.0;
  var step = 3.5;
  var charge = 0.0;
  var last_charge = 0.0;

  var N_term_pK;
  var K_pK;
  var R_pK;
  var H_pK;
  var D_pK;
  var E_pK;
  var C_pK;
  var Y_pK;
  var C_term_pK;

  if (pKSet.toLowerCase() == "dtaselect") {
    //pK values from DTASelect
    N_term_pK = 8.0;
    K_pK = 10.0;
    R_pK = 12.0;
    H_pK = 6.5;
    D_pK = 4.4;
    E_pK = 4.4;
    C_pK = 8.5;
    Y_pK = 10.0;
    C_term_pK = 3.1;
  } else {
    //pK values from EMBOSS
    N_term_pK = 8.6;
    K_pK = 10.8;
    R_pK = 12.5;
    H_pK = 6.5;
    D_pK = 3.9;
    E_pK = 4.1;
    C_pK = 8.5;
    Y_pK = 10.1;
    C_term_pK = 3.6;
  }

  var K_count = 0;
  if (proteinSequence.search(/k/i) != -1) {
    K_count = proteinSequence.match(/k/gi).length;
  }

  var R_count = 0;
  if (proteinSequence.search(/r/i) != -1) {
    R_count = proteinSequence.match(/r/gi).length;
  }

  var H_count = 0;
  if (proteinSequence.search(/h/i) != -1) {
    H_count = proteinSequence.match(/h/gi).length;
  }

  var D_count = 0;
  if (proteinSequence.search(/d/i) != -1) {
    D_count = proteinSequence.match(/d/gi).length;
  }

  var E_count = 0;
  if (proteinSequence.search(/e/i) != -1) {
    E_count = proteinSequence.match(/e/gi).length;
  }

  var C_count = 0;
  if (proteinSequence.search(/c/i) != -1) {
    C_count = proteinSequence.match(/c/gi).length;
  }

  var Y_count = 0;
  if (proteinSequence.search(/y/i) != -1) {
    Y_count = proteinSequence.match(/y/gi).length;
  }

  while (1) {
    charge =
      partial_charge(N_term_pK, pH) +
      K_count * partial_charge(K_pK, pH) +
      R_count * partial_charge(R_pK, pH) +
      H_count * partial_charge(H_pK, pH) -
      D_count * partial_charge(pH, D_pK) -
      E_count * partial_charge(pH, E_pK) -
      C_count * partial_charge(pH, C_pK) -
      Y_count * partial_charge(pH, Y_pK) -
      partial_charge(pH, C_term_pK);

    if (charge.toFixed(2) == (last_charge * 100).toFixed(2)) {
      break;
    }

    if (charge > 0) {
      pH = pH + step;
    } else {
      pH = pH - step;
    }

    step = step / 2;

    last_charge = charge;
  }

  pH = pH.toFixed(2);

  return pH;
  }
}


//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/dna_mw.js
//http://www.bioinformatics.org/sms2/dna_mw.html
/**
  *Function to calculate calculates molecular weight (Da) of either single stranded or double stranded DNA. 
  *{@link http://www.bioinformatics.org/sms2/dna_mw.html}
  *
  *@param {dnaSequence} sequence Input DNA
  *@param {"double"} strandType double (default) or single
  *@param {"linear"} topology linear (default) or circular
  *@return molecular weight of DNA (Da)
  *@customfunction
*/
function dnaMw(sequence,strandType="double",topology="linear") {
  
  function _containsOnlyNonDegenerates(sequence) {
    if (sequence.search(/[^gatc]/i) == -1) {
      return true;
    }
    return false;
  }
  
  function _molecularWeight(sequence) {
    if (_containsOnlyNonDegenerates(sequence)) {
      return _molecularWeightNonDegen(sequence);
    } else {
      return _molecularWeightDegen(sequence);
    }
  }
  
  function _molecularWeightNonDegen(sequence) {
    var results = new Array();
    results[0] = _mw(sequence);
    return results;
  }
  
  function _mw(sequence) {
    //DNA molecular weight for linear strand of DNA with a 5' monophosphate
    var g = _getBaseCount(sequence, "g");
    var a = _getBaseCount(sequence, "a");
    var t = _getBaseCount(sequence, "t");
    var c = _getBaseCount(sequence, "c");
    return g * 329.21 + a * 313.21 + t * 304.2 + c * 289.18 + 17.01;
  }
  
  function _molecularWeightDegen(sequence) {
    var lowerBoundsSequence = sequence;
    var upperBoundsSequence = sequence;
  
    //replace all other degenerates with lightest base possible in lowerBoundsSequence
    lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
    lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "t");
    lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
    lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "t");
    lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "c");
    lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "c");
  
    //replace all other degenerates with heaviest base possible in upperBoundsSequence
    upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "t");
    upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
    upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "a");
    upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "a");
    upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
    upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
  
    var results = new Array();
    results[0] = _molecularWeightNonDegen(lowerBoundsSequence);
    results[1] = _molecularWeightNonDegen(upperBoundsSequence);
    return results;
  }
  
  function _getBaseCount(sequence, base) {
    var basePattern = new RegExp(base, "gi");
    if (sequence.search(basePattern) != -1) {
      return sequence.match(basePattern).length;
    } else {
      return 0;
    }
  }
  
  function _removeNonPrimer(sequence) {
    sequence.replace(/u/g, "t");
    sequence.replace(/U/g, "T");
    return sequence.replace(/[^gatcryswkmbdhvnGATCRYSWKMBDHVN]/g, "");
  }
  
  if (sequence.map) {
  return sequence.map(sequence => dnaMw(sequence,strandType,topology));
  } else {
  verifyDna(sequence);
//  function writeDnaMw(sequence, strandType, topology) {
  //calculates molecular weight of DNA.
  //ligation removes OH
  var OH = 17.01;
  var result = 0;

  if (strandType == "single") {
    var mw_direct_strand = _molecularWeight(sequence);
    if (mw_direct_strand.length == 1) {
      var mw = parseFloat(mw_direct_strand[0]);
      if (topology == "circular") {
        mw = mw - OH;
      }
      mw = mw.toFixed(2);
//      outputWindow.document.write(mw + " Da");
      return mw;
    } else if (mw_direct_strand.length == 2) {
      var mw_lower = parseFloat(mw_direct_strand[0]);
      var mw_upper = parseFloat(mw_direct_strand[1]);
      if (topology == "circular") {
        mw_lower = mw_lower - OH;
        mw_upper = mw_upper - OH;
      }
      mw_lower = mw_lower.toFixed(2);
      mw_upper = mw_upper.toFixed(2);
      return mw_lower+":"+mw_upper;
//      outputWindow.document.write(mw_lower + " to " + mw_upper + " Da");
    }
  } else if (strandType == "double") {
    var mw_direct_strand = _molecularWeight(sequence);
    var mw_reverse_strand = _molecularWeight(reverse(complement(sequence)));
    if (mw_direct_strand.length == 1 && mw_reverse_strand.length == 1) {
      var mw_direct = parseFloat(mw_direct_strand[0]);
      var mw_reverse = parseFloat(mw_reverse_strand[0]);
      if (topology == "circular") {
        mw_direct = mw_direct - OH;
        mw_reverse = mw_reverse - OH;
      }
      var mw = mw_direct + mw_reverse;
      mw = mw.toFixed(2);
      return mw;
//      outputWindow.document.write(mw + " Da");
    } else if (mw_direct_strand.length == 2 && mw_reverse_strand.length == 2) {
      var mw_direct_lower = parseFloat(mw_direct_strand[0]);
      var mw_reverse_lower = parseFloat(mw_reverse_strand[0]);
      var mw_direct_upper = parseFloat(mw_direct_strand[1]);
      var mw_reverse_upper = parseFloat(mw_reverse_strand[1]);
      if (topology == "circular") {
        mw_direct_lower = mw_direct_lower - OH;
        mw_reverse_lower = mw_reverse_lower - OH;

        mw_direct_upper = mw_direct_upper - OH;
        mw_reverse_upper = mw_reverse_upper - OH;
      }
      var mw_lower = mw_direct_lower + mw_reverse_lower;
      var mw_upper = mw_direct_upper + mw_reverse_upper;
      mw_lower = mw_lower.toFixed(2);
      mw_upper = mw_upper.toFixed(2);
      return mw_lower+":"+mw_upper;
//      outputWindow.document.write(mw_lower + " to " + mw_upper + " Da");
    }
  }
}
}


//pairwiseAlignProtein
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pairwise_align_protein.js
//http://www.bioinformatics.org/sms2/pairwise_align_protein.html
/**
  *Function to determines the optimal global alignment of two protein sequences. 
  *{@link http://www.bioinformatics.org/sms2/pairwise_align_protein.html}
  *
  *@param {proteinSequenceOne} proteinSequenceOne Input Protein One
  *@param {proteinSequenceTwo} proteinSequenceTwo Input Protein Two
  *@param {"blosum62"} matrix Scoring matrix: blosum62 (default), pam30, pam70, blosum80, blosum45
  *@param {0} beginGapPenalty default 0
  *@param {2} gapPenalty default 2
  *@param {0} endGapPenalty default 0
  *@return alignment of two protein
  *@customfunction
*/
function pairwiseAlignProtein(proteinSequenceOne,proteinSequenceTwo,matrix="blosum62",beginGapPenalty=0,gapPenalty=2,endGapPenalty=0) {
    verifyProtein(proteinSequenceOne);
    verifyProtein(proteinSequenceTwo);
//alignment function

    var useLinearSpace = true;
    var useQuadraticSpace = false;
    
    var scoringMatrix1 = new ScoringMatrix();
      if (matrix == "pam30") {
      scoringMatrix1.Pam30();
    } else if (matrix == "pam70") {
      scoringMatrix1.Pam70();
    } else if (matrix == "blosum80") {
      scoringMatrix1.Blosum80();
    } else if (matrix == "blosum62") {
      scoringMatrix1.Blosum62();
    } else if (matrix == "blosum45") {
      scoringMatrix1.Blosum45();
    }
  
    var scoreSet = new ScoreSet();
    scoreSet.setScoreSetParam(
      scoringMatrix1,
      gapPenalty,
      beginGapPenalty,
      endGapPenalty
    );

    var alignment;
    if (useLinearSpace) {
    alignment = new AlignPairLinear();
    alignment.setAlignParam(proteinSequenceOne, proteinSequenceTwo, scoreSet);
    alignment.align();
    } 
    
    if (useQuadraticSpace) {
    alignment = new AlignPairQuad();
    alignment.initializeMatrix(proteinSequenceOne, proteinSequenceTwo, scoreSet);
    alignment.fillMatrix();
    alignment.align();
    }
    
//  return alignment.score+"\n"+
    return alignment.getAlignedM()+"\n"+alignment.getAlignedN();
}

//pairwiseAlignDna
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pairwise_align_dna.js
//http://www.bioinformatics.org/sms2/pairwise_align_dna.html
/**
  *Function to determines the optimal global alignment of two dna sequences. 
  *{@link http://www.bioinformatics.org/sms2/pairwise_align_dna.html}
  *
  *@param {dnaSequenceOne} dnaSequenceOne Input DNA One
  *@param {dnaSequenceTwo} dnaSequenceTwo Input DNA Two
  *@param {matchScore} matchScore default 2
  *@param {mismatchScore} mismatchScore default -1
  *@param {gapPenalty} gapPenalty default 2
  *@param {beginGapPenalty} beginGapPenalty default 0
  *@param {endGapPenalty} endGapPenalty default 0
  *@return alignment of two protein
  *@customfunction
*/
function pairwiseAlignDna(dnaSequenceOne,dnaSequenceTwo,matchScore=2,mismatchScore=-1,gapPenalty=2,beginGapPenalty=0,endGapPenalty=0) {
      verifyDna(dnaSequenceOne);
      verifyDna(dnaSequenceTwo);
      
      var useLinearSpace = true;
      var useQuadraticSpace = false;
    
      var matrix = new Identity();
      matrix.setMatch(matchScore);
      matrix.setMismatch(mismatchScore);
    
      var scoreSet = new ScoreSet();
      scoreSet.setScoreSetParam(matrix, gapPenalty, beginGapPenalty, endGapPenalty);
    
      var alignment;
    
      if (useLinearSpace) {
        alignment = new AlignPairLinear();
        alignment.setAlignParam(dnaSequenceOne, dnaSequenceTwo, scoreSet);
        alignment.align();
    
//        outputWindow.document.write(">" + titleOne + "\n");
//        outputWindow.document.write(addReturns(alignment.getAlignedM()));
//        outputWindow.document.write("\n");
//        outputWindow.document.write("\n");
//        outputWindow.document.write(">" + titleTwo + "\n");
//        outputWindow.document.write(addReturns(alignment.getAlignedN()));
//        outputWindow.document.write("\n\n");
//        outputWindow.document.write("Alignment score: " + alignment.score + "\n\n");
      }
    
      if (useQuadraticSpace) {
        alignment = new AlignPairQuad();
        alignment.initializeMatrix(dnaSequenceOne, dnaSequenceTwo, scoreSet);
        alignment.fillMatrix();
        //alignment.dumpMatrix();
        alignment.align();
    
//        outputWindow.document.write(">" + titleOne + "\n");
//        outputWindow.document.write(addReturns(alignment.getAlignedM()));
//        outputWindow.document.write("\n");
//        outputWindow.document.write("\n");
//        outputWindow.document.write(">" + titleTwo + "\n");
//        outputWindow.document.write(addReturns(alignment.getAlignedN()));
//        outputWindow.document.write("\n\n");
//        outputWindow.document.write("Alignment score: " + alignment.score + "\n\n");
      }
      return alignment.getAlignedM()+"\n"+alignment.getAlignedN();

}

//restSummary
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/rest_summary.js
//http://www.bioinformatics.org/sms2/rest_summary.html
/**
  *Function to returns the number of commonly used restriction endonuclease cut sites of input DNA sequences.
  *{@link  http://www.bioinformatics.org/sms2/rest_summary.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@param {"circular"} type DNA sequence type: linear or circular (default)
  *@return all common restriction sites in input sequence
  *@customfunction
*/
function restSummary(dnaSequence,type="circular") {

 if (dnaSequence.map) {
    return dnaSequence.map(restSummary);
  } else {
  
  verifyDna(dnaSequence);  
  var restrictionSites = getRestrictionSiteString("standard");

  var itemsToCheck = restrictionSites.split(/,/);
  if (checkRestPatterns(itemsToCheck) == false) {
    return false;
  }

  return writeRestrictionSites(dnaSequence,itemsToCheck,type);
  }
}


/**
  *Function to compare two sequences (dna/protein) with same length and return their differences
  *
  *@param {SequenceOne} SequenceOne Input one letter sequence 1
  *@param {SequenceTwo} SequenceTwo Input one letter sequence 2
  *@return sequence differences
  *@customfunction
*/
function SeqDiff(SequenceOne,SequenceTwo) {
  var len_inputstring1 = SequenceOne.length;
  var len_inputstring2 = SequenceTwo.length;
  if (len_inputstring1!=len_inputstring2) {
    throw new Error("To use this function, two sequences should have the same lengths");
  }
  
  var outputstring=[];
  var i;
  for ( i=0; i<len_inputstring1; i++) {
    if (SequenceOne[i]!=SequenceTwo[i]) {
      outputstring.push(SequenceOne[i]+(i+1).toString()+SequenceTwo[i])
    }
  }
  return outputstring.join(","); 
}


/**
  *Function to mutate protein given AA to AA at specified location
  *
  *@param {proteinSequence} proteinSequence Input one letter sequence 1
  *@param {"A100M"} mutationlist Comma separated mutation list in format of A#X
  *@return mutated seqeunces
  *@customfunction
*/
function Mutation2Seq(proteinSequence,mutationlist) {
  //check protein
  verifyProtein(proteinSequence);

  var len_inputstring1 = proteinSequence.length;
  var mutationArray = new Array();
  var outputstring=proteinSequence.split('');
  
  //go through the mutation list
  mutationArray = mutationlist.split(',');
  if ( mutationlist.length>0 ) {
  for ( var i=0; i<mutationArray.length;i++ ) {
    //WT-seq;
    var seqi=mutationArray[i].substring(0, 1);
    //not right here
    var posi=Number(mutationArray[i].substring(1, mutationArray[i].length-1 ));
    var muti=mutationArray[i].substring(mutationArray[i].length-1, mutationArray[i].length);
    if (muti.length!=1) {
    throw new Error(muti+" is not a valid codon");
    }
    if ( proteinSequence[posi-1]!=seqi ) {
      throw new Error(proteinSequence+" does not have "+seqi+" @position "+posi.toString());
    }
    outputstring[posi-1]=muti;
  }
  return outputstring.join("");
  } else {
   return proteinSequence; 
  }
}

/**
  *Function to mutate DNA given AA to a codon at specified location
  *
  *@param {dnaSequence} dnaSequence Input one letter sequence 1
  *@param {"A100ATG"} mutationlist Comma separated mutation list in format of A#ATG
  *@return mutated DNA sequence
  *@customfunction
*/
function Mutation2Codon(dnaSequence,mutationlist) {
  //check dna
  verifyDna(dnaSequence);

  var len_inputstring1 = dnaSequence.length;
  var mutationArray = new Array();
  var outputstring=dnaSequence.split('');
  
  //go through the mutation list
  mutationArray = mutationlist.split(',');
  if ( mutationlist.length>0 ) {
  for ( var i=0; i<mutationArray.length;i++ ) {
    //WT-seq;
    var seqi=mutationArray[i].substring(0, 1);
    var posi=Number(mutationArray[i].substring(1, mutationArray[i].length-3 ));
    var muti=mutationArray[i].substring(mutationArray[i].length-3, mutationArray[i].length);
    //check if codon is valid
    if (posi.isInteger) {
    throw new Error(posi+" is not a valid position");
    }
    //check if the input DNA sequence makes sense
    var inputcodon=[outputstring[3*posi-3],outputstring[3*posi-2],outputstring[3*posi-1]].join("");
    if ( seqi!=translate(inputcodon) ) {
    throw new Error(dnaSequence+" does not have "+seqi+" @position "+posi.toString() + ":" + translate(inputcodon));
    }
   //make the change if it pass the filter
    outputstring[3*posi-3]=muti[0];
    outputstring[3*posi-2]=muti[1];
    outputstring[3*posi-1]=muti[2];
  }
  return outputstring.join("");
  } else {
   return dnaSequence; 
  }
}


//pcrPrimerStats
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pcr_primer_stats.js
//http://www.bioinformatics.org/sms2/pcr_primer_stats.html
//https://pdfs.semanticscholar.org/2725/9a0cfbf8f154bece9836db8b7e9fea7d71a1.pdf
/**
  *Function to report describe the properties of a primer, including melting temperature, percent GC content, and PCR suitability. 
  *{@link http://www.bioinformatics.org/sms2/pcr_primer_stats.html}
  *
  *@param {dnaSequence} dnaSequence Input DNA sequence
  *@param {false} isPhosphorylated default (false)
  *@return primer stats
  *@customfunction
*/
function pcrPrimerStats(dnaSequence,isPhosphorylated=false) {
    //Nucleotide Code: Base:
    //---------------- -----
    //A.................Adenine
    //C.................Cytosine
    //G.................Guanine
    //T (or U)..........Thymine (or Uracil)
    //R.................A or G
    //Y.................C or T
    //S.................G or C
    //W.................A or T
    //K.................G or T
    //M.................A or C
    //B.................C or G or T
    //D.................A or G or T
    //H.................A or C or T
    //V.................A or C or G
    //N.................any base
    
    function _removeNonPrimer(sequence) {
      sequence.replace(/u/g, "t");
      sequence.replace(/U/g, "T");
      return sequence.replace(/[^gatcryswkmbdhvnGATCRYSWKMBDHVN]/g, "");
    }
    
    function _containsOnlyNonDegenerates(sequence) {
      if (sequence.search(/[^gatc]/i) == -1) {
        return true;
      }
      return false;
    }
    
    function _baseCounts(sequence) {
      var numG = _getBaseCount(sequence, "g");
      var numA = _getBaseCount(sequence, "a");
      var numT = _getBaseCount(sequence, "t");
      var numC = _getBaseCount(sequence, "c");
      var numOther = sequence.length - (numG + numA + numT + numC);
      return (
        "G=" +
        numG +
        "; A=" +
        numA +
        "; T=" +
        numT +
        "; C=" +
        numC +
        "; Other=" +
        numOther +
        ";"
      );
    }
    
    function _microgramsPerA260(sequence, isPhosphorylated) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _microgramsPerA260NonDegen(sequence, isPhosphorylated);
      } else {
        return _microgramsPerA260Degen(sequence, isPhosphorylated);
      }
    }
    
    function _microgramsPerA260NonDegen(sequence, isPhosphorylated) {
      var mw = _mw(sequence, isPhosphorylated);
      var result = mw / _getExtinctionCoefficient(sequence);
      return result.toFixed(2);
    }
    
    function _microgramsPerA260Degen(sequence, isPhosphorylated) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace all other degenerates with the base with lowest value in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "g");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "c");
    
      //replace all other degenerates with base with highest value in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "t");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "a");
    
      //swap upper and lower because of how downstream calculation is done
      //return _microgramsPerA260NonDegen(lowerBoundsSequence, isPhosphorylated) + " to " + _microgramsPerA260NonDegen(upperBoundsSequence, isPhosphorylated);
    
      return (
        _microgramsPerA260NonDegen(upperBoundsSequence, isPhosphorylated) +
        " to " +
        _microgramsPerA260NonDegen(lowerBoundsSequence, isPhosphorylated)
      );
    }
    
    function _nmolPerA260(sequence) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _nmolPerA260NonDegen(sequence);
      } else {
        return _nmolPerA260Degen(sequence);
      }
    }
    
    function _nmolPerA260NonDegen(sequence) {
      var result = _getExtinctionCoefficient(sequence);
      result = (1 / result) * 1000;
      return result.toFixed(2);
    }
    
    function _getExtinctionCoefficient(sequence) {
      var dimerValues = _getDimerExtinctionCoefficients();
      var singleValues = _getSingleExtinctionCoefficients();
      var dimerSum = 0;
      var singleSum = 0;
      sequence = sequence.toLowerCase();
    
      for (var i = 0; i < sequence.length - 1; i++) {
        dimerSum =
          dimerSum + dimerValues[sequence.charAt(i) + sequence.charAt(i + 1)];
      }
    
      for (var i = 1; i < sequence.length - 1; i++) {
        singleSum = singleSum + singleValues[sequence.charAt(i)];
      }
      return 2 * dimerSum - singleSum;
    }
    
    function _nmolPerA260Degen(sequence) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace all other degenerates with the base with lowest value in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "g");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "c");
    
      //replace all other degenerates with base with highest value in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "t");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "a");
    
      //swap upper and lower because of how downstream calculation is done
      //return _nmolPerA260NonDegen(lowerBoundsSequence) + " to " + _nmolPerA260NonDegen(upperBoundsSequence);
      return (
        _nmolPerA260NonDegen(upperBoundsSequence) +
        " to " +
        _nmolPerA260NonDegen(lowerBoundsSequence)
      );
    }
    
    function _percentGC(sequence) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _percentGCNonDegen(sequence);
      } else {
        return _percentGCDegen(sequence);
      }
    }
    
    function _percentGCNonDegen(sequence) {
      var numHits = _getBaseCount(sequence, "g") + _getBaseCount(sequence, "c");
      return ((numHits / sequence.length) * 100).toFixed(2);
    }
    
    function _percentGCDegen(sequence) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace degenerates that must be g or c with g in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
    
      //replace degenerates that must be a or t with a in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
    
      //replace all other degenerates with a or t in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "a");
    
      //replace all other degenerates with g or c in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
    
      return (
        _percentGCNonDegen(lowerBoundsSequence) +
        " to " +
        _percentGCNonDegen(upperBoundsSequence)
      );
    }
    
    function _molecularWeight(sequence, isPhosphorylated) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _molecularWeightNonDegen(sequence, isPhosphorylated);
      } else {
        return _molecularWeightDegen(sequence, isPhosphorylated);
      }
    }
    
    function _molecularWeightNonDegen(sequence, isPhosphorylated) {
      return _mw(sequence, isPhosphorylated).toFixed(2);
    }
    
    function _mw(sequence, isPhosphorylated) {
      //DNA molecular weight for synthesized oligonucleotides
      var g = _getBaseCount(sequence, "g");
      var a = _getBaseCount(sequence, "a");
      var t = _getBaseCount(sequence, "t");
      var c = _getBaseCount(sequence, "c");
      var phosAdjust = 0;
      if (isPhosphorylated) {
        phosAdjust = 79.0;
      }
      return g * 329.21 + a * 313.21 + t * 304.2 + c * 289.18 - 61.96 + phosAdjust;
    }
    
    function _molecularWeightDegen(sequence, isPhosphorylated) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace all other degenerates with lightest base possible in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "c");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "c");
    
      //replace all other degenerates with heaviest base possible in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "t");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
    
      return (
        _molecularWeightNonDegen(lowerBoundsSequence, isPhosphorylated) +
        " to " +
        _molecularWeightNonDegen(upperBoundsSequence, isPhosphorylated)
      );
    }
    
    function _basicTm(sequence) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _basicTmNonDegen(sequence);
      } else {
        return _basicTmDegen(sequence);
      }
    }
    
    function _basicTmNonDegen(sequence) {
      //Simple formula when primer length < 14 bases from
      //Rychlik, W. and Rhoads, R.E. (1989) Nucleic Acids Research 17, 8543
      //Tm = 4C x (number of G's and C's in the primer) + 2C x (number of A's and T's in the primer)
      //
      //When longer use:
      //tm = 64.9C + 41C * (number of G's and C's in the primer - 16.4)/ primer length
      //
      //both assume reaction is carried out in the presence of 50mM monovalent cations
    
      if (sequence.length < 14) {
        var numG = _getBaseCount(sequence, "g");
        var numC = _getBaseCount(sequence, "c");
        var numA = _getBaseCount(sequence, "a");
        var numT = _getBaseCount(sequence, "t");
        return (4 * (numG + numC) + 2 * (numA + numT)).toFixed(0);
      } else {
        var numG = _getBaseCount(sequence, "g");
        var numC = _getBaseCount(sequence, "c");
        return (64.9 + (41 * (numG + numC - 16.4)) / sequence.length).toFixed(0);
      }
    }
    
    function _basicTmDegen(sequence) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace degenerates that must be g or c with g in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
    
      //replace degenerates that must be a or t with a in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
    
      //replace all other degenerates with a or t in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "a");
    
      //replace all other degenerates with g or c in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
    
      return (
        _basicTmNonDegen(lowerBoundsSequence) +
        " to " +
        _basicTmNonDegen(upperBoundsSequence)
      );
    }
    
    //molarSalt in molar concentration
    function _molarSaltAdjustedTm(sequence, molarSalt) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _molarSaltAdjustedTmNonDegen(sequence, molarSalt);
      } else {
        return _molarSaltAdjustedTmDegen(sequence, molarSalt);
      }
    }
    
    function _molarSaltAdjustedTmNonDegen(sequence, molarSalt) {
      //commonly used formula takes into account the molarSalt concentration of the reaction:
      //Tm = 81.5C + 7.21C x Math.log(molarSalt) + (0.41 x GC) - (675 / primer length);
      //see refs
      //Rychlik, W. and Rhoads, R.E. (1989) Nucl. Acids Res. 17, 8543.
      //PCR Core Systems Technical Bulletin #TB254, Promega Corporation.
      //Sambrook, J., Fritsch, E.F. and Maniatis, T. (1989) Molecular Cloning: A Laboratory Manual, Cold Spring Harbor Laboratory Press, Cold Spring Harbor, NY.
      //Mueller, P.R. et al. (1993) In: Current Protocols in Molecular Biology 15.5, Greene Publishing Associates, Inc. and John Wiley and Sons, New York.
    
      var gcHits = _getBaseCount(sequence, "g") + _getBaseCount(sequence, "c");
      var pGC = (gcHits / sequence.length) * 100;
      return (
        81.5 +
        7.21 * Math.log(molarSalt) +
        0.41 * pGC -
        675 / sequence.length
      ).toFixed(0);
    }
    
    function _molarSaltAdjustedTmDegen(sequence, molarSalt) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace degenerates that must be g or c with g in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
    
      //replace degenerates that must be a or t with a in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
    
      //replace all other degenerates with a or t in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "a");
    
      //replace all other degenerates with g or c in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
    
      return (
        _molarSaltAdjustedTmNonDegen(lowerBoundsSequence, molarSalt) +
        " to " +
        _molarSaltAdjustedTmNonDegen(upperBoundsSequence, molarSalt)
      );
    }
    
    function _nearestNeighborTm(
      sequence,
      molarSalt,
      molarPrimerTotal,
      molarMagnesium
    ) {
      if (_containsOnlyNonDegenerates(sequence)) {
        return _nearestNeighborTmNonDegen(
          sequence,
          molarSalt,
          molarPrimerTotal,
          molarMagnesium
        );
      } else {
        return _nearestNeighborTmDegen(
          sequence,
          molarSalt,
          molarPrimerTotal,
          molarMagnesium
        );
      }
    }
    
    function _nearestNeighborTmNonDegen(
      sequence,
      molarSalt,
      molarPrimerTotal,
      molarMagnesium
    ) {
      //The most sophisticated Tm calculations take into account the exact sequence and base stacking parameters, not just the base composition.
      //Tm = ((1000* dh)/(ds+(R * Math.log(primer concentration))))-273.15;
      //Borer P.N. et al. (1974)  J. Mol. Biol. 86, 843.
      //SantaLucia, J. (1998) Proc. Nat. Acad. Sci. USA 95, 1460.
      //Allawi, H.T. and SantaLucia, J. Jr. (1997) Biochemistry 36, 10581.
      //von Ahsen N. et al. (1999) Clin. Chem. 45, 2094.
    
      sequence = sequence.toLowerCase();
    
      var R = 1.987; //universal gas constant in Cal/degrees C * mol
      var ds = 0; //cal/Kelvin/mol
      var dh = 0; //kcal/mol
    
      //perform salt correction
      var correctedSalt = molarSalt + molarMagnesium * 140; //adjust for greater stabilizing effects of Mg compared to Na or K. See von Ahsen et al 1999
      ds = ds + 0.368 * (sequence.length - 1) * Math.log(correctedSalt); //from von Ahsen et al 1999
    
      //perform terminal corrections
      var termDsCorr = _getTerminalCorrectionsDsHash();
      ds = ds + termDsCorr[sequence.charAt(0)];
      ds = ds + termDsCorr[sequence.charAt(sequence.length - 1)];
    
      var termDhCorr = _getTerminalCorrectionsDhHash();
      dh = dh + termDhCorr[sequence.charAt(0)];
      dh = dh + termDhCorr[sequence.charAt(sequence.length - 1)];
    
      var dsValues = _getDsHash();
      var dhValues = _getDhHash();
    
      for (var i = 0; i < sequence.length - 1; i++) {
        ds = ds + dsValues[sequence.charAt(i) + sequence.charAt(i + 1)];
        dh = dh + dhValues[sequence.charAt(i) + sequence.charAt(i + 1)];
      }
      return (
        (1000 * dh) / (ds + R * Math.log(molarPrimerTotal / 2)) -
        273.15
      ).toFixed(2);
    }
    
    function _nearestNeighborTmDegen(
      sequence,
      molarSalt,
      molarPrimerTotal,
      molarMagnesium
    ) {
      var lowerBoundsSequence = sequence;
      var upperBoundsSequence = sequence;
    
      //replace degenerates that must be g or c with g in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/s/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/s/gi, "g");
    
      //replace degenerates that must be a or t with a in both sequences
      lowerBoundsSequence = lowerBoundsSequence.replace(/w/gi, "a");
      upperBoundsSequence = upperBoundsSequence.replace(/w/gi, "a");
    
      //replace all other degenerates with a or t in lowerBoundsSequence
      lowerBoundsSequence = lowerBoundsSequence.replace(/r/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/y/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/k/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/m/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/b/gi, "t");
      lowerBoundsSequence = lowerBoundsSequence.replace(/d/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/h/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/v/gi, "a");
      lowerBoundsSequence = lowerBoundsSequence.replace(/n/gi, "a");
    
      //replace all other degenerates with g or c in upperBoundsSequence
      upperBoundsSequence = upperBoundsSequence.replace(/r/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/y/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/k/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/m/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/b/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/d/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/h/gi, "c");
      upperBoundsSequence = upperBoundsSequence.replace(/v/gi, "g");
      upperBoundsSequence = upperBoundsSequence.replace(/n/gi, "g");
    
      return (
        _nearestNeighborTmNonDegen(
          lowerBoundsSequence,
          molarSalt,
          molarPrimerTotal,
          molarMagnesium
        ) +
        " to " +
        _nearestNeighborTmNonDegen(
          upperBoundsSequence,
          molarSalt,
          molarPrimerTotal,
          molarMagnesium
        )
      );
    }
    
    function _getBaseCount(sequence, base) {
      var basePattern = new RegExp(base, "gi");
      if (sequence.search(basePattern) != -1) {
        return sequence.match(basePattern).length;
      } else {
        return 0;
      }
    }
    
    function _getTerminalCorrectionsDsHash() {
      //SantaLucia, J. (1998) Proc. Nat. Acad. Sci. USA 95, 1460.
      var hash = {};
      hash["g"] = -2.8;
      hash["a"] = 4.1;
      hash["t"] = 4.1;
      hash["c"] = -2.8;
      return hash;
    }
    
    function _getTerminalCorrectionsDhHash() {
      //SantaLucia, J. (1998) Proc. Nat. Acad. Sci. USA 95, 1460.
      var hash = {};
      hash["g"] = 0.1;
      hash["a"] = 2.3;
      hash["t"] = 2.3;
      hash["c"] = 0.1;
      return hash;
    }
    
    function _getDsHash() {
      //SantaLucia, J. (1998) Proc. Nat. Acad. Sci. USA 95, 1460.
      var hash = {};
      hash["gg"] = -19.9;
      hash["ga"] = -22.2;
      hash["gt"] = -22.4;
      hash["gc"] = -27.2;
    
      hash["ag"] = -21.0;
      hash["aa"] = -22.2;
      hash["at"] = -20.4;
      hash["ac"] = -22.4;
    
      hash["tg"] = -22.7;
      hash["ta"] = -21.3;
      hash["tt"] = -22.2;
      hash["tc"] = -22.2;
    
      hash["cg"] = -27.2;
      hash["ca"] = -22.7;
      hash["ct"] = -21.0;
      hash["cc"] = -19.9;
    
      return hash;
    }
    
    function _getDhHash() {
      //SantaLucia, J. (1998) Proc. Nat. Acad. Sci. USA 95, 1460.
      var hash = {};
      hash["gg"] = -8.0;
      hash["ga"] = -8.2;
      hash["gt"] = -8.4;
      hash["gc"] = -10.6;
    
      hash["ag"] = -7.8;
      hash["aa"] = -7.9;
      hash["at"] = -7.2;
      hash["ac"] = -8.4;
    
      hash["tg"] = -8.5;
      hash["ta"] = -7.2;
      hash["tt"] = -7.9;
      hash["tc"] = -8.2;
    
      hash["cg"] = -10.6;
      hash["ca"] = -8.5;
      hash["ct"] = -7.8;
      hash["cc"] = -8.0;
    
      return hash;
    }
    
    function _getDimerExtinctionCoefficients() {
      //netprimer documentation
      var hash = {};
      hash["gg"] = 10.8;
      hash["ga"] = 12.6;
      hash["gt"] = 10.0;
      hash["gc"] = 8.8;
    
      hash["ag"] = 12.5;
      hash["aa"] = 13.7;
      hash["at"] = 11.4;
      hash["ac"] = 10.6;
    
      hash["tg"] = 9.5;
      hash["ta"] = 11.7;
      hash["tt"] = 8.4;
      hash["tc"] = 8.1;
    
      hash["cg"] = 9.0;
      hash["ca"] = 10.6;
      hash["ct"] = 7.6;
      hash["cc"] = 7.3;
    
      return hash;
    }
    
    function _getSingleExtinctionCoefficients() {
      //netprimer documentation
      var hash = {};
      hash["g"] = 11.5;
      hash["a"] = 15.4;
      hash["t"] = 8.7;
      hash["c"] = 7.4;
    
      return hash;
    }
    
    function _getBaseRunsReport(sequence, minRunLength) {
      var report = "";
      var hasRun = false;
      var nucleotides = ["G", "A", "T", "C"];
    
      for (var i = 0; i < nucleotides.length; i++) {
        if (_hasRunOfBases(sequence, nucleotides[i], minRunLength)) {
          hasRun = true;
          report = report + "Contains run of " + nucleotides[i] + "'s; ";
        }
      }
    
      if (hasRun) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getDiNucleotideRunsReport(sequence, minRunLength) {
      var report = "";
      var hasRun = false;
      var diNucleotides = [
        "GA",
        "GT",
        "GC",
        "AG",
        "AT",
        "AC",
        "TG",
        "TA",
        "TC",
        "CG",
        "CA",
        "CT",
      ];
    
      for (var i = 0; i < diNucleotides.length; i++) {
        if (_hasRunOfBases(sequence, diNucleotides[i], minRunLength)) {
          hasRun = true;
          report = report + "Contains run of " + diNucleotides[i] + "'s; ";
        }
      }
    
      if (hasRun) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _hasRunOfBases(sequence, base, minRunLength) {
      var basePattern = new RegExp("(?:" + base + "){" + minRunLength + ",}", "gi");
      if (sequence.search(basePattern) != -1) {
        return sequence.match(basePattern).length;
      } else {
        return 0;
      }
    }
    
    function _getSuitableLengthReport(
      sequence,
      minSuitableLength,
      maxSuitableLength
    ) {
      var report = "";
      var hasProblem = false;
    
      if (sequence.length < minSuitableLength) {
        hasProblem = true;
        report = report + "Contains fewer than " + minSuitableLength + " bases; ";
      }
    
      if (sequence.length > maxSuitableLength) {
        hasProblem = true;
        report = report + "Contains more than " + maxSuitableLength + " bases; ";
      }
    
      if (hasProblem) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getSuitableGCReport(
      sequence,
      percentGCRange,
      minSuitableGC,
      maxSuitableGC
    ) {
      var report = "";
      var hasProblem = false;
      var lowerCalculated;
      var upperCalculated;
    
      //percentGCRange may be a single number or a string containing something like "40 to 60";
      var rangePattern = new RegExp("([d.]+)D+([d.]+)", "gi");
      if (percentGCRange.search(rangePattern) != -1) {
        lowerCalculated = parseFloat($1);
        upperCalculated = parseFloat($2);
      } else {
        lowerCalculated = parseFloat(percentGCRange);
        upperCalculated = parseFloat(percentGCRange);
      }
    
      if (lowerCalculated < minSuitableGC) {
        hasProblem = true;
        report = report + "%GC is less than " + minSuitableGC + "; ";
      }
    
      if (upperCalculated > maxSuitableGC) {
        hasProblem = true;
        report = report + "%GC is greater than " + maxSuitableGC + "; ";
      }
    
      if (hasProblem) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getSuitableLengthReport(
      sequence,
      minSuitableLength,
      maxSuitableLength
    ) {
      var report = "";
      var hasProblem = false;
    
      if (sequence.length < minSuitableLength) {
        hasProblem = true;
        report = report + "Contains fewer than " + minSuitableLength + " bases; ";
      }
    
      if (sequence.length > maxSuitableLength) {
        hasProblem = true;
        report = report + "Contains more than " + maxSuitableLength + " bases; ";
      }
    
      if (hasProblem) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getSuitableTmReport(sequence, range, minSuitable, maxSuitable) {
      var report = "";
      var hasProblem = false;
      var lowerCalculated;
      var upperCalculated;
    
      //range may be a single number or a string containing something like "40 to 60";
      var rangePattern = new RegExp("([d.]+)D+([d.]+)", "gi");
      if (range.search(rangePattern) != -1) {
        lowerCalculated = parseFloat($1);
        upperCalculated = parseFloat($2);
      } else {
        lowerCalculated = parseFloat(range);
        upperCalculated = parseFloat(range);
      }
    
      if (lowerCalculated < minSuitable) {
        hasProblem = true;
        report = report + "Tm is less than " + minSuitable + "; ";
      }
    
      if (upperCalculated > maxSuitable) {
        hasProblem = true;
        report = report + "Tm is greater than " + maxSuitable + "; ";
      }
    
      if (hasProblem) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getSuitableThreePrimeGC(sequence, minSuitable, maxSuitable) {
      var threePrimeEnd;
      var desiredThreePrimeEndSize = 5;
      var report = "";
      var gcCounts;
      var hasProblem = false;
      if (sequence.length >= desiredThreePrimeEndSize) {
        threePrimeEnd = sequence.substr(
          sequence.length - desiredThreePrimeEndSize,
          5
        );
      } else {
        threePrimeEnd = sequence;
      }
    
      gcCounts =
        _getBaseCount(threePrimeEnd, "g") + _getBaseCount(threePrimeEnd, "c");
    
      if (gcCounts < minSuitable) {
        hasProblem = true;
        report =
          report +
          "There are less than " +
          minSuitable +
          " G's or C's in the last " +
          threePrimeEnd.length +
          " bases; ";
      }
    
      if (gcCounts > maxSuitable) {
        hasProblem = true;
        report =
          report +
          "There are more than " +
          maxSuitable +
          " G's or C's in the last " +
          threePrimeEnd.length +
          " bases; ";
      }
    
      if (hasProblem) {
        return "Warning " + report;
      } else {
        return "Pass";
      }
    }
    
    function _getSelfComplementarityReport(sequence, maxContig, maxPercentIdent) {
      var matchScore = 1;
      var mismatchScore = -1;
      var gapPenalty = 99;
      var beginGapPenalty = 0;
      var endGapPenalty = 0;
    
      var returnHash = {};
      returnHash["report selfcomp"] = "";
      returnHash["upper selfcomp"] = "";
      returnHash["divider selfcomp"] = "";
      returnHash["lower selfcomp"] = "";
    
      var report = "";
      var hasProblem = false;
      var sequenceLength = sequence.length;
    
      var matrix = new Complementarity();
      matrix.setMatch(matchScore);
      matrix.setMismatch(mismatchScore);
    
      var scoreSet = new ScoreSet();
      scoreSet.setScoreSetParam(matrix, gapPenalty, beginGapPenalty, endGapPenalty);
    
      var rev = reverse(sequence);
      //convert String to Array
      sequence = sequence.match(/./g);
      rev = rev.match(/./g);
    
// change to using AlignPairLinear
      alignment = new AlignPairLinear();
      alignment.setAlignParam(sequence, rev, scoreSet);
      alignment.align();
      
      //align_pair_quad.js  
//this function does not work?
//      alignment = new AlignPairQuad();
//      alignment.initializeMatrix(sequence, rev, scoreSet);
//      alignment.fillMatrix();
//      alignment.align();
    
      //aligned output will be something like:
      //cttttgagcaagttcagcctggttaag--
      //--gaattggtccgacttgaacgagttttc
      var seqAligned = alignment.getAlignedM().replace(/\-/g, " ");
      var revAligned = alignment.getAlignedN().replace(/\-/g, " ");
    
      var score = alignment.score;
    
      var divider = new Array();
      var maxContiguous = 0;
      var totalMatches = 0;
      var contiguous = 0;
      for (var i = 0; i < seqAligned.length; i++) {
        if (
          scoreSet.getScore(seqAligned.charAt(i), revAligned.charAt(i)) ==
          matchScore
        ) {
          divider.push("|");
          contiguous++;
          totalMatches++;
        } else {
          divider.push(" ");
          contiguous = 0;
        }
    
        if (contiguous > maxContiguous) {
          maxContiguous = contiguous;
        }
      }
    
      if (maxContiguous > maxContig) {
        hasProblem = true;
        report =
          report +
          "There are more than " +
          maxContig +
          " self-annealing bases in a row; ";
      }
    
      if ((totalMatches / sequenceLength) * 100 > maxPercentIdent) {
        hasProblem = true;
        report =
          report +
          "More than " +
          maxPercentIdent +
          " percent of the bases are self-annealing; ";
      }
    
      if (hasProblem) {
        report = "Warning " + report;
      } else {
        report = "Pass";
      }
    
      returnHash["report selfcomp"] = report;
      returnHash["upper selfcomp"] = alignment.getAlignedM(); //seqAligned;
      returnHash["lower selfcomp"] = alignment.getAlignedN(); //revAligned;
      returnHash["divider selfcomp"] = divider.join("");
    
//      return returnHash;
//      return score+";"+alignment.getAlignedM()+";"+alignment.getAlignedN();
      return JSON.stringify(returnHash).substring(1,JSON.stringify(returnHash).length-1);
     
    }
    
    function _getHairpinReport(sequence, maxContig, maxPercentIdent) {
      var upper = sequence;
      upper = upper.match(/./g);
      var loop = "";
      var lower = new Array();
    
      var returnHash = {};
      returnHash["report hairpin"] = "";
      returnHash["upper hairpin"] = "";
      returnHash["divider hairpin"] = "";
      returnHash["lower hairpin"] = "";
    
      var topScore = 0;
      var score;
      var u;
      var l;
      var topScoreUpper = sequence;
      var topScoreLower = "";
      var topScoreLoop = "";
    
      var matchScore = 1;
      var mismatchScore = -1;
      var gapPenalty = 99;
      var beginGapPenalty = 0;
      var endGapPenalty = 0;
    
      var report = "";
      var hasProblem = false;
      var sequenceLength = sequence.length;
    
      var matrix = new Complementarity();
      matrix.setMatch(matchScore);
      matrix.setMismatch(mismatchScore);
    
      var scoreSet = new ScoreSet();
      scoreSet.setScoreSetParam(matrix, gapPenalty, beginGapPenalty, endGapPenalty);
    
      while (upper.length > 0) {
        score = 0;
        if (loop == "") {
          loop = upper.pop();
        } else {
          lower.push(loop);
          loop = "";
        }
    
        //determine score
        u = upper.length - 1;
        l = lower.length - 1;
        while (u >= 0 && l >= 0) {
          score = score + scoreSet.getScore(upper[u], lower[l]);
          u--;
          l--;
        }
    
        if (score > topScore) {
          topScore = score;
          topScoreUpper = upper.join("");
          topScoreLower = lower.join("");
          topScoreLoop = loop;
        }
      }
    
      //format top scoring hit and return
    
      var upperLowerDiff = topScoreUpper.length - topScoreLower.length;
      if (upperLowerDiff > 0) {
        for (var i = 0; i < upperLowerDiff; i++) {
          topScoreLower = " " + topScoreLower;
        }
      } else if (upperLowerDiff < 0) {
        for (var i = upperLowerDiff; i < 0; i++) {
          topScoreUpper = " " + topScoreUpper;
        }
      }
    
      var maxContiguous = 0;
      var totalMatches = 0;
      var contiguous = 0;
      var divider = new Array();
      //add vertical lines between matches
      for (var i = 0; i < topScoreUpper.length; i++) {
        if (
          scoreSet.getScore(topScoreUpper.charAt(i), topScoreLower.charAt(i)) ==
          matchScore
        ) {
          divider.push("|");
          contiguous++;
          totalMatches++;
        } else {
          divider.push(" ");
          contiguous = 0;
        }
    
        if (contiguous > maxContiguous) {
          maxContiguous = contiguous;
        }
      }
    
      if (maxContiguous > maxContig) {
        hasProblem = true;
        report =
          report + "There are more than " + maxContig + " hairpin bases in a row; ";
      }
    
      if ((totalMatches / sequenceLength) * 100 > maxPercentIdent) {
        hasProblem = true;
        report =
          report +
          "More than " +
          maxPercentIdent +
          " percent of the bases are in a hairpin; ";
      }
    
      if (hasProblem) {
        report = "Warning " + report;
      } else {
        report = "Pass";
      }
    
      if (topScoreLoop == "") {
        topScoreLoop = ")";
      }
    
      returnHash["report hairpin"] = report;
      returnHash["upper hairpin"] = topScoreUpper.replace(/ /g,'-');
      returnHash["divider hairpin"] = divider.join("") + topScoreLoop;
      returnHash["lower hairpin"] = topScoreLower.replace(/ /g,'-');;
    
//      return returnHash;
      return JSON.stringify(returnHash).substring(1,JSON.stringify(returnHash).length-1);

    }

 if (dnaSequence.map) {
    return dnaSequence.map(dnaSequence => pcrPrimerStats(dnaSequence,isPhosphorylated));
  } else {
    verifyDna(dnaSequence);
    
  var maxPrimerLength = 50;
  var milliMolarSalt = 50;
  var milliMolarMagnesium = 1.5;
  var nanoMolarPrimerTotal = 200;
//  var isPhosphorylated = false;
    
  var molarSalt = milliMolarSalt / 1e3; //convert to molar from millimolar
  var molarMagnesium = milliMolarMagnesium / 1e3; //convert to molar from millimolar
  var molarPrimerTotal = nanoMolarPrimerTotal / 1e9; //convert to molar from nanomolar

  //molarSalt affects Salt adjusted Tm and Tm (Nearest neighbor)
  //molarMagnesium affects Tm (Nearest neighbor)
  //molarPrimerTotal affects Tm (Nearest neighbor)
  //isPhosphorylated affects molecular weight
  
    var newDna=dnaSequence;
  
    newDna = _removeNonPrimer(newDna);

    if (newDna.length == 0) {
      throw new Error(newDna+" has length 0");
    }

    if (newDna.length > maxPrimerLength) {
      throw new Error(newDna+" lenght "+ newDna.length + "is greater than " + maxPrimerLength);
    }

    var percentGC = _percentGC(newDna);
    var nearestNeighborTm = _nearestNeighborTm(
      newDna,
      molarSalt,
      molarPrimerTotal,
      molarMagnesium
    );
    var selfCompHash = _getSelfComplementarityReport(newDna, 3, 50);
    var hairpinHash = _getHairpinReport(newDna, 3, 50);
    
    var output = {};
    output["length"]=":"+newDna.length;
    output["GC content (%)"]=":"+percentGC;
    output["Base counts"]=":"+_baseCounts(newDna);
    output["Molecular weight (Daltons)"]=":"+_molecularWeight(newDna, isPhosphorylated);
    output["nmol/A260"]=":"+_nmolPerA260(newDna);
    output["micrograms/A260"]=":"+_microgramsPerA260(newDna, isPhosphorylated);
    output["Basic Tm (degrees C)"]=":"+_basicTm(newDna);
    output["Salt adjusted Tm (degrees C)"]=":"+_molarSaltAdjustedTm(newDna, molarSalt);
    output["Nearest neighbor Tm (degrees C)"]=":"+nearestNeighborTm;
    output["Single base runs"]=":"+_getBaseRunsReport(newDna, 5);
    output["Dinucleotide base runs"]=":"+_getDiNucleotideRunsReport(newDna, 5);
    output["Length report"]=":"+_getSuitableLengthReport(newDna, 14, 30);
    output["Percent GC"]=":"+_getSuitableGCReport(newDna, percentGC, 40, 60);
    output["Tm (Nearest neighbor)"]=":"+_getSuitableTmReport(newDna, nearestNeighborTm, 50, 58);
    output["GC clamp"]=":"+_getSuitableThreePrimeGC(newDna, 1, 3);
    //join hash in someway
    // https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
//    https://stackoverflow.com/questions/29737024/json-stringifyarray-surrounded-with-square-brackets/29737150
    return (JSON.stringify(output).substring(1,JSON.stringify(output).length-1)+","+selfCompHash+","+hairpinHash).replace(/"/g,'');
  }
}


////general template for dna
////https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/pcr_primer_stats.js
////http://www.bioinformatics.org/sms2/pcr_primer_stats.html
///**
//  *Function to calculate GRAVY (grand average of hydropathy) value for the protein sequences. 
//  *{@link http://www.bioinformatics.org/sms2/pcr_primer_stats.html}
//  *
//  *@param {dnaSequence} dnaSequence Input DNA sequence
//  *@return GRAVY of input protein
//  *@customfunction
//*/
//function pcrPrimerStats(dnaSequence) {
// if (dnaSequence.map) {
//    return dnaSequence.map(pcrPrimerStats);
//  } else {
//    verifyDna(dnaSequence);
//    
//    
//    
//  }
//}


//general template for protein
//https://github.com/paulstothard/sequence_manipulation_suite/blob/655ff5cce6bb9eae9928dadc1a8f586ba67bd11b/docs/scripts/protein_gravy.js
//http://www.bioinformatics.org/sms2/protein_gravy.html
///**
//  *Function to calculate GRAVY (grand average of hydropathy) value for the protein sequences. http://www.bioinformatics.org/sms2/protein_gravy.html
//  *
//  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
//  *@return GRAVY of input protein
//  *@customfunction
//*/
//function proteinGravy(proteinSequence) {
// if (proteinSequence.map) {
//    return proteinSequence.map(proteinGravy);
//  } else {
//    return getProteinGravy(proteinSequence);
//  }
//}


//https://biopython.org/DIST/docs/api/Bio.SeqUtils.ProtParam-pysrc.html
//https://biopython.org/DIST/docs/api/Bio.SeqUtils.ProtParam-pysrc.html#ProteinAnalysis.molar_extinction_coefficient
//  * @fileoverview referenced biopython ProteinAnalysis.molar_extinction_coefficient
//  * @biopython
/**
  *Function to calculate Calculate the molar extinction coefficient (units of  M-1 cm-1, at 280 nm measured in water). {@link https://web.expasy.org/cgi-bin/protparam/protparam}
  *
  *@param {proteinSequence} proteinSequence Input Protein one letter sequence
  *@param {"reduced"} Cys oxidation state of Cys reduced (default) or disulfide
  *@return Extiniction Coefficient of input protein
  *@customfunction
*/
function MolarExtinction(proteinSequence,Cys="reduced") {
 if (proteinSequence.map) {
     return proteinSequence.map(proteinSequence => MolarExtinction(proteinSequence,Cys));
  } else {
    verifyProtein(proteinSequence);
    
    var matchExp_W=eval("/W/ (W)1".match(/\/[^\/]+\//) + "gi");
    var matchExp_Y=eval("/Y/ (Y)1".match(/\/[^\/]+\//) + "gi");
    var matchExp_C=eval("/C/ (C)1".match(/\/[^\/]+\//) + "gi");
    var count_W=0;
    var count_Y=0;
    var count_C=0;
    //need to acount for errors
    if (proteinSequence.search(matchExp_W) != -1) {
        count_W = proteinSequence.match(matchExp_W).length;
    }
    if (proteinSequence.search(matchExp_Y) != -1) {
        count_Y = proteinSequence.match(matchExp_Y).length;
    }
    if (proteinSequence.search(matchExp_C) != -1) {
        count_C = proteinSequence.match(matchExp_C).length;
    }

    var mec_reduced = count_W * 5500.0 + count_Y * 1490.0;
    if (Cys != "reduced") {
      mec_reduced = mec_reduced + ( count_C / 2.0 ) * 125.0;
    }
    return mec_reduced;
  }
}

//peptide_mod
/**
  *Function to analyze and return array{unmodified_seq, N-term, C-term, internal-mod} of peptide sequence; in the sequence, modification is enclosed in ()
  *
  *@param {peptideSequence} peptideSequence Input Protein one letter sequence
  *@return {SequenceModArray}
  *@customfunction
  *@private
*/
function peptide_mod(peptideSequence) {
 if (peptideSequence.map) {
    return peptideSequence.map(peptide_mod);
  } else {
//  https://blog.bitsrc.io/a-beginners-guide-to-regular-expressions-regex-in-javascript-9c58feb27eb4
//http://www.regexplained.co.uk/
//https://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript

    if (peptideSequence.replace(/\(/g,"").length != peptideSequence.replace(/\)/g,"").length ) {
      throw new Error(peptideSequence+" contains unpaired ( or )");
    }
    
    var value_AA_N_C=[];
    
    var modRegex = /\(([^)]+)\)/g;
    var values = [];
    var matches;
    var newseq=peptideSequence;
    var newRegex;
    var NtermMod="no_Nmod";
    var CtermMod="no_Cmod";
    while (matches = modRegex.exec(peptideSequence)) {
        values.push(matches[1]);
        newRegex = new RegExp(matches[1], "gi")
        newseq=newseq.replace(newRegex, "");       
    }
    
    //is there other bad characters?
    
    //replace all the parenthesis
    newseq=newseq.replace(/[\(|\)]/gi, "");
    
    //replace all starting numbers, beginning and ending -
    newseq=newseq.replace(/^[0-9]*/gi, "");
    newseq=newseq.replace(/-+$/gi, "");
    newseq=newseq.replace(/^-+/gi, "");
    
    //get things between two -
    var twoDashRegex = /-([^-]+)-/gi;
    //notsure which one is N or C
    var afterDashRegex = /-([^-]+)/gi;
    var beforeDashRegex = /([^-]+)-/gi;
    
    //defferent senarios; we can use length?
    //Nterminal modifications?
    //Cterminal modifications?
    if (matches=twoDashRegex.exec(newseq)) {

      //this part does not work!
      var matchNtermMod = beforeDashRegex.exec(newseq.replace("-"+matches[1]+"-", "-"));
      NtermMod=matchNtermMod[1];
      var matchCtermMod = afterDashRegex.exec(newseq.replace("-"+matches[1]+"-", "-"));
      CtermMod=matchCtermMod[1];
      newseq=matches[1];

    } else if (matches=beforeDashRegex.exec(newseq)) {
       //one of the N-term or C-term mod is not specified
       var match1=matches[1];
       matches=afterDashRegex.exec(newseq);
       var match2=matches[1];
       
       //explict to allow x in sequence
       if ( match1.search(/[^acdefghiklmnpqrstvwyzx\*\s]/i) == -1 ) {
       //match1 is protein
           if ( match2.search(/[^acdefghiklmnpqrstvwyzx\*\s]/i) == -1 ) {
           //both contain protein char, sometimes mod are made of protein char
               if (match1.length > match2.length) {
                 CtermMod=match2;
                 newseq=match1;
               } else {
                 NtermMod=match1;
                 newseq=match2;
               }
           } else {
           //match2 is C-term tag
             CtermMod=match2;
             newseq=match1;
           }
       } else {
           if ( match2.search(/[^acdefghiklmnpqrstvwyzx\*\s]/i) == -1 ) {
             NtermMod=match1;
             newseq=match2;
           } 
       }
      
    }   
      newseq=removeNonProteinAllowDegen(newseq);
//    return "N: "+NtermMod+" C: "+ CtermMod;
//      return newseq;
      if ( values.length ==0 ) {
          values.push("no_internal_mod");
      }
      
      value_AA_N_C.push(newseq);
      value_AA_N_C.push(NtermMod);
      value_AA_N_C.push(CtermMod);
      return value_AA_N_C.concat(values).join(",");
  }
}

//clean_peptide
/**
  *Function to analyze and return clean peptide sequence; in the sequence, modification is enclosed in ()
  *
  *@param {peptideSequence} peptideSequence Input Protein one letter sequence
  *@return clean peptide sequence
  *@customfunction
*/
function clean_peptide(peptideSequence) {
 if (peptideSequence.map) {
    return peptideSequence.map(clean_peptide);
  } else {
   var peptide_mod_array=peptide_mod(peptideSequence).split(",");
   return peptide_mod_array[0];
  }
}

//peptide_Nmod
/**
  *Function to analyze and return N-term  of peptide sequence; in the sequence, modification is enclosed in ()
  *
  *@param {peptideSequence} peptideSequence Input Protein one letter sequence
  *@return N-term
  *@customfunction
*/
function peptide_Nmod(peptideSequence) {
 if (peptideSequence.map) {
    return peptideSequence.map(peptide_Nmod);
  } else {
   var peptide_mod_array=peptide_mod(peptideSequence).split(",");
   var Nmod;
   if ( peptide_mod_array[1]=="H" || peptide_mod_array[1]=="no_Nmod" ) {
       Nmod=""
   } else {
       Nmod=peptide_mod_array[1];
   }
   return Nmod;
  }
}

//peptide_Cmod
/**
  *Function to analyze and return C-term mod of peptide sequence; in the sequence, modification is enclosed in ()
  *
  *@param {peptideSequence} peptideSequence Input Protein one letter sequence
  *@return C-term
  *@customfunction
*/
function peptide_Cmod(peptideSequence) {
 if (peptideSequence.map) {
    return peptideSequence.map(peptide_Cmod);
  } else {
   var peptide_mod_array=peptide_mod(peptideSequence).split(",");
   var Cmod;
   if ( peptide_mod_array[2]=="OH" || peptide_mod_array[1]=="no_Cmod" ) {
       Cmod=""
   } else {
       Cmod=peptide_mod_array[2];
   }
   return Cmod;
  }
}


//peptide_intern_mod
/**
  *Function to analyze and return C-term mod of peptide sequence; in the sequence, modification is enclosed in ()
  *
  *@param {peptideSequence} peptideSequence Input Protein one letter sequence
  *@return internal-mod
  *@customfunction
*/
function peptide_intern_mod(peptideSequence) {
 if (peptideSequence.map) {
    return peptideSequence.map(peptide_intern_mod);
  } else {
   var peptide_mod_array=peptide_mod(peptideSequence).split(",");
      
   var peptide_intern_mod_array=[];
   var i;
   for (i = 3; i < peptide_mod_array.length; i++) {
      peptide_intern_mod_array.push(peptide_mod_array[i]);
   }
   
   
   if ( peptide_intern_mod_array.join(",")=="no_internal_mod" ) {
     return "";
   } else {
     return peptide_intern_mod_array.join(",");
  }

}
}


//dna_mod
/**
  *Function to analyze and return modification list of a dna sequence; in the sequence, dna modification is enclosed in //
  *
  *@param {dnaSequence} dnaSequence Input DNA one letter sequence
  *@return {mods}
  *@customfunction
*/
function dna_mod(dnaSequence) {
 if (dnaSequence.map) {
    return dnaSequence.map(dna_mod);
  } else {

    if ((dnaSequence.replace(/\//g,"").length-dnaSequence.length) %2 != 0  ) {
      throw new Error(dnaSequence+" contains unpaired /");
    }
    
    var values = [];
    //simple loop and that should be it!
    var i=0;
    var j;
    while (i<dnaSequence.length) {
        if ( dnaSequence[i]!="/" ) {
          i++;
        } 
        
//        else {
//          values.push(i);
//          i++;
//        }
        else {
//          values.push(i);
          j=i+1;
          while (j<dnaSequence.length && dnaSequence[j]!="/") {
              j++;
          }
//          values.push(j);
          values.push(dnaSequence.substring(i,j+1));
          i=j+1;
          
        }
    }

    return values.join(",");
  }
}

//add list of DNA modification
//add list of Peptide modification

//get custom modification and MW

//this could be better suited for web-apps calling, implement it later! with R and python scripts
//chemical informatics library
//https://github.com/partridgejiang/Kekule.js
//https://stackoverflow.com/questions/44182925/can-you-write-a-google-sheets-function-that-draws-something
//https://github.com/reymond-group/smilesDrawer/blob/master/src/SvgDrawer.js
//https://sites.google.com/a/mcpher.com/share/Home/excelquirks/gassnips/copycanvas


//https://web.expasy.org/cgi-bin/protscale/protscale.pl

// other peptide related codes
////https://github.com/alexarnimueller/modlAMP
////https://github.com/alexarnimueller/modlAMP/blob/master/modlamp/analysis.py

//some useful discussions to format the documentation
//https://stackoverflow.com/questions/28245463/how-to-force-newlines-in-google-apps-jsdoc-descriptions/29284639#29284639
//https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments

//https://www.benlcollins.com/apps-script/google-apps-script-beginner-guide/
//https://developers.google.com/apps-script/guides/triggers
//https://developers.google.com/apps-script/guides/triggers/installable
//add a custom function to run ( as a welcome when installing), and with that all functions should be available
//also need to create a function that contains a list of all available functions
//not sure. Don't like it that much

//this code appears to generate html documentation
//https://github.com/jsdoc/jsdoc
//https://devhints.io/jsdoc
//https://survivejs.com/maintenance/documentation/api/


//need to implement test functions in case it breaks
//need to find ways to do heavy lifting ( API ) or run python or R in googlesheet tutorial
