//useful functions for doing simple bioinformatics on Google sheet
//
// port several code from biopython
//
// https://github.com/LJI-Bioinformatics/Excel-Reverse-Complement
// revcom done
// complement done
// reverse done
// translation done
// primer3 Tm 
// GC done
// seq3 and seq1 conversion done
// MW (protein only) done
// PI
// charge of peptide
// hydrophobicity of peptide
// transcribe
// mutation between two sequence done

// general javascript
// https://www.w3schools.com/js/js_string_methods.asp

// port from biopython
// http://biopython.org/DIST/docs/api/Bio.SeqUtils-pysrc.html

/**
  *Function to GC contect of a sequence
  *
  *@param {string} inputstring Input DNA sequence
  *@return GC% in Input DNA sequence
  *@customfunction
*/
function GC(inputstring) {
  //check DNA
  if (!(/^[atcgs]+$/i.test(inputstring))) {
    throw new Error("Not a DNA format");
  }
  //count G/C, and ambiguous S
  var len_inputstring = inputstring.length;
  var GCcount=0;
  for (var i=0, l=len_inputstring; i<len_inputstring; i += 1) {
     if ( (inputstring[i].toUpperCase() == "G") || (inputstring[i].toUpperCase() == "C") || (inputstring[i].toUpperCase() == "S") ) {
            GCcount += 1;
    }
  }
  return GCcount/len_inputstring;
}

//https://github.com/biopython/biopython/blob/109604b3a6f43c5a941746381069b7d2ede3b7e9/Bio/Data/IUPACData.py
/**
  *Function to convert one letter AA sequence to three letters
  *
  *@param {string} inputstring Input Protein one letter sequence
  *@return three letter sequence of one letter sequence
  *@customfunction
*/
function Seq3(inputstring) {
  //check protein
  if (!(/^[acdefghiklmnpqrstvwy]+$/i.test(inputstring))) {
    throw new Error("Not a single letter protein format");
  }
  
  var protein_letters_1to3 = {
    'A': 'Ala',
    'C': 'Cys',
    'D': 'Asp',
    'E': 'Glu',
    'F': 'Phe',
    'G': 'Gly',
    'H': 'His',
    'I': 'Ile',
    'K': 'Lys',
    'L': 'Leu',
    'M': 'Met',
    'N': 'Asn',
    'P': 'Pro',
    'Q': 'Gln',
    'R': 'Arg',
    'S': 'Ser',
    'T': 'Thr',
    'V': 'Val',
    'W': 'Trp',
    'Y': 'Tyr'
  };
  
  var len_inputstring = inputstring.length;
  var outputstring="";
  var i;
  for ( i=0; i<len_inputstring; i++) {
    outputstring+=protein_letters_1to3[inputstring[i].toUpperCase()];
  }
  return outputstring; 
}

/**
  *Function to convert three letters AA sequence to one letter
  *
  *@param {string} inputstring Input Protein three letter sequence
  *@return one letter sequence of three letters sequence
  *@customfunction
*/
function Seq1(inputstring) {
  //check protein sequence
  if (!(/^[acdefghiklmnpqrstvwyuo]+$/i.test(inputstring))) {
    throw new Error("Not a three letter protein format");
  }
    //check length of the range
  if ( (inputstring.length)%3 != 0 ) {
    throw new Error("Length is not a mulitple of 3");
  }
  
  var protein_letters_3to1 = {
    'ALA':'A',
    'CYS':'C',
    'ASP':'D',
    'GLU':'E',
    'PHE':'F',
    'GLY':'G',
    'HIS':'H',
    'ILE':'I',
    'LYS':'K',
    'LEU':'L',
    'MET':'M',
    'ASN':'N',
    'PRO':'P',
    'GLN':'Q',
    'ARG':'R',
    'SER':'S',
    'THR':'T',
    'VAL':'V',
    'TRP':'W',
    'TYR':'Y'
  };
  
  var len_inputstring = inputstring.length;
  var outputstring="";
  var i;
  for ( i=0; i<len_inputstring; i+=3) {
    var three_letter_i=inputstring[i]+inputstring[i+1]+inputstring[i+2];
    outputstring+=protein_letters_3to1[three_letter_i.toUpperCase()];
  }
  return outputstring; 
}

/**
  *Function to calculate MW of single letter protein sequence (sum of average)
  *
  *@param {string} inputstring Input Protein one letter sequence
  *@return MW of protein sequence
  *@customfunction
*/
function MW(inputstring) {
  //check protein
  if (!(/^[acdefghiklmnpqrstvwy]+$/i.test(inputstring))) {
    throw new Error("Not a single letter protein format");
  }
  
  var protein_weights = {
//https://github.com/biopython/biopython/blob/109604b3a6f43c5a941746381069b7d2ede3b7e9/Bio/Data/IUPACData.py
    "A": 89.0932,
    "C": 121.1582,
    "D": 133.1027,
    "E": 147.1293,
    "F": 165.1891,
    "G": 75.0666,
    "H": 155.1546,
    "I": 131.1729,
    "K": 146.1876,
    "L": 131.1729,
    "M": 149.2113,
    "N": 132.1179,
    "O": 255.3134,
    "P": 115.1305,
    "Q": 146.1445,
    "R": 174.201,
    "S": 105.0926,
    "T": 119.1192,
    "U": 168.0532,
    "V": 117.1463,
    "W": 204.2252,
    "Y": 181.1885
  };
  
  var water = 18.0153;
  var len_inputstring = inputstring.length;
  var outputMW=0;
  var i;
  for ( i=0; i<len_inputstring; i++) {
    outputMW+=protein_weights[inputstring[i].toUpperCase()];
  }
  
  if ( len_inputstring>1 ) {
  outputMW-=water*(len_inputstring-1);
  }
  return outputMW; 
}


/**
  *Function to reverse a string
  *
  *@param {string} inputstring Original Value
  *@return The inputstring in reverse order
  *@customfunction
*/
function reverse(inputstring) {
  
//  var len_inputstring = inputstring.length;
//  var outputstring="";
//  var i;
//  for ( i=0; i<len_inputstring; i++) {
//    outputstring+=inputstring[len_inputstring-i-1]
//  }
//  return outputstring; 
  
 //https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb
  return inputstring.split("").reverse().join("");
}

/**
  *Function to complement a DNA/RNA sequence
  *
  *@param {string} inputstring Original Value
  *@param {boolean} opt_isRNA Original Value
  *@return The inputstring in reverse order
  *@customfunction
*/
function complement(inputstring,opt_isRNA) {
   // https://yagisanatode.com/2018/08/24/google-apps-script-how-to-make-a-custom-function-to-use-in-google-sheets/
   // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript/23476587
  
   //Check RNA or DNA and # of arguments
   if (arguments.length < 1) {
    throw new Error("Must at least have one argument")
   };
   //RNA arguments
   var RNA=1;
   if(opt_isRNA) {
    RNA=1; 
   } else {
    RNA=0; 
   }

  var outputstring=inputstring;
//check for RAN and DNA  
  if (/^[aucg]+$/i.test(inputstring) && (RNA==1) ) {
    outputstring=outputstring.replace(/a/g,"1");
    outputstring=outputstring.replace(/A/g,"2");
        //RNA specific
    outputstring=outputstring.replace(/u/g,"a");
    outputstring=outputstring.replace(/U/g,"A");
    outputstring=outputstring.replace(/2/g,"U");
    outputstring=outputstring.replace(/1/g,"u");
    
    outputstring=outputstring.replace(/c/g,"3");
    outputstring=outputstring.replace(/C/g,"4");
    outputstring=outputstring.replace(/g/g,"c");
    outputstring=outputstring.replace(/G/g,"C");
    outputstring=outputstring.replace(/4/g,"G");
    outputstring=outputstring.replace(/3/g,"g");
  return outputstring;
  } else if ( /^[atcg]+$/i.test(inputstring) && (RNA==0) ) {
    outputstring=outputstring.replace(/a/g,"1");
    //DNA specific
    outputstring=outputstring.replace(/A/g,"2");
    outputstring=outputstring.replace(/t/g,"a");
    outputstring=outputstring.replace(/T/g,"A");
    outputstring=outputstring.replace(/2/g,"T");
    outputstring=outputstring.replace(/1/g,"t");
      
    outputstring=outputstring.replace(/c/g,"3");
    outputstring=outputstring.replace(/C/g,"4");
    outputstring=outputstring.replace(/g/g,"c");
    outputstring=outputstring.replace(/G/g,"C");
    outputstring=outputstring.replace(/4/g,"G");
    outputstring=outputstring.replace(/3/g,"g");
    return outputstring;  
  } else {
    throw new Error("Must only contain AUCG for RNA and ATCG for DNA");
  }
}


/**
  *Function to reverse complements a sequence
  *
  *@param {string} inputstring Original Value
  *@return reverse complement of inputstring 
  *@customfunction
*/
function revcom(inputstring,opt_isRNA) {
  return reverse(complement(inputstring,opt_isRNA))
}

/**
  *Function to translate a DNA sequence to protein
  *
  *@param {string} inputstring Original Value
  *@param {number} start Starting base (1 based)
  *@param {number} end End base (1 based)
  *@return protein translation of inputstring between start and end
  *@customfunction
*/
function translate(inputstring,start,end) {
  var starti=1;
  var endi=inputstring.length;
  
  // set start and end value, and mulitple of 3
  if (arguments.length < 1) {
    throw new Error("inputstring required");
  } else if (arguments.length == 3) {
    if (start > end) {
      throw new Error("start cannot be greater than end");  
    } else {
      starti=start;
      endi=end;
    }
  }
  
  //check DNA
  if (!(/^[atcgnswrvkdty]+$/i.test(inputstring))) {
    throw new Error("Not a DNA format");
  }
  
  //check length of the range
  if ( (endi-starti+1)%3 != 0 ) {
    throw new Error("Length is not a mulitple of 3");
  }
 
   //https://jsperf.com/if-switch-lookup-table/1  
  // standard ncbi translation table
  // https://github.com/biopython/biopython/blob/master/Bio/Data/CodonTable.py
  var codonTable = {
    "TTT": function() {
      return "F";
    },
    "TTC": function() {
      return "F";
    },
    "TTA": function() {
      return "L";
    },
    "TTG": function() {
      return "L";
    },
    "TCT": function() {
      return "S";
    },
    "TCC": function() {
      return "S";
    },
    "TCA": function() {
      return "S";
    },
    "TCG": function() {
      return "S";
    },
    "TAT": function() {
      return "Y";
    },
    "TAC": function() {
      return "Y";
    },
    "TGT": function() {
      return "C";
    },
    "TGC": function() {
      return "C";
    },
    "TGG": function() {
      return "W";
    },
    "CTT": function() {
      return "L";
    },
    "CTC": function() {
      return "L";
    },
    "CTA": function() {
      return "L";
    },
    "CTG": function() {
      return "L";
    },
    "CCT": function() {
      return "P";
    },
    "CCC": function() {
      return "P";
    },
    "CCA": function() {
      return "P";
    },
    "CCG": function() {
      return "P";
    },
    "CAT": function() {
      return "H";
    },
    "CAC": function() {
      return "H";
    },
    "CAA": function() {
      return "Q";
    },
    "CAG": function() {
      return "Q";
    },
    "CGT": function() {
      return "R";
    },
    "CGC": function() {
      return "R";
    },
    "CGA": function() {
      return "R";
    },
    "CGG": function() {
      return "R";
    },
    "ATT": function() {
      return "I";
    },
    "ATC": function() {
      return "I";
    },
    "ATA": function() {
      return "I";
    },
    "ATG": function() {
      return "M";
    },
    "ACT": function() {
      return "T";
    },
    "ACC": function() {
      return "T";
    },
    "ACA": function() {
      return "T";
    },
    "ACG": function() {
      return "T";
    },
    "AAT": function() {
      return "N";
    },
    "AAC": function() {
      return "N";
    },
    "AAA": function() {
      return "K";
    },
    "AAG": function() {
      return "K";
    },
    "AGT": function() {
      return "S";
    },
    "AGC": function() {
      return "S";
    },
    "AGA": function() {
      return "R";
    },
    "AGG": function() {
      return "R";
    },
    "GTT": function() {
      return "V";
    },
    "GTC": function() {
      return "V";
    },
    "GTA": function() {
      return "V";
    },
    "GTG": function() {
      return "V";
    },
    "GCT": function() {
      return "A";
    },
    "GCC": function() {
      return "A";
    },
    "GCA": function() {
      return "A";
    },
    "GCG": function() {
      return "A";
    },
    "GAT": function() {
      return "D";
    },
    "GAC": function() {
      return "D";
    },
    "GAA": function() {
      return "E";
    },
    "GAG": function() {
      return "E";
    },
    "GGT": function() {
      return "G";
    },
    "GGC": function() {
      return "G";
    },
    "GGA": function() {
      return "G";
    },
    "GGG": function() {
      return "G";
    },
    "TAA": function() {
      return "X";
    },
    "TAG": function() {
      return "X";
    },
    "TGA": function() {
      return "X";
    },
    "NNK": function() {
      return "[ACDEFGHIKLMNPQRSTVWXY]";
    },
    "NNC": function() {
      return "[ACDFGHILNPRSTVY]";
    },
    "NWW": function() {
      return "[DEFHIKLNQVY]";
    },
    "RVK": function() {
      return "[ADEGHKNRST]";
    },
    "DVT": function() {
      return "[ACDGNSTY]";
    },
    "NVT": function() {
      return "[CDGHNPRSTY]";
    },
    "NNT": function() {
      return "[ACGHILNPRSTV]";
    },
    "VVC": function() {
      return "[ADGHNPRST]";
    },
    "NTT": function() {
      return "[FILV]";
    },
    "RST": function() {
      return "[AGST]";
    },
    "TDK": function() {
      return "[CFLWY]";
    },
    "TTN": function() {
      return "[FL]";
    },
    "DSC": function() {
      return "[ACGST]";
    },
    "DST": function() {
      return "[ACGST]";
    },
    "DSY": function() {
      return "[ACGST]";
    }
  };
    
  var outputstring="";
  var i;
  var condi;
  for ( i=starti-1; i<endi; i+=3) {
      codoni=inputstring[i]+inputstring[i+1]+inputstring[i+2];
      // add error if not found!
      outputstring+=codonTable[codoni.toUpperCase()]();
  }
  
  return outputstring;
}

/**
  *Function to compare two sequences and return their differences
  *
  *@param {string} inputstring1 Input one letter sequence 1
  *@param {string} inputstring2 Input one letter sequence 2
  *@return sequence differences
  *@customfunction
*/
function SeqDiff(inputstring1,inputstring2) {
  //check protein
  if (!(/^[acdefghiklmnpqrstvwyx]+$/i.test(inputstring1))) {
    throw new Error("Seq1 not a single letter protein/dna format");
  }
  if (!(/^[acdefghiklmnpqrstvwyx]+$/i.test(inputstring2))) {
    throw new Error("Seq2 not a single letter protein/dna format");
  }

  var len_inputstring1 = inputstring1.length;
  var len_inputstring2 = inputstring2.length;
  if (len_inputstring1!=len_inputstring2) {
    throw new Error("Two sequences are not the same lengths");
  }
  
  var outputstring=[];
  var i;
  for ( i=0; i<len_inputstring1; i++) {
    if (inputstring1[i]!=inputstring2[i]) {
      outputstring.push(inputstring1[i]+(i+1).toString()+inputstring2[i])
    }
  }
  return outputstring.join(","); 
}


/**
  *Function to mutate protein given AA to AA at specified location
  *
  *@param {string} inputstring1 Input one letter sequence 1
  *@param {string} inputstring2 Comma separated mutation list in format of A#X
  *@return sequence differences
  *@customfunction
*/
function Mutation2Seq(inputstring1,inputstring2) {
  //check protein
  if (!(/^[acdefghiklmnpqrstvwyx]+$/i.test(inputstring1))) {
    throw new Error("Seq1 not a single letter protein/dna format");
  }
//  if (!(/^[acdefghiklmnpqrstvwyx]+$/i.test(inputstring2))) {
//    throw new Error("Seq2 not a single letter protein/dna format");
//  }

  var len_inputstring1 = inputstring1.length;
  var mutationArray = new Array();
  var outputstring=inputstring1.split('');
  
  //go through the mutation list
  mutationArray = inputstring2.split(',');
  if ( inputstring2.length>0 ) {
  for ( var i=0; i<mutationArray.length;i++ ) {
    //WT-seq;
    var seqi=mutationArray[i].substring(0, 1);
    //not right here
    var posi=Number(mutationArray[i].substring(1, mutationArray[i].length-1 ));
    var muti=mutationArray[i].substring(mutationArray[i].length-1, mutationArray[i].length);
    if (muti.length!=1) {
    throw new Error(muti+" is not a valid codon");
    }
    if ( inputstring1[posi-1]!=seqi ) {
      throw new Error(inputstring1+" does not have "+seqi+" @position "+posi.toString());
    }
    outputstring[posi-1]=muti;
  }
  return outputstring.join("");
  } else {
   return inputstring1; 
  }
}

/**
  *Function to mutate DNA given AA to a codon at specified location
  *
  *@param {string} inputstring1 Input one letter sequence 1
  *@param {string} inputstring2 Comma separated mutation list in format of A#ATG
  *@return sequence differences
  *@customfunction
*/
function Mutation2Codon(inputstring1,inputstring2) {
  //check protein
  if (!(/^[atcg]+$/i.test(inputstring1))) {
    throw new Error("Seq1 not a single letter dna format");
  }
//  if (!(/^[acdefghiklmnpqrstvwyx]+$/i.test(inputstring2))) {
//    throw new Error("Seq2 not a single letter protein/dna format");
//  }

  var len_inputstring1 = inputstring1.length;
  var mutationArray = new Array();
  var outputstring=inputstring1.split('');
  
  //go through the mutation list
  mutationArray = inputstring2.split(',');
  if ( inputstring2.length>0 ) {
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
    throw new Error(inputstring1+" does not have "+seqi+" @position "+posi.toString() + ":" + translate(inputcodon));
    }
   //make the change if it pass the filter
    outputstring[3*posi-3]=muti[0];
    outputstring[3*posi-2]=muti[1];
    outputstring[3*posi-1]=muti[2];
  }
  return outputstring.join("");
  } else {
   return inputstring1; 
  }

}


//https://github.com/alexarnimueller/modlAMP
//https://github.com/alexarnimueller/modlAMP/blob/master/modlamp/analysis.py

//calc_H


//calc_charge


