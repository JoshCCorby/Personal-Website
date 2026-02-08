document.addEventListener('DOMContentLoaded', () => {
    loadResume();
    loadProjects();
});

async function loadResume() {
    try {
        const response = await fetch('resume.json');
        const data = await response.json();

        // Header
        const contactDiv = document.getElementById('contact-info');
        contactDiv.innerHTML = `
            <span>${data.contact.location}</span>
            <span><a href="tel:${data.contact.phone}">${data.contact.phone}</a></span>
            <span><a href="mailto:${data.contact.email}">${data.contact.email}</a></span>
            <span><a href="https://${data.contact.linkedin}">${data.contact.linkedin}</a></span>
        `;

        // Education
        const eduList = document.getElementById('education-list');
        data.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-header">
                    <span>${edu.institution}</span>
                    <span>${edu.year}</span>
                </div>
                <div class="item-sub">${edu.qualification}</div>
                <div>${edu.details}</div>
            `;
            eduList.appendChild(div);
        });

        // Experience
        const expList = document.getElementById('experience-list');
        data.experience.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <div class="item-header">
                    <span>${exp.company}</span>
                    <span>${exp.year}</span>
                </div>
                <div class="item-sub">${exp.role}, ${exp.location}</div>
                <div>${exp.details}</div>
            `;
            expList.appendChild(div);
        });

        // Achievements
        const achList = document.getElementById('achievement-list');
        data.achievements.forEach(ach => {
            const li = document.createElement('li');
            li.innerText = ach;
            achList.appendChild(li);
        });

    } catch (error) {
        console.error('Error loading resume:', error);
    }
}

async function loadProjects() {
    try {
        const response = await fetch('projectdata.json');
        const projects = await response.json();
        const projectList = document.getElementById('project-list');

        projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project-card';
            
            let titleHtml = `<div class="project-title">${project.name}</div>`;
            if (project.html_url) {
                titleHtml = `<div class="project-title"><a href="${project.html_url}" target="_blank">${project.name}</a></div>`;
            }

            let bulletsHtml = '';
            if (project.bulletPoints && project.bulletPoints.length > 0) {
                bulletsHtml = '<ul class="project-bullets">';
                project.bulletPoints.forEach(bp => bulletsHtml += `<li>${bp}</li>`);
                bulletsHtml += '</ul>';
            }

            div.innerHTML = `
                ${titleHtml}
                <div class="project-tech">${project.techStack || project.language}</div>
                <div>${project.description}</div>
                ${bulletsHtml}
            `;
            projectList.appendChild(div);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
