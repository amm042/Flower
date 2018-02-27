# Dependencies
In order to use some of the scripts in this project, dependencies must be satisfied.

Dependencies for the backend scripts can be found in the backend directory's README

# Getting Started (Local Development)
Navigate to the WebServer directory with your terminal. Both of these options
assume `index.html` is located in WebServer. This is the page that is served
when navigating to the root of the website (i.e. `localhost:8000` for php-server).

## Command-line Option
Use `brew install php` on Mac or `apt install php` and choose the appropriate php version to install.  You will also need to make sure that you install the mysqli plugin.  Make sure that you installed php by running `php --version` and this should output some version number.  Navigate to your `WebServer` directory and run `php -S localhost:8000`.  If this runs without error, then you can try pulling up the page `localhost:8000` on your browser.  If all goes well, then you are set.

## Atom Package Option (Continuous Change Integration Support)
__Note:__ You can use `CTRL+SHIFT+P` to bring up a search you can use to quickly
execute commands available in Atom, including those added through packages.

Open Atom. Navigate to `Packages->Settings View->Install Packages/Themes`.
Search for `php-server` and install the package of the same name.
Open the `index.html` file in Atom and then use `Packages->PHP Server->Start in folder of current file` to
start the server on port __8000__. Your browser will automatically open the root
of the live server, defaulting to `index.html` if present.


## API Keys and Deployment Specific Values
API Keys should not be committed to the repo so  we've made a way for each developer to use their own.
1. Create a file called `config.json` in the repo's root directory.
2. Add this code:
```
{
  "DB_URL" : "",
  "DB_USERNAME" : "",
  "DB_PASSWORD" : "",
  "DB_NAME": ""
}
```
3. Fill out all values of the empty strings with information for your DB/API key info
4. Create a file called `deployment.json` in the repo's root directory.  There are all things unique to your deployment.
5. Add this code:
```
{
 "APPROVAL_LINK": "",
  "FLASK_SERVER": "",
  "GOOGLE_CLIENT_ID": "",
  "REDIRECT_URL": "" 
}
```
6. Fill out all values of the empty string with the information for your deployment
7. Access the values where needed:
    * Python:
       ```
       import json
       with open('path/to/config.json', 'r') as f:
           config = json.load(f)

       config['KEY_NAME']
       ```
    * PHP:
      ```
      $config = json_decode(file_get_contents("path/to/config.json"));
      printf("%s", $config->KEY_NAME);
      ```
    * JS:
      !!!This should only be used with the deployment.json so that DB credentials or other important information isn't leaked on the client side with `config.json`
      ```
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
      <script type="text/javascript" src="../common/load-deployment.js" ></script>
      ...
      deploy_config["KEY_NAME"]
      ```
`KEY_NAME` is the key string in your config file such as `DB_NAME` or `FLASK_SERVER`.

This `config.json` and `deployment.json` won't get committed because it is in the `.gitignore` so you will need to do this for each clone of the repo, but it should persist unless you delete the file.

## PHP with Bucknell Apache Hosting
### Introduction
Bucknell linux accounts have a public-facing `~\public_html` which can be accessed
by navigating to `https://eg.bucknell.edu/~username` where `username` is the
user's username. Accessing a PHP file by navigating to it relative to this URL
will run the script on the server which will return the output of the PHP script
to the browser. (e.g. `public_html/index.html` can be found at
  `eg.bucknell.edu/~username/index.html`)
### Setup
By default, files are not readable by just anybody, so they won't be served
until you add the read permission to the 'Other' group for any files you want to
serve. Clone the repo into your `~\public_html` directory and use
`chmod o=r ./WebServer/*` __or__ cd into `WebServer` and run `./WebServer/setup.sh`
to make all the files in the `WebServer` directory accessible over http.

##Linters

### Python - autopep8
To install autopep8 run
```
pip install autopep8
```
Install the `python-autopep8` package in Atom with either `apm install python-autopep8` or through the built in Atom package manager.

Then to run the linter in Atom, highlight all of the text you want to format and then press `Ctrl-shift-p` and type in `autopep8` and then press `Enter` to format the Python code.

You can also run it from the command line with `autopep8 [--in-place] [other-options] filename`.
