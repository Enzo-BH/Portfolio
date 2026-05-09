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
    tech: "Python · NumPy · Matplotlib · SoundDevice",
    github: "https://github.com/Enzo-BH/Escape-No-Game/",
    sections: [
      {
        type: "intro",
        texte: "Projet réalisé dans le cadre d'un <strong>scénario d'espionnage</strong> : nous incarnions des ingénieurs R&D de l'agence AIL3C, chargés de concevoir un système permettant à un agent isolé de communiquer via un simple micro de salle de conférence. La solution : <strong>cacher un message numérique dans un signal audio</strong> via modulation ASK et encodage Manchester. Un POC complet de chaîne de transmission, implémenté en Python."
      },
      {
        type: "sous-titre",
        texte: "Chaîne de transmission complète"
      },
      {
        type: "texte",
        texte: "<strong>1)</strong> Conversion du texte en binaire (ASCII 8 bits) → <strong>2)</strong> Encodage Manchester → <strong>3)</strong> Modulation ASK sur porteuse sinusoïdale → <strong>4)</strong> Lecture audio du signal → <strong>5)</strong> Démodulation par corrélation → <strong>6)</strong> Décodage Manchester → <strong>7)</strong> Reconstruction du message. Chaque étape est visualisée via Matplotlib."
      },
      {
        type: "sous-titre",
        texte: "Encodage Manchester"
      },
      {
        type: "texte",
        texte: "L'encodage Manchester garantit la synchronisation entre émetteur et récepteur en représentant chaque bit par une <strong>transition de signal</strong> : un '1' devient la séquence <code>[+1, -1]</code>, un '0' devient <code>[-1, +1]</code>. Cela élimine les longues séquences identiques et permet la récupération d'horloge côté réception, sans canal de synchronisation séparé."
      },
      {
        type: "code",
        label: "Encodage & décodage Manchester",
        code:
`def enco_manchester(bits):
    manchester = []
    for i in bits:
        if i == '1':   # 1 → transition descendante [+1, -1]
            manchester.append(1)
            manchester.append(-1)
        elif i == '0': # 0 → transition montante  [-1, +1]
            manchester.append(-1)
            manchester.append(1)
    return manchester
 
def deco_manchester(bits):
    manchester = ''
    for i in range(0, len(bits), 2):
        if bits[i] == 1 and bits[i+1] == -1:
            manchester += '1'
        if bits[i] == -1 and bits[i+1] == 1:
            manchester += '0'
    return manchester`
      },
      {
        type: "sous-titre",
        texte: "Modulation ASK & démodulation"
      },
      {
        type: "texte",
        texte: "Le signal Manchester est modulé en <strong>ASK (Amplitude Shift Keying)</strong> : chaque symbole est multiplié par une porteuse sinusoïdale à 2000 Hz. La démodulation s'effectue par <strong>corrélation</strong> — on multiplie le signal reçu par la porteuse et on intègre sur chaque symbole avec <code>np.trapz</code>. Le signe du résultat détermine le bit reçu. Un système de <strong>détection et correction d'erreurs</strong> compare bit à bit le signal démodulé à l'émis et corrige les divergences."
      },
      {
        type: "code",
        label: "Modulation ASK & démodulation par corrélation",
        code:
`# Paramètres
baud = 300        # débit (bit/s)
Fe   = 22_050     # fréquence d'échantillonnage (Hz)
Fp   = 2_000      # fréquence porteuse (Hz)
Ns   = int(Fe/baud)  # échantillons par symbole
 
# Modulation ASK : signal Manchester × porteuse sinusoïdale
Porteuse = np.sin(2 * np.pi * Fp * t)
ASK = msg_bit_duplique * Porteuse
 
# Démodulation par corrélation (intégration sur chaque symbole)
Produit = ASK * Porteuse
res = [int(np.trapz(Produit[i:i+Ns])) for i in range(0, N, Ns)]
msg_demodule = [1 if r > 0 else -1 for r in res]
 
# Détection & correction d'erreurs bit à bit
for i in range(len(Erreur)):
    if not Erreur[i]:
        msg_demodule[i] = encodage_manchester[i]`
      },
      {
        type: "sous-titre",
        texte: "Visualisation des étapes"
      },
      {
        type: "texte",
        texte: "Chaque étape de la chaîne est visualisée via Matplotlib : signal Manchester brut, porteuse sinusoïdale, puis signal ASK modulé. Le signal est également <strong>joué en audio</strong> via SoundDevice — permettant de réellement entendre le message encodé tel qu'il sortirait du haut-parleur de la salle de conférence."
      }
    ]
  },

   "funkytown": {
    titre: "FunkyTown — Architecture réseau",
    icon: "Assets/funky.webp",
    tech: "Cisco Packet Tracer · VLAN · IPv6 · DHCP · VTP · VLSM",
    github: null,
    sections: [
      {
        type: "intro",
        texte: "Projet réalisé dans le cadre d'un <strong>scénario professionnel</strong> : nous incarnions l'ESN eXia, mandatée par le maire de FunkyTown pour concevoir et déployer l'infrastructure réseau de la ville. 5 sites aux besoins différents, configurés sous <strong>Cisco Packet Tracer</strong> - du réseau d'entreprise classique jusqu'au tunnel IPv6 vers un datacenter cloud."
      },
      {
        type: "sous-titre",
        texte: "Les 5 sites de la ville"
      },
      {
        type: "texte",
        texte: "<strong>ESN eXia : </strong> réseau d'entreprise 192.168.1.0/24, serveur DNS/FTP local, borne Wifi sécurisée WPA2, routeur avec accès Web. <strong>Bibliothèque : </strong>  DHCP dynamique, Wifi public ouvert, accès SSH sur les équipements. <strong>Engie  : </strong> segmentation par3 VLANs (Service Technique, Commercial, Wifi invités), adressage VLSM, routage inter-VLAN. <strong>Digiplex : </strong> 8 VLANs, EtherChannel, switch L3, contrôleur Wifi avec deux SSID, VLAN de management SSH. <strong>Datacenter</strong> : réseau maillé FAI, tunnel IPv6 vers un serveur Meraki cloud."
      },
      {
        type: "sous-titre",
        texte: "Plan d'adressage global"
      },
      {
        type: "texte",
        texte: "L'ensemble des sites a fait l'objet d'un <strong>plan d'adressage</strong> : notation CIDR, masque, plage utilisable, adresse réseau et broadcast pour chaque sous-réseau - soit plus d'une <strong>vingtaine de réseaux documentés</strong>, incluant les interconnexions FAI, le réseau maillé du datacenter et le tunnel IPv6. Ce document a servi de référence unique tout au long du déploiement."
      },
      {
        type: "sous-titre",
        texte: "Digiplex"
      },
      {
        type: "texte",
        texte: "Le site Digiplex est l'exercice le plus ambitieux du projet. <strong>8 VLANs</strong> distincts (Conception, Commercial, RH, Hotline, Wifi Enterprise, Wifi Invités, Server, Management) sont distribués sur plusieurs étages via des switches configurés en <strong>VTP</strong> et reliés par <strong>EtherChannel</strong>. Le routage inter-VLAN est assuré par un switch L3, chaque interface portant la dernière IP de son réseau. Le VLAN 80 (Management) permet l'accès SSH à chaque switch."
      },
      {
        type: "image",
        src: "Assets/funky-digiplex.png",
        caption: "Topologie Digiplex — 8 VLANs, switch L3, contrôleur Wifi, EtherChannel"
      },
      {
        type: "sous-titre",
        texte: "Datacenter & Tunnel IPv6"
      },
      {
        type: "texte",
        texte: "Le datacenter héberge un réseau maillé de routeurs FAI interconnectant tous les sites de la ville. Le point technique le plus avancé : la mise en place d'un <strong>tunnel IPv6</strong> entre le routeur eXia (2001:DB8:2000::/64) et le serveur Meraki cloud (2001:DB8:1000::1/64), avec le réseau de tunnel 2001:DB8:3000::/64. Les PC du bureau eXia peuvent atteindre la page d'administration Meraki via son adresse IPv6 — une configuration que peu d'étudiants maîtrisent en première année."
      },
      {
        type: "image",
        src: "Assets/funky-datacenter.png",
        caption: "Datacenter & tunnel IPv6 eXia ↔ Meraki cloud"
      },
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
  document.getElementById("modal-box").scrollTop = 0;
  
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