#ImageLines App, for A. Zahner Co.

language: Javascript/React 

for embedding in Wordpress Site
see Product OneNote for development notes

# Build instructions:

Normal build and with npm start should work fine

For inline file creation

comment out public/index.html at line below (around line 27 sc script)
	<script src="https://viewer.shapediver.com/v2/2.20.2/sdv.concat.min.js"></script>
	
Execute command: 
	npm run build 
	npx gulp

this will produce a new build folder in your directory. inside that build folder is a new index.html. open this file in a text editor and add back in the commented sd script. 


this file is ready to be added to the wordPress page. 


