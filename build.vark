classpath "."

uses java.util.*
uses java.io.*
uses java.lang.*

uses gw.util.*
uses gw.util.process.ProcessRunner
uses gw.util.concurrent.LazyVar

uses www.*

DefaultTarget = "build-website"

var binariesRepository = LazyVar.make(\ -> {
  // TODO - use a target arg or system property rather than hard coding
  var repoDir = file("/depot/opensource/gosu")
  if (!repoDir.exists()) {
    logWarn("Warning: ${repoDir} does not exist - you should not deploy the website from this machine")
    repoDir = null
  }
  return repoDir
})
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

  log( "Copying releases to downloads" )
  if (binariesRepository.get() != null) {
    var releasesDir = binariesRepository.get().file("releases")
    Ant.copy( :filesetList={releasesDir.fileset(:excludes = "**/gosu-idea*")}, :todir=buildDir.getChild( "www/downloads" ) )
  }

  log( "Copying gosu-mode.el" )
  Ant.copy( :filesetList={file("emacs").fileset( :includes="gosu-mode.el" ) }, :todir=buildDir.getChild( "www/downloads" ) )
  
  log( "Done building website." )
}
