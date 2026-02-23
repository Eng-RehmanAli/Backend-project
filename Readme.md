All the basic concept about the backend 
//<-------------------------------------- steps  to learining----------------------------------> 
 make the public folder to  take the images in our serever to prevent from loss if any thing happen   but it will be temporay
 now if we  make the temp  file in the folder  git will ignore it so  use  the .gitignore 
 Gemini said
Technically speaking, .gitkeep isn't a "real" feature of Git—it’s a clever workaround created by the developer community.

By design, Git does not track empty directories. It only tracks files. If you create a folder structure for your project but don't put any files in the subfolders, Git will simply ignore those folders when you try to commit them.

Here is why we use .gitkeep to solve that.

// git ignore generator 
it will give you all the files which would not go in the github mean senetive files

.env
it is the main file for the  production because it tells to the production that what  envoriment is being used like port and other  things 

//  npm i nodemon
it is a tool which used 
when we make a file and save it then it will  automatically restart to the server  simply

but here we need only in the development to  in this case  instll (npm i --save-dev nodemon)

now go in the scripts object in the packagejson 
and at the place of the test or on the next side  "dev":"nodemon index.js" 

We create a src/ (Source) folder to separate the code you write from the code the computer needs.