$(document).ready(function(){
    /** creating a delay function that is only needed for github.js as this is the only dynamic part of our website! */
    const delay = ms => new Promise(res => setTimeout(res, ms));

    /** creating a loading screen when the webpage has started. */
    let message = document.createElement('p');
        message.id = "loadingMessage";
        message.innerText = "Loading Content, please wait!...";
    let loadingScreen = new LoadingScreen();

    /** creating the container that will be inside of the loading screen. */
    let loadingScreenContainer = document.createElement('div');
        loadingScreenContainer.classList.add('container');
        loadingScreenContainer.appendChild(message);
        loadingScreen.show();
    
    /** appending the container to the loadingScreen HTML node. */
    loadingScreen.appendNode(loadingScreenContainer);

    /** appending the loadingScreen to the document body. */
    document.body.append(loadingScreen.getNode());


    /** checking if the container with id 'projects' is on the page  */
    const projectsList = document.getElementById('projects');

    /** creating a function which will create the basic project node which contains name,description and language. */
    let createProjectNode = function(project) {
        const node = document.createElement('div');
        node.classList.add('project', 'col');

        const name = document.createElement('a');
              name.href = project.getUrl()  
              name.innerText = project.getName();  
        
        const description = document.createElement('p');
              description.innerText = project.getDescription();

        const language = document.createElement('span');
              language.innerText = project.getLanguage();
        
        node.append(name, description, language);
        
        return node;
    }

    /** a simple helper function which is used to create a new div element and add the row class to it. */
    let createRow = function() {
        let node = document.createElement('div');
            node.classList.add('row');
        return node;
    }

    /** if the container exists */
    if(projectsList) {

        /** creating Project class which will contain the node  */
        let Project = (function(){
            let node = null;

            class Project {
                constructor(data) {
                    /** getting their values and assigning defaults if for some reason they don't have such data. */
                    this.name = data['name'] || '';
                    this.description = data['description'] || '';
                    this.language = data['language'] || '';
                    this.url = data['html_url'] || '';
                    this.forked = data['fork'] || false;

                    node = createProjectNode(this); 
                }
                getName() {
                    return this.name;
                }
                getDescription() {
                    return this.description;
                }
                getLanguage() {
                    return this.language;
                }
                getUrl() {
                    return this.url;
                }
                getHomePage() {
                    return this.homepage;
                }
                getNode() {
                    return node;
                }
                isForked() {
                    return this.forked;
                }
            }
            return Project;
        })();
    
        /** calling the github unauth restful api and getting the public projects. */
        $.ajax('https://api.github.com/users/jo372/repos', {
            dataType: 'json',
            timeout: 750,
            success: function(data, status, xhr) {

                /** prefiltering the array before rendering the divs to the screen! */
                data = Array.from(data).filter((data) => data['fork'] == false && data['name'].toLowerCase() != 'jo372');

                /** updating the state if the loadingscreen to be loading. (TODO: maybe take away show & hide functions and make it automatic?) */
                loadingScreen.setState(LoadingScreenState.LOADING);

                /** counting how many projects there are so we can create divs which will contain two projects per row. */
                let projectCount = 0;
                let row = createRow();
                let project = null;

                /** making sure we add +1, to make sure the rows & columns are created correctly. */
                for(let i=0; i < data.length + 1; i++) {
                    if(projectCount % 2 == 0) {
                        projectsList.appendChild(row);
                        row = createRow();
                    }

                    if(i < data.length) {
                        project = new Project(data[i]);
                        row.appendChild(project.getNode());
                        projectCount++;
                    }
                    
                }
                
                /** updating the state to be loaded. */
                loadingScreen.setState(LoadingScreenState.LOADED);

                /** hiding the loading screen as it is completed. */
                loadingScreen.hide();
            },
            error: function(jqXhr, textStatus, errorMessage) {
                /** updating the status to be error & returning the error to the screen & dissapearing after 5 seconds so the user can access the website afterwards. */
                loadingScreen.setState(LoadingScreenState.ERROR);
                message.innerText = `Unable to load content... error message: ${errorMessage}\n closing in 5s...`;
                delay(5000).then(() => {
                    loadingScreen.hide();
                });
            }
        });
    
    }
    
});