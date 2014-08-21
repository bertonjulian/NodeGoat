NodeGoat
==========

Being lightweight, fast, and scalable, Node.js is becoming a widely adopted platform for developing web applications. This project provides an environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js and how to effectively address them.

How to Install and Run NodeGoat
=================================

### Requirements

1.  Install [Node.js](http://nodejs.org/) - NodeGoat requires **Node v0.10.***
2.  Git command line tools - follow the setup instructions [on GitHub](https://help.github.com/articles/set-up-git) or download [here](http://git-scm.com/downloads)
3. Install MongoDB

### Getting a Copy of the Code

Open a command prompt / terminal window and run the command below from the parent directory inside which you would like the NodeGoat code copied.

```
git clone https://github.com/bertonjulian/NodeGoat.git
```
### Running Your Copy of the Code

0. Install node modules

  ```sh
  cd NodeGoat
  npm install
  ```

0. Create and populate local DB 

  0. Run `grunt populate` to populate the database with dummy data  

0. Start server

  ```sh
  grunt run
  ```

  This starts the NodeGoat application at url [http://localhost:4000/](http://localhost:4000/)


Contributing
=================================

Contributions from community are key to make NodeGoat a high quality comprehensive resource. Lets make NodeGoat awesome together!


**New to git?** You may find these resources helpful:
* [GitHub's git tutorial](http://try.github.io/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [git tutorials and workflows](https://www.atlassian.com/git/tutorial)

### Ways to Contribute

Contact me at julian [dot] berton [at] owasp [dot] org

License
==========
Code licensed under the [Apache License v2.0.](http://www.apache.org/licenses/LICENSE-2.0)
