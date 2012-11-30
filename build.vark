classpath "."
classpath "org.gosu-lang.gosu:gosu-process:0.10"

uses java.util.*
uses java.io.*
uses java.lang.*

uses gw.util.*
uses gw.util.process.ProcessRunner
uses gw.util.concurrent.LocklessLazyVar

uses www.*

DefaultTarget = "build-website"

var buildDir = file( "build" )

/* 
 * Initializes the Gosu project
 */
function init() {
  Ant.mkdir( :dir = buildDir )
}

/* 
 * Cleans the project
 */
function clean() {
  Ant.delete( :dir = buildDir )
}

/* 
 * Prepares the website for a deployment
 */
@Depends( "init" )
function buildWebsite() {

  log( "Copying website..." )
  Ant.copy( :filesetList={file( "." ).fileset( :includes="www/**" )}, :todir=buildDir )

  log( "Copying gosu-mode.el" )
  Ant.copy( :filesetList={file("emacs").fileset( :includes="gosu-mode.el" ) }, :todir=buildDir.getChild( "www/downloads" ) )
  
  log( "Done building website." )
}
