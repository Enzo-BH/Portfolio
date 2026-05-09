/* ============================================================
   DONNÉES DES PROJETS
   ============================================================ */

const projets = {

  "bdd": {
    titre: "Base de données - Qualité de l'air",
    icon: "Assets/database.png",
    tech: "MySQL · Workbench · Command Line",
    github: null,
    sections: [
      {
        type: "intro",
        texte: "Projet réalisé dans le cadre d'un <strong>jeu de rôle professionnel</strong> : nous incarnions une équipe de l'entreprise ClearData, mandatée par le Ministère de la Transition Écologique pour concevoir et déployer une base de données nationale de mesure de la qualité de l'air. <strong>Objectif</strong> : centraliser les relevés de capteurs répartis dans toutes les préfectures de France, gérer les agences régionales et permettre la production de rapports d'analyse environnementale."
      },
      {
        type: "sous-titre",
        texte: "Organisation du projet"
      },
      {
        type: "texte",
        texte: "Le projet a été structuré selon une méthodologie de gestion de projet, avec définition des rôles via un <strong>OBS</strong> (Organizational Breakdown Structure) et des tâches via une <strong>WBS</strong> (Work Breakdown Structure). "
      },
      {
        type: "sous-titre",
        texte: "Modélisation de la base"
      },
      {
        type: "texte",
        texte: "La phase de conception a débuté par l'élaboration du <strong>Modèle Conceptuel de Données (MCD)</strong> sous Looping, en identifiant les entités clés : Agence, Agent, Capteur, Relevé, Gaz, Localisation et Rapport. Le modèle respecte la <strong>3e forme normale (3NF)</strong> pour éliminer toute redondance. La conversion en <strong>Modèle Logique (MLD)</strong> a traduit ces entités en tables relationnelles avec clés primaires et étrangères."
      },
      {
        type: "image",
        src: "Assets/bdd-mcd.png",
        caption: "MCD — Modèle Conceptuel de Données (réalisé sous Looping)"
      },
      {
        type: "image",
        src: "Assets/bdd-mld.png",
        caption: "MLD — Modèle Logique avec clés primaires et étrangères"
      },
      {
        type: "sous-titre",
        texte: "Implémentation & peuplement"
      },
      {
        type: "texte",
        texte: "La base a été implémentée sous <strong>MySQL Workbench</strong> puis peuplée via <strong>MySQL Command Line</strong> avec des données réalistes : plus de <strong>200 relevés de capteurs</strong>, <strong>+ 20 employés</strong> répartis dans les agences régionales, <strong>+ 50 rapports</strong> produits entre 2017 et 2024."
      },
      {
        type: "sous-titre",
        texte: "Requêtes SQL avancées"
      },
      {
        type: "texte",
        texte: "<strong>12 requêtes complexes</strong> ont été développées pour répondre aux besoins du ministère, couvrant jointures multiples, sous-requêtes, agrégations et procédures stockées. Voici un exemple :"
      },
      {
        type: "code",
        label: "Requête n°9 — Concentration moyenne par gaz en Île-de-France (2020)",
        code:
`SELECT g.GAZ_Nom, g.GAZ_Sigle, AVG(rel.REL_Valeur) AS Moyenne_ppm
    FROM Releve AS rel
    JOIN Gaz AS g
      ON rel.ID_Gaz = g.ID_Gaz
    JOIN Capteur AS c
      ON rel.ID_Capteur = c.ID_Capteur
    JOIN Agence AS age
      ON c.ID_Agence = age.ID_Agence
    JOIN Localisation AS l
      ON age.ID_Localisation = l.ID_Localisation
    WHERE l.LOC_Region = 'Ile-de-France'
      AND YEAR(rel.REL_Date) = 2020
    GROUP BY g.GAZ_Nom, g.GAZ_Sigle;`
      },
      {
        type: "sous-titre",
        texte: "Sécurité & Optimisation"
      },
      {
        type: "texte",
        texte: "Deux comptes utilisateurs ont été créés avec des droits différenciés : un compte <strong>admin</strong> avec tous les privilèges, et un compte <strong>user</strong> limité aux SELECT. "
      },
      {
        type: "code",
        label: "Création des comptes utilisateurs",
        code:
`CREATE USER 'admin'@'localhost' IDENTIFIED BY 'MDP_ADMIN'; 
GRANT ALL PRIVILEGES ON cleardata.* TO 'admin'@'localhost';

CREATE USER 'user'@'localhost' IDENTIFIED BY 'MDP_USER';
GRANT SELECT ON cleardata.* TO 'user'@'localhost';`
      },
    ]
  },

  "jeu-vie": {
    titre: "Jeu De La Vie",
    icon: "Assets/cellule.png",
    tech: "C++ · POO · Design Patterns",
    github: "https://github.com/Enzo-BH/Jeu_De_La_Vie",
    sections: [
      {
        type: "intro",
        texte: "Implémentation en C++ du <strong>Jeu de la Vie de Conway</strong>, réalisée dans le cadre d'un projet de Programmation Orientée Objet. L'objectif était de produire une architecture propre, extensible et respectant les principes <strong>SOLID</strong> en s'appuyant sur des design patterns reconnus plutôt qu'un code procédural."
      },
      {
        type: "sous-titre",
        texte: "Classes principales"
      },
      {
        type: "texte",
        texte: "<strong>Cellule</strong> encapsule un état courant et un état futur, délègue la logique de transition à <code>EtatCellule</code>. <strong>Grille</strong>  gère le tableau 2D de cellules, implémente la <strong>topologie torique</strong> (les bords sont connectés) via <code>GetCellulePrecise(x, y)</code> avec modulo. <strong>Fichier</strong> lecture et écriture des grilles au format texte. <strong>Jeu</strong> orchestre les générations et expose les accesseurs. <strong>Main</strong> point d'entrée, gestion du mode console."
      },
      {
        type: "sous-titre",
        texte: "Architecture & Design Patterns"
      },
      {
        type: "texte",
        texte: "Le projet repose sur le <strong>pattern State</strong> pour gérer les états des cellules : une classe abstraite <code>EtatCellule</code> est héritée par <code>EtatVivant</code> et <code>EtatMort</code>, chacune implémentant sa propre logique de transition via <code>EtatSuivant()</code>. Plutôt qu'un Singleton classique, les états sont des <strong>instances globales uniques</strong> (<code>extern EtatVivant ETAT_VIVANT</code>) choix pertinent car les états sont stateless : aucune donnée membre, pas d'allocation dynamique, les pointeurs sont simplement réutilisés. Ajouter un état (ex. cellule obstacle) ne nécessite qu'une nouvelle classe fille, sans toucher au reste."
      },
      {
        type: "code",
        label: "Pattern State — EtatVivant (code réel)",
        code:
`// EtatVivant.hpp
class EtatVivant : public EtatCellule {
public:
    const EtatCellule* EtatSuivant(int voisinsVivants) const override;
    bool EstVivante() const override;
    std::string ToChar() const override;
};
extern EtatVivant ETAT_VIVANT; // instance globale unique
 
// EtatVivant.cpp
EtatVivant ETAT_VIVANT;
 
const EtatCellule* EtatVivant::EtatSuivant(int voisinsVivants) const {
    // Survie si 2 ou 3 voisins vivants
    if (voisinsVivants == 2 || voisinsVivants == 3)
        return &ETAT_VIVANT;
    // Sinon la cellule meurt
    return &ETAT_MORT;
}
 
bool EtatVivant::EstVivante() const { return true; }
std::string EtatVivant::ToChar() const { return "1"; }`
      },
      {
        type: "sous-titre",
        texte: "Grille torique & gestion mémoire"
      },
      {
        type: "texte",
        texte: "La grille est <strong>torique</strong> : les bords sont connectés entre eux, simulant un plan infini. Le calcul des coordonnées voisines utilise le modulo pour ramener n'importe quelle coordonnée hors-grille à sa position équivalente. Chaque cellule est <strong>allouée dynamiquement</strong> (<code>new Cellule</code>) et libérée dans le destructeur — la mémoire est gérée manuellement et proprement."
      },
      {
        type: "code",
        label: "Grille.cpp — topologie torique & comptage des voisins",
        code:
`Cellule* Grille::GetCellulePrecise(int x, int y) const {
    // Coordonnées toriques : les bords se connectent
    x = (x + largeur_) % largeur_;
    y = (y + hauteur_) % hauteur_;
    return cellules_[y][x];
}
 
int Grille::CompterVoisinsVivants(int x, int y) const {
    int count = 0;
    for (int dx = -1; dx <= 1; ++dx) {
        for (int dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) continue; // ignore la cellule elle-même
            int nx = (x + dx + largeur_) % largeur_; // voisin torique
            int ny = (y + dy + hauteur_) % hauteur_;
            if (cellules_[ny][nx]->EstVivante()) ++count;
        }
    }
    return count;
}
 
// Modification d'une cellule : réutilise les instances globales stateless
void Grille::ModifCellule(int x, int y, bool vivant) {
    Cellule* cellule = GetCellulePrecise(x, y);
    cellule->SetEtat(vivant ? &ETAT_VIVANT : &ETAT_MORT);
}`
      },
      {
        type: "sous-titre",
        texte: "Tests unitaires"
      },
      {
        type: "texte",
        texte: "Des fonctions de tests unitaires vérifient l'état de la grille après un nombre arbitraire d'itérations. Chaque test est paramétré par une grille attendue et un nombre d'itérations — ce qui permet de valider les règles de Conway, la topologie torique et le comportement des cellules obstacles de façon indépendante."
      }
    ]
  },

  "escape": {
    titre: "Escape No Game",
    icon: "Assets/microphone.png",
    tech: "Python · Matplotlib · Numpy",
    github: "https://github.com/Enzo-BH/Escape-No-Game/",
    sections: [
      {
        type: "intro",
        texte: "Système de communication numérique simulé en Python, basé sur la modulation ASK (Amplitude Shift Keying) couplée à un encodage Manchester. Le projet illustre concrètement les principes de transmission de données binaires sur un canal bruité."
      },
      {
        type: "sous-titre",
        texte: "Modulation ASK"
      },
      {
        type: "texte",
        texte: "L'ASK encode chaque bit en faisant varier l'amplitude d'un signal porteur sinusoïdal : amplitude haute pour un '1', amplitude nulle pour un '0'. Simple à implémenter, elle reste sensible au bruit — un bon cas d'étude pour illustrer les limites de la transmission."
      },
      {
        type: "sous-titre",
        texte: "Encodage Manchester"
      },
      {
        type: "texte",
        texte: "L'encodage Manchester garantit la synchronisation entre émetteur et récepteur. Chaque bit est représenté par une transition : front montant pour '1', front descendant pour '0'. Cela élimine les longues séquences identiques et facilite la récupération de l'horloge côté réception."
      }
    ]
  },

  "strongbox": {
    titre: "Strongbox 3000",
    icon: "Assets/arduino.png",
    tech: "Arduino · C++ · IDE",
    github: "https://github.com/Enzo-BH/Strongbox-3000",
    sections: [
      {
        type: "intro",
        texte: "Coffre-fort intelligent développé sur microcontrôleur Arduino, combinant plusieurs méthodes d'authentification matérielles : code PIN via clavier, capteur de distance, et retour visuel/sonore. Un projet embarqué de bout en bout, du câblage au code."
      },
      {
        type: "sous-titre",
        texte: "Méthodes d'authentification"
      },
      {
        type: "texte",
        texte: "Le système vérifie un code PIN saisi sur un clavier matriciel 4×4. En cas de bonne séquence, un servomoteur déverrouille le mécanisme. Un capteur ultrasonique détecte une tentative d'intrusion et déclenche une alerte sonore via buzzer."
      },
      {
        type: "sous-titre",
        texte: "Gestion des états"
      },
      {
        type: "texte",
        texte: "Le firmware est organisé autour d'une machine à états : veille, saisie en cours, authentification réussie, alerte. Chaque transition est accompagnée d'un retour visuel sur écran LCD 16×2 et d'un code couleur via LED RGB."
      }
    ]
  }

};


/* ============================================================
   LOGIQUE MODALE
   ============================================================ */

const overlay      = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const closeBtn     = document.getElementById("modal-close");

function buildSections(sections) {
  return sections.map(s => {
    switch (s.type) {
      case "intro":
        return `<p class="modal-intro">${s.texte}</p>`;
      case "texte":
        return `<p class="modal-texte">${s.texte}</p>`;
      case "sous-titre":
        return `<h3 class="modal-sous-titre">${s.texte}</h3>`;
      case "image":
        return `
          <figure class="modal-figure">
            <img src="${s.src}" alt="${s.caption || ''}">
          </figure>`;
      case "code":
        return `
          <div class="modal-code-block">
            <span class="modal-code-label">${s.label}</span>
            <pre><code>${s.code}</code></pre>
          </div>`;
      default:
        return "";
    }
  }).join("");
}

function openModal(id) {
  const p = projets[id];
  if (!p) return;

  const githubHTML = p.github
    ? `<div class="modal-footer">
        <a href="${p.github}" target="_blank" rel="noopener noreferrer">
          <button><i class='bx bxl-github'></i> Code sur GitHub</button>
        </a>
       </div>`
    : "";

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${p.titre} <img src="${p.icon}" alt=""></h2>
      <span class="modal-tech">${p.tech}</span>
    </div>
    <div class="modal-body">
      ${buildSections(p.sections)}
    </div>
    ${githubHTML}
  `;

  overlay.classList.add("open");
  overlay.removeAttribute("aria-hidden");
  document.body.style.overflow = "hidden";
  
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".projet[data-projet]").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.projet));
});

closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});