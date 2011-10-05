classpath "."

uses java.util.*
uses java.io.*
uses java.lang.*

uses gw.util.*
uses gw.util.process.ProcessRunner
uses gw.util.concurrent.LazyVar
uses org.apache.maven.artifact.ant.AttachedArtifact
uses org.apache.maven.artifact.ant.Authentication
uses org.apache.maven.artifact.ant.RemoteRepository

uses www.*

DefaultTarget = "build-website"

var _current = "downloads/gosu-0.8.6.1-C/gosu-0.8.6.1-C"

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
 * Generates an HTML spec for the website
 */
function genSpec() {
 /*
  var book = build.docbook.Book.parse( file(GOSU_SPEC) )
  var htmlConverter = new SpecHTMLConverter(){ :Book = book }
  log( htmlConverter.genHTML() )
  htmlConverter.writeToFile( file("www/spec.shtml") );
*/
}

/* 
 * Prepares the website for a deployment
 */
@Depends( "init" )
function buildWebsite() {

  log( "Copying website..." )
  Ant.copy( :filesetList={file( "." ).fileset( :includes="www/**", :excludes="**/*.gst" )}, :todir=buildDir )

  log( "Create Examples zips..." )

  log( "Generating dynamic web pages..." )
  buildIndexPage()
  buildDownloadsPage()

  log( "Copying releases to downloads" )
  if (binariesRepository.get() != null) {
    var releasesDir = binariesRepository.get().file("releases")
    Ant.copy( :filesetList={releasesDir.fileset()}, :todir=buildDir.getChild( "www/downloads" ) )
  }

  log( "Copying gosu-mode.el" )
  Ant.copy( :filesetList={file("emacs").fileset( :includes="gosu-mode.el" ) }, :todir=buildDir.getChild( "www/downloads" ) )
  
  log( "Done building website." )
}

private function buildIndexPage() {
  buildDir.getChild( "www/index.shtml" ).write( Index.renderToString( _current ) )
}

private function buildDownloadsPage() {
  buildDir.getChild( "www/downloads.shtml" ).write( Downloads.renderToString( _current ) )
}

/* 
 * Deploys the entire internal website
 */
function deployInternal() {
  log( "Deploying" )
  Ant.scp( :filesetList = {buildDir.file( "www" ).fileset()}, 
           :todir="root@opensource-internal:/var/www/html/gosu",
           :password=Shell.readMaskedLine( "Password:" ),
           :trust=true,
           :verbose=true )
}

/* 
 * Deploys the entire external website
 */
function deployExternal() {
  log( "Deploying" )
  Ant.scp( :filesetList = {buildDir.file( "www" ).fileset()}, 
           :todir="root@gosu-lang.org:/var/www/html",
           :password=Shell.readMaskedLine( "Password:" ),
           :trust=true,
           :verbose=true )
}
