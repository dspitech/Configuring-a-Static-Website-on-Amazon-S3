const labs = [
    {
        title: "EC2 & Sécurité",
        icon: "fas fa-server",
        desc: "Apprenez à lancer une instance Linux et configurer les Security Groups.",
        level: "Débutant",
        duration: "1 h",
        link: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html"
    },
    {
        title: "S3 Hébergement statique",
        icon: "fas fa-database",
        desc: "Hébergez votre premier site statique sur Amazon S3 et comprenez les politiques de bucket.",
        level: "Débutant",
        duration: "45 min",
        link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html"
    },
    {
        title: "Bases de données RDS",
        icon: "fas fa-table",
        desc: "Connectez une application à une base de données MySQL gérée avec Amazon RDS.",
        level: "Intermédiaire",
        duration: "2 h",
        link: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html"
    },
    {
        title: "Distribution avec CloudFront",
        icon: "fas fa-globe",
        desc: "Accélérez votre site statique en le distribuant via un réseau de diffusion de contenu.",
        level: "Intermédiaire",
        duration: "1 h 30",
        link: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html"
    }
];

function displayLabs() {
    const container = document.getElementById('labs-container');
    if (!container) return;

    container.innerHTML = labs.map(lab => `
        <a href="${lab.link}" class="lab-card-link" target="_blank" rel="noopener noreferrer">
            <article class="lab-card">
                <i class="${lab.icon}"></i>
                <h3>${lab.title}</h3>
                <p>${lab.desc}</p>
                <ul class="lab-meta">
                    <li><strong>Niveau :</strong> ${lab.level}</li>
                    <li><strong>Durée estimée :</strong> ${lab.duration}</li>
                </ul>
                <span class="btn-primary" style="display:inline-block; margin-top:10px; font-size:0.9rem;">Ouvrir le tutoriel AWS</span>
            </article>
        </a>
    `).join('');
}

// Simple smooth scroll for internal anchors
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayLabs();
    enableSmoothScroll();
});