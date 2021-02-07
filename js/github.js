// https://api.github.com/users/jo372/repos

$(document).ready(function(){
    /** checking if the container with id 'projects' is on the page  */
    const projectsList = document.getElementById('projects');

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
    
        $.ajax('https://api.github.com/users/jo372/repos', {
            dataType: 'json',
            timeout: 500,
            success: function(data, status, xhr) {
                /** prefiltering the array before rendering the divs to the screen! */
                data = Array.from(data).filter((data) => data['fork'] == false && data['name'].toLowerCase() != 'jo372');
                
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
                
            },
            error: function(jqXhr, textStatus, errorMessage) {
                /* error occurred, do something about it?? */
            }
        });
    
    }
    
});