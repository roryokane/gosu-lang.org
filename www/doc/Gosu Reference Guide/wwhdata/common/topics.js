/*
 *   Title: TopicUtils-JavaScript.js
 *   
 *  JavaScript related to the TopicUtils code. This file gets COPIED into the output webworks files to support
 *  the link to this page code.
 */

 
// extracts the src=myfilename from the URL
function Guidewire_ExtractSrcFromURL() {
	var VarDocumentURL = window.WWHFrame.location;
	var TheParametersArray = VarDocumentURL.hash.split("&");
	var thisParam;
	var FMSourceFile = "UNKNOWN_FRAMEMAKER_SOURCE_FILE";

	k = TheParametersArray.length;
	for (i= 0 ; i < k; i++) {
	   thisParam = unescape(TheParametersArray[i]);
	   if (thisParam.search(/^src=/) != -1) {
		  FMSourceFile = thisParam.substring(4); // strip off the "src=" at the beginning
		}
	 }
	return FMSourceFile;
}

// takes a file name of format "myfilename.4.3" and gets the beginning part and returns "myfilename" only
function Guidewire_FMSourceFileExtract(FullFileName)
{
  var VarSplitURL= FullFileName.split(".");
  return VarSplitURL[0];
}

// is the src=myfile arg from the URL (which means it was from myfile.fm) match the desired file
// generally speaking we do not care since we just want it unique per book
// so we just say yes, but we say false if it's a special file that allows duplicates in one book
function Guidewire_FMSourceFileMatch(FROM_URL,LOCAL_FILENAME) {
	var varFileURL = FROM_URL.toLowerCase();
	var varFileActual = LOCAL_FILENAME.toLowerCase();

	// SPECIAL CASE FOR UPGRADE GUIDE PROCEDURES -- BASICALLY 
	if (varFileURL.search(/^procedure-/) != -1) {
	  if  (varFileActual.search(/^procedure-/) != -1)  { 
		  return (varFileURL == Guidewire_FMSourceFileExtract(varFileActual)); 
		} else { 
		 return false; 
	   }
	 }
	else {
	   // basically, the default is to say they match... 
	   // if it's one of these specially-handled files, just let it work  
	   return true; 
	}
}


// IMPORTANT: IF YOU CHANGE THE LOGIC OF THIS CODE, ALSO CHANGE THE MIRROR FUNCTION IN CONTROLS.JS
// THE CONTROLS.JS FUNCTION ENCODES THE URL, AND THIS FUNCTION DECODES IT
function Guidewire_SafeTopicName(theTitle) {
theTitle = theTitle.replace(/ /g, "_");  // converts space char
theTitle = theTitle.replace(/\u00a0/g, "_");  // converts nbsp char
// censor (remove) characters that mess up epublisher in URLs: forward slash, backslash, question mark, &amp;
theTitle= theTitle.replace(/[\\\/\?]/g, "");
theTitle = theTitle.replace(/&/g, "");
theTitle = theTitle.replace(/\u201c/g, "'"); // single quote smart
theTitle = theTitle.replace(/\u201d/g, "'");// single quote smart
theTitle = theTitle.replace(/\u2018/g, "'");// dub quote smart
theTitle = theTitle.replace(/\u2019/g, "'");// dub quote smart
theTitle = theTitle.replace(/\u2022/g, "");// trademark
theTitle = theTitle.replace(/&/g, "");
return (theTitle);  }


function Guidewire_TopicMatch(FROMEPUB,WHATTOMATCH) {
var varLower1 = FROMEPUB.toLowerCase();
var varLower2 = WHATTOMATCH.toLowerCase();
  // match positively if they naturally match, or they match the safe version (convert spaces to underscores...)
 if (varLower1 == varLower2 || varLower1 == Guidewire_SafeTopicName(varLower2))
{ return true; } else { return false; } 
}

function GUIDEWIRE_TOPIC_TO_FILE(TOPIC, SRCFILE) { 
if (Guidewire_TopicMatch(TOPIC,"cover")) return "index.html"

else if (Guidewire_TopicMatch(TOPIC,"Gosu Reference Guide") && Guidewire_FMSourceFileMatch(SRCFILE,"cover-gscript.html") ) { return "cover-gscript.html";}
else if (Guidewire_TopicMatch(TOPIC,"About This Document") && Guidewire_FMSourceFileMatch(SRCFILE,"about.html") ) { return "about.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Introduction") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.01.html") ) { return "intro.03.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Welcome to Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.02.html") ) { return "intro.03.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Running Gosu Programs and Calling Other Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.03.html") ) { return "intro.03.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"More About the Gosu Type System") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.04.html") ) { return "intro.03.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Compile Time Error Prevention") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.05.html") ) { return "intro.03.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Type Inference") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.06.html") ) { return "intro.03.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Intelligent Code Completion and Other Gosu Editor Tools") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.07.html") ) { return "intro.03.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Null Safety for Properties Other Operators") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.08.html") ) { return "intro.03.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generics in Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.09.html") ) { return "intro.03.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Primitives Types") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.10.html") ) { return "intro.03.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Type Loaders") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.11.html") ) { return "intro.03.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Case Sensitivity") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.12.html") ) { return "intro.03.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Statement Terminators") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.13.html") ) { return "intro.03.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Comments") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.14.html") ) { return "intro.03.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Reserved Words") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.15.html") ) { return "intro.03.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Notable Differences Between Gosu and Java") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.16.html") ) { return "intro.03.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Get Ready for Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"intro.03.17.html") ) { return "intro.03.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting Started with Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.1.html") ) { return "getting-started-gosu-opensource.04.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Installing the Eclipse Gosu Editor Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.2.html") ) { return "getting-started-gosu-opensource.04.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting Started with Gosu in Eclipse") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.3.html") ) { return "getting-started-gosu-opensource.04.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"The IntelliJ IDEA Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.4.html") ) { return "getting-started-gosu-opensource.04.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Installing Gosu as Command Line Tool") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.5.html") ) { return "getting-started-gosu-opensource.04.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Servlet Example") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.6.html") ) { return "getting-started-gosu-opensource.04.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Hibernate Example") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.7.html") ) { return "getting-started-gosu-opensource.04.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Dynamic Type Example") && Guidewire_FMSourceFileMatch(SRCFILE,"getting-started-gosu-opensource.04.8.html") ) { return "getting-started-gosu-opensource.04.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Programs and Command Line Tools") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.1.html") ) { return "gscript-shell.05.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Command Line Tool Basics") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.2.html") ) { return "gscript-shell.05.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Structure of a Gosu Program") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.3.html") ) { return "gscript-shell.05.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Command Line Arguments") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.4.html") ) { return "gscript-shell.05.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Advanced Class Loading Registry") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.5.html") ) { return "gscript-shell.05.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Self-Contained Gosu Editor") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.6.html") ) { return "gscript-shell.05.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Interactive Shell") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.7.html") ) { return "gscript-shell.05.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Helpful APIs for Command Line Gosu Programs") && Guidewire_FMSourceFileMatch(SRCFILE,"gscript-shell.05.8.html") ) { return "gscript-shell.05.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Types") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.01.html") ) { return "datatypes.06.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Built-in Types") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.02.html") ) { return "datatypes.06.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Array") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.03.html") ) { return "datatypes.06.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Boolean") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.04.html") ) { return "datatypes.06.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"DateTime") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.05.html") ) { return "datatypes.06.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Number") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.06.html") ) { return "datatypes.06.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Object") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.07.html") ) { return "datatypes.06.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"String") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.08.html") ) { return "datatypes.06.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Type") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.09.html") ) { return "datatypes.06.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Primitive Types") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.10.html") ) { return "datatypes.06.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Access to Java Types") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.11.html") ) { return "datatypes.06.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Arrays") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.12.html") ) { return "datatypes.06.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Object Instantiation and Properties") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.13.html") ) { return "datatypes.06.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Numeric, Binary, and Hex Literals") && Guidewire_FMSourceFileMatch(SRCFILE,"datatypes.06.14.html") ) { return "datatypes.06.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Operators and Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.01.html") ) { return "expressions.07.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Operators") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.02.html") ) { return "expressions.07.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Operator Precedence") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.03.html") ) { return "expressions.07.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Standard Gosu Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.04.html") ) { return "expressions.07.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Arithmetic Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.05.html") ) { return "expressions.07.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Equality Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.06.html") ) { return "expressions.07.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Evaluation Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.07.html") ) { return "expressions.07.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Existence Testing Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.08.html") ) { return "expressions.07.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Logical Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.09.html") ) { return "expressions.07.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"New Object Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.10.html") ) { return "expressions.07.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Relational Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.11.html") ) { return "expressions.07.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Unary Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.12.html") ) { return "expressions.07.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Importing Types and Package Namespaces") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.13.html") ) { return "expressions.07.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Conditional Ternary Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.14.html") ) { return "expressions.07.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Special Gosu Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.15.html") ) { return "expressions.07.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Function Calls") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.16.html") ) { return "expressions.07.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Static Method Calls") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.17.html") ) { return "expressions.07.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Static Property Paths") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.18.html") ) { return "expressions.07.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Handling Null Values In Expressions") && Guidewire_FMSourceFileMatch(SRCFILE,"expressions.07.19.html") ) { return "expressions.07.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Statements") && Guidewire_FMSourceFileMatch(SRCFILE,"statements.08.1.html") ) { return "statements.08.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Statements") && Guidewire_FMSourceFileMatch(SRCFILE,"statements.08.2.html") ) { return "statements.08.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Variables") && Guidewire_FMSourceFileMatch(SRCFILE,"statements.08.3.html") ) { return "statements.08.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Conditional Execution and Looping") && Guidewire_FMSourceFileMatch(SRCFILE,"statements.08.4.html") ) { return "statements.08.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Functions") && Guidewire_FMSourceFileMatch(SRCFILE,"statements.08.5.html") ) { return "statements.08.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Intervals") && Guidewire_FMSourceFileMatch(SRCFILE,"intervals.09.1.html") ) { return "intervals.09.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"What are Intervals") && Guidewire_FMSourceFileMatch(SRCFILE,"intervals.09.2.html") ) { return "intervals.09.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing Your Own Interval Type") && Guidewire_FMSourceFileMatch(SRCFILE,"intervals.09.3.html") ) { return "intervals.09.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Exception Handling") && Guidewire_FMSourceFileMatch(SRCFILE,"exceptionhandling.10.1.html") ) { return "exceptionhandling.10.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Try-Catch-Finally Constructions") && Guidewire_FMSourceFileMatch(SRCFILE,"exceptionhandling.10.2.html") ) { return "exceptionhandling.10.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Throw Statements") && Guidewire_FMSourceFileMatch(SRCFILE,"exceptionhandling.10.3.html") ) { return "exceptionhandling.10.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Checked Exceptions in Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"exceptionhandling.10.4.html") ) { return "exceptionhandling.10.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Object Lifecycle Management (\u2018using\u2019 Clauses)") && Guidewire_FMSourceFileMatch(SRCFILE,"exceptionhandling.10.5.html") ) { return "exceptionhandling.10.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.1.html") ) { return "classes.11.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"What Are Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.2.html") ) { return "classes.11.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating and Instantiating Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.3.html") ) { return "classes.11.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Properties") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.4.html") ) { return "classes.11.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Modifiers") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.5.html") ) { return "classes.11.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Inner Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"classes.11.6.html") ) { return "classes.11.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Enumerations") && Guidewire_FMSourceFileMatch(SRCFILE,"enumerations.12.1.html") ) { return "enumerations.12.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Enumerations") && Guidewire_FMSourceFileMatch(SRCFILE,"enumerations.12.2.html") ) { return "enumerations.12.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Interfaces") && Guidewire_FMSourceFileMatch(SRCFILE,"interfaces.13.1.html") ) { return "interfaces.13.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"What is an Interface") && Guidewire_FMSourceFileMatch(SRCFILE,"interfaces.13.2.html") ) { return "interfaces.13.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Defining and Using an Interface") && Guidewire_FMSourceFileMatch(SRCFILE,"interfaces.13.3.html") ) { return "interfaces.13.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Composition") && Guidewire_FMSourceFileMatch(SRCFILE,"composition.14.1.html") ) { return "composition.14.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Gosu Composition") && Guidewire_FMSourceFileMatch(SRCFILE,"composition.14.2.html") ) { return "composition.14.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Annotations and Interceptors") && Guidewire_FMSourceFileMatch(SRCFILE,"annotations.15.1.html") ) { return "annotations.15.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Annotating a Class, Method, Type, or Constructor") && Guidewire_FMSourceFileMatch(SRCFILE,"annotations.15.2.html") ) { return "annotations.15.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Annotations at Run Time") && Guidewire_FMSourceFileMatch(SRCFILE,"annotations.15.3.html") ) { return "annotations.15.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Defining Your Own Annotations") && Guidewire_FMSourceFileMatch(SRCFILE,"annotations.15.4.html") ) { return "annotations.15.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Interceptors") && Guidewire_FMSourceFileMatch(SRCFILE,"annotations.15.5.html") ) { return "annotations.15.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Enhancements") && Guidewire_FMSourceFileMatch(SRCFILE,"enhancements.16.1.html") ) { return "enhancements.16.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Enhancements") && Guidewire_FMSourceFileMatch(SRCFILE,"enhancements.16.2.html") ) { return "enhancements.16.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Blocks") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.1.html") ) { return "blocks.17.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"What Are Blocks") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.2.html") ) { return "blocks.17.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Basic Block Definition and Invocation") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.3.html") ) { return "blocks.17.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Variable Scope and Capturing Variables In Blocks") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.4.html") ) { return "blocks.17.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Argument Type Inference Shortcut In Certain Cases") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.5.html") ) { return "blocks.17.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Block Type Literals") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.6.html") ) { return "blocks.17.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Blocks and Collections") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.7.html") ) { return "blocks.17.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Blocks as Shortcuts for Anonymous Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"blocks.17.8.html") ) { return "blocks.17.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Generics") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.1.html") ) { return "generics.18.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Generics Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.2.html") ) { return "generics.18.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Gosu Generics") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.3.html") ) { return "generics.18.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Other Unbounded Generics Wildcards") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.4.html") ) { return "generics.18.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generics and Blocks") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.5.html") ) { return "generics.18.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"How Generics Help Define Collection APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.6.html") ) { return "generics.18.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Multiple Dimensionality Generics") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.7.html") ) { return "generics.18.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generics With Custom \u2018Containers\u2019") && Guidewire_FMSourceFileMatch(SRCFILE,"generics.18.8.html") ) { return "generics.18.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Collections") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.1.html") ) { return "collections.19.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Basic Lists") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.2.html") ) { return "collections.19.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Basic HashMaps") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.3.html") ) { return "collections.19.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"List and Array Expansion (*.)") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.4.html") ) { return "collections.19.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Enhancement Reference for Collections and Related Types") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.5.html") ) { return "collections.19.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Collections Enhancement Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"collections.19.6.html") ) { return "collections.19.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu and XML") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.01.html") ) { return "xml.20.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Manipulating XML Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.02.html") ) { return "xml.20.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Introduction to XmlElement") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.03.html") ) { return "xml.20.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Dollar Sign Prefix For Some Properties When Using XSD Types") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.04.html") ) { return "xml.20.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Exporting XML Data") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.05.html") ) { return "xml.20.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Parsing XML Data into an XML Element") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.06.html") ) { return "xml.20.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating Many QNames in the Same Namespace") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.07.html") ) { return "xml.20.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"XSD-based Properties and Types") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.08.html") ) { return "xml.20.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting Data From an XML Element") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.09.html") ) { return "xml.20.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Manipulating Elements and Values (Works With or Without XSD)") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.10.html") ) { return "xml.20.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Simple Values") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.11.html") ) { return "xml.20.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Access the Nillness of an Element") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.12.html") ) { return "xml.20.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Automatic Creation of Intermediary Elements") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.13.html") ) { return "xml.20.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"DefaultFixed Attribute Values") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.14.html") ) { return "xml.20.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Substitution Group Hierarchies") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.15.html") ) { return "xml.20.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Element Sorting for XSD-based Elements") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.16.html") ) { return "xml.20.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Built-in Schemas") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.17.html") ) { return "xml.20.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Schema Access Type") && Guidewire_FMSourceFileMatch(SRCFILE,"xml.20.18.html") ) { return "xml.20.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Calling Web Services from Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.1.html") ) { return "webservice-consuming.21.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Learning Gosu XML APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.2.html") ) { return "webservice-consuming.21.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding WS-I Configuration Options") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.3.html") ) { return "webservice-consuming.21.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"One-Way Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.4.html") ) { return "webservice-consuming.21.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Asynchronous Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.5.html") ) { return "webservice-consuming.21.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"MTOM Attachments") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-consuming.21.6.html") ) { return "webservice-consuming.21.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Java and Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"java-gosu.22.1.html") ) { return "java-gosu.22.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Calling Java from Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"java-gosu.22.2.html") ) { return "java-gosu.22.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Deploying Your Java Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"java-gosu.22.3.html") ) { return "java-gosu.22.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Java Class Loading, Delegation, and Package Naming") && Guidewire_FMSourceFileMatch(SRCFILE,"java-gosu.22.4.html") ) { return "java-gosu.22.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Templates") && Guidewire_FMSourceFileMatch(SRCFILE,"templates.23.1.html") ) { return "templates.23.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Template Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"templates.23.2.html") ) { return "templates.23.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"When to Escape Special Characters for Templates") && Guidewire_FMSourceFileMatch(SRCFILE,"templates.23.3.html") ) { return "templates.23.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Template Files") && Guidewire_FMSourceFileMatch(SRCFILE,"templates.23.4.html") ) { return "templates.23.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Type System") && Guidewire_FMSourceFileMatch(SRCFILE,"typesystem.24.1.html") ) { return "typesystem.24.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Basic Type Checking") && Guidewire_FMSourceFileMatch(SRCFILE,"typesystem.24.2.html") ) { return "typesystem.24.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Using Reflection") && Guidewire_FMSourceFileMatch(SRCFILE,"typesystem.24.3.html") ) { return "typesystem.24.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Compound Types") && Guidewire_FMSourceFileMatch(SRCFILE,"typesystem.24.4.html") ) { return "typesystem.24.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Type Loaders") && Guidewire_FMSourceFileMatch(SRCFILE,"typesystem.24.5.html") ) { return "typesystem.24.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Running Local Shell Commands") && Guidewire_FMSourceFileMatch(SRCFILE,"gw-util-shell.html") ) { return "gw-util-shell.html";}
else if (Guidewire_TopicMatch(TOPIC,"Checksums") && Guidewire_FMSourceFileMatch(SRCFILE,"checksums.26.1.html") ) { return "checksums.26.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Checksums") && Guidewire_FMSourceFileMatch(SRCFILE,"checksums.26.2.html") ) { return "checksums.26.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Properties Files") && Guidewire_FMSourceFileMatch(SRCFILE,"propertiesfiles.html") ) { return "propertiesfiles.html";}
else if (Guidewire_TopicMatch(TOPIC,"Coding Style") && Guidewire_FMSourceFileMatch(SRCFILE,"style.28.1.html") ) { return "style.28.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"General Coding Guidelines") && Guidewire_FMSourceFileMatch(SRCFILE,"style.28.2.html") ) { return "style.28.2.html";}
else { return("../wwhelp/topic_cannot_be_found.html"); } }

function  WWHBookData_MatchTopic(P)
{
var C=null;P=decodeURIComponent(decodeURIComponent(escape(P)));//workaround epub bug with UTF8 processing!
if(P=="The_Gosu_Language")C="intro.03.02.html#1466155";
if(P=="Gosu_Case_Sensitivity")C="intro.03.12.html#1410297";
if(P=="Gosu_Code_Comments")C="intro.03.14.html#1437092";
if(P=="Gosu_Shell")C="gscript-shell.05.1.html#2186180";
if(P=="Gosu_Interactive_Shell")C="gscript-shell.05.7.html#2190274";
if(P=="Collections_in_Gosu")C="collections.19.1.html#1448766";
if(P=="GScript_and_XML_")C="xml.20.01.html#1470967";
if(P=="Java_and_Gosu")C="java-gosu.22.1.html#2005457";
if(P=="Calling_Java_from_Gosu")C="java-gosu.22.1.html#2005457";
if(P=="Gosu-to-Java_Class_Deployment")C="java-gosu.22.3.html#2001895";
if(P=="Type_System_and_Reflection")C="typesystem.24.1.html#1444075";
if(P=="Running_Command_Line_Tools_from_Gosu")C="gw-util-shell.html#2186018";
if (C) { return C } else { return GUIDEWIRE_TOPIC_TO_FILE(P,Guidewire_ExtractSrcFromURL());}
}
