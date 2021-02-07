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
                data = Array.from(data);

                const filteredNames = ['jo372']; // Personal repo that provides README.md info
                let projectCount = 1;
                let row = createRow();

                for(let i=0; i < data.length + 1; i++) {
                    if(projectCount % 2 == 0) {
                        projectsList.appendChild(row);
                        row = createRow();
                    }

                    if(i < data.length) {
                        const project = new Project(data[i]);
                    
                        /** filtering out forked projects, just because it's forked doesn't mean I've worked on it... and defininitely do not want my person README.md */
                        if(project.isForked() == false && filteredNames.includes(project.getName().toLowerCase()) == false) {
                            row.appendChild(project.getNode());
                            projectCount++;
                        }
                    }
                    
                }
                
            },
            error: function(jqXhr, textStatus, errorMessage) {
                /* error occurred, do something about it?? */
            }
        });
    
    }
    
});