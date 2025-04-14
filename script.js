// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Back to top button functionality
const backToTopBtn = document.getElementById("backToTop");
let isVisible = false;

window.onscroll = function () {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop > 200 && !isVisible) {
        backToTopBtn.classList.remove("fade-out");
        backToTopBtn.classList.add("fade-in");
        backToTopBtn.style.visibility = "visible";
        isVisible = true;
    } else if (scrollTop <= 200 && isVisible) {
        backToTopBtn.classList.remove("fade-in");
        backToTopBtn.classList.add("fade-out");
        isVisible = false;
    }

    highlightActiveSection(); 
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Highlight current section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    let currentSectionId = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSectionId = "#" + section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === currentSectionId) {
            link.classList.add("active-link");
        }
    });
}

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectDivs = document.querySelectorAll('.project');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectDivs.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block';
                } else {
                    const categoryMatch = project.classList.contains(filter);
                    project.style.display = categoryMatch ? 'block' : 'none';
                }
            });
            
            // Animate projects into view
            setTimeout(() => {
                document.querySelectorAll('.project[style="display: block"]').forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('fade-in');
                    }, index * 100);
                });
            }, 100);
        });
    });
}

// Project image modal functionality
document.querySelectorAll('.project img').forEach(image => {
    image.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.classList.add('modal-close');
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Fade in the modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal on click
        modal.addEventListener('click', function() {
            this.classList.remove('show');
            setTimeout(() => {
                this.remove();
            }, 300);
        });
    });
});


// Initialize AOS (Animate On Scroll) effect for projects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project').forEach((project, index) => {
        project.style.animationDelay = `${index * 0.1}s`;
        project.classList.add('fade-in-project');
    });
});

// Skills progress animation
const skillItems = document.querySelectorAll('#technical-skills li');
if (skillItems.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-animate');
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Handle dropdown menu on mobile
document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown triggers
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
    
    // Add click event listeners for mobile
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // Only apply this behavior on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    if (dropdown !== parent) {
                        dropdown.classList.remove('active');
                    }
                });
                
                // Toggle active class
                parent.classList.toggle('active');
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                // If the click is outside the dropdown
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Close dropdown when clicking a dropdown item
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.closest('.dropdown').classList.remove('active');
            }
        });
    });
    
    // Reset dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Smooth scrolling for project dropdown links
document.querySelectorAll('.dropdown-content a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Scroll to the project with offset for header
            window.scrollTo({
                top: target.offsetTop - 100, // Adjust this value based on your header height
                behavior: 'smooth'
            });
            
            // Highlight the project briefly
            target.classList.add('highlight');
            setTimeout(() => {
                target.classList.remove('highlight');
            }, 2000);
        }
    });
});
// Handle dropdown positioning for edge of screen
function adjustDropdownPosition() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (!dropdownContent) return;
        
        // Reset position to default
        dropdownContent.style.left = '';
        dropdownContent.style.right = '';
        
        // Only apply for desktop view
        if (window.innerWidth > 768) {
            const rect = dropdownContent.getBoundingClientRect();
            
            // If dropdown would go off the right edge of the screen
            if (rect.right > window.innerWidth) {
                // Special handling for top-level dropdown
                if (dropdown.parentElement.classList.contains('nav-links')) {
                    dropdownContent.style.left = 'auto';
                    dropdownContent.style.right = '0';
                } else {
                    // For nested dropdowns
                    dropdownContent.style.left = 'auto';
                    dropdownContent.style.right = '100%';
                }
            }
        }
    });
}
// Adjust dropdowns on hover
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', adjustDropdownPosition);
});

// Add this to your existing resize event listener
// Update your existing resize event listener to include adjustDropdownPosition
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    adjustDropdownPosition(); // Add this line
});

// Initial adjustment
adjustDropdownPosition();

document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});

// For project highlighting when navigating from dropdown
document.addEventListener('DOMContentLoaded', function() {
    // Check if URL has a hash that corresponds to a project
    if(window.location.hash) {
        const targetProject = document.querySelector(window.location.hash);
        if(targetProject && targetProject.classList.contains('project')) {
            targetProject.classList.add('highlight');
            // Ensure the project is visible
            targetProject.scrollIntoView({behavior: 'smooth'});
        }
    }
    
    // Add click listeners to project links in dropdowns
    document.querySelectorAll('.dropdown-content a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').split('#')[1];
            const targetProject = document.getElementById(targetId);
            
            if(targetProject && targetProject.classList.contains('project')) {
                // Remove any existing highlights
                document.querySelectorAll('.project.highlight').forEach(p => {
                    p.classList.remove('highlight');
                });
                
                // Add highlight to the target project
                setTimeout(() => {
                    targetProject.classList.add('highlight');
                }, 100);
            }
        });
    });
});

// Add event listeners to dropdown links
document.addEventListener('DOMContentLoaded', function() {
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove highlight from all projects
            document.querySelectorAll('.project').forEach(project => {
                project.classList.remove('highlight');
            });
            
            // Add highlight to selected project
            const projectId = this.getAttribute('href').substring(1);
            const selectedProject = document.getElementById(projectId);
            if (selectedProject) {
                selectedProject.classList.add('highlight');
            }
        });
    });
});
