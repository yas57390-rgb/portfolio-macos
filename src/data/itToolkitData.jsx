
import React from 'react';
import {
    FaHdd, FaCompactDisc, FaNetworkWired, FaServer, FaShieldAlt, FaTools, FaTerminal,
    FaFileArchive, FaExchangeAlt, FaCode, FaCloud, FaGlobe, FaDatabase, FaDesktop, FaUsb,
    FaMemory, FaWifi, FaLaptopMedical, FaCogs, FaRegStickyNote, FaEdit, FaBug,
    FaWindows, FaLinux, FaApple, FaChrome, FaFirefox, FaEdge, FaSafari, FaGithub, FaDocker,
    FaAws, FaUbuntu, FaCentos, FaFedora, FaSuse, FaRedhat, FaSlack, FaDiscord,
    FaAndroid, FaAppStore, FaAppStoreIos, FaBattleNet, FaBuffer, FaChromecast, FaCloudsmith,
    FaCloudversify, FaCodiepie, FaDAndD, FaDev, FaEarlybirds, FaFirstOrder, FaGalacticSenate,
    FaHips, FaJediOrder, FaKeybase, FaLastfm, FaLastfmSquare, FaMandalorian, FaMastodon,
    FaNimblr, FaOptinMonster, FaPiedPiper, FaPiedPiperAlt, FaPiedPiperHat, FaPiedPiperPp,
    FaProductHunt, FaQuinscape, FaRaspberryPi, FaResolving, FaShopware, FaSpeakerDeck,
    FaSpider, FaSith, FaStaylinked, FaSteam, FaSteamSquare, FaSteamSymbol, FaStickerMule,
    FaStudiovinari, FaSymfony, FaTeamspeak, FaTelegram, FaTelegramPlane, FaTheRedYeti,
    FaThinkPeaks, FaTradeFederation, FaTrello, FaTumblr, FaTumblrSquare, FaTwitch, FaTwitter,
    FaTwitterSquare, FaTypo3, FaUber, FaUikit, FaUniregistry, FaUntappd, FaUps, FaUsps,
    FaUssunnah, FaVaadin, FaViacoin, FaViadeo, FaViadeoSquare, FaViber, FaVimeo, FaVimeoSquare,
    FaVimeoV, FaVine, FaVk, FaVnv, FaVuejs, FaWaze, FaWeebly, FaWeibo, FaWeixin, FaWhatsapp,
    FaWhatsappSquare, FaWhmcs, FaWikipediaW, FaWix, FaWizardsOfTheCoast, FaWolfPackBattalion,
    FaWordpress, FaWordpressSimple, FaWpbeginner, FaWpexplorer, FaWpforms, FaWpressr, FaXbox,
    FaXing, FaXingSquare, FaYCombinator, FaYahoo, FaYammer, FaYandex, FaYandexInternational,
    FaYarn, FaYelp, FaYoast, FaYoutube, FaYoutubeSquare, FaZhihu
} from 'react-icons/fa';

import { VscRemote } from 'react-icons/vsc';

// Helper to wrap icons with standard styling
const IconWrapper = ({ children, className = "" }) => (
    <span className={`text-2xl ${className}`}>{children}</span>
);

export const IT_TOOLKIT_CATEGORIES = [
    { id: 'backup', name: 'Backup & Recovery', icon: <FaHdd /> },
    { id: 'bootable', name: 'Création médias bootables', icon: <FaCompactDisc /> },
    { id: 'remote', name: 'Administration à distance', icon: <VscRemote /> },
    { id: 'network', name: 'Réseau & Diagnostic', icon: <FaNetworkWired /> },
    { id: 'storage', name: 'Stockage & Analyse disque', icon: <FaDatabase /> },
    { id: 'devops', name: 'Développement & DevOps', icon: <FaCode /> },
    { id: 'db', name: 'Bases de données', icon: <FaServer /> },
    { id: 'virtualization', name: 'Virtualisation', icon: <FaDesktop /> },
    { id: 'monitoring', name: 'Monitoring & Supervision', icon: <FaLaptopMedical /> },
    { id: 'servers', name: 'Serveurs & Services', icon: <FaServer /> },
    { id: 'os', name: 'Systèmes d\'exploitation', icon: <FaLinux /> },
    { id: 'security', name: 'Sécurité & Pentest', icon: <FaShieldAlt /> },
    { id: 'inventory', name: 'Gestion de parc & Inventaire', icon: <FaCogs /> },
    { id: 'docs', name: 'Documentation & Ticketing', icon: <FaRegStickyNote /> },
    { id: 'communication', name: 'Messagerie & Communication', icon: <FaSlack /> },
    { id: 'utils', name: 'Utilitaires système', icon: <FaTools /> },
    { id: 'compression', name: 'Compression & Archivage', icon: <FaFileArchive /> },
    { id: 'transfer', name: 'Transfert de fichiers', icon: <FaExchangeAlt /> },
    { id: 'editors', name: 'Éditeurs de texte & IDE', icon: <FaCode /> },
    { id: 'config', name: 'Configuration automatisation', icon: <FaCogs /> },
    { id: 'containers', name: 'Containers & Orchestration', icon: <FaDocker /> },
    { id: 'cloud', name: 'Cloud & Infrastructure', icon: <FaCloud /> },
    { id: 'web', name: 'Navigateurs & Outils web', icon: <FaGlobe /> },
];

export const IT_TOOLS = [
    // --- Backup & Recovery ---
    { id: 'veeam', name: 'Veeam Backup', category: 'backup', icon: <FaHdd className="text-green-500" />, description: 'Sauvegarde et restauration.', website: 'https://www.veeam.com', platforms: ['Windows'], license: 'Commercial' },
    { id: 'acronis', name: 'Acronis Cyber Protect', category: 'backup', icon: <FaShieldAlt className="text-blue-700" />, description: 'Protection cybernétique.', website: 'https://www.acronis.com', platforms: ['Windows', 'macOS'], license: 'Commercial' },
    { id: 'clonezilla', name: 'Clonezilla', category: 'backup', icon: <FaCompactDisc className="text-orange-500" />, description: 'Clonage de disque/partition.', website: 'https://clonezilla.org', platforms: ['Linux'], license: 'Open Source' },
    { id: 'macrium', name: 'Macrium Reflect', category: 'backup', icon: <FaHdd className="text-blue-400" />, description: 'Image disque et clonage.', website: 'https://www.macrium.com', platforms: ['Windows'], license: 'Commercial' },
    { id: 'winfilerecovery', name: 'Windows File Recovery', category: 'backup', icon: <FaWindows className="text-blue-500" />, description: 'Outil de récupération Microsoft.', website: 'https://apps.microsoft.com', platforms: ['Windows'], license: 'Free' },

    // --- Bootable ---
    { id: 'rufus', name: 'Rufus', category: 'bootable', icon: <FaUsb className="text-gray-600" />, description: 'Clés USB démarrables.', website: 'https://rufus.ie', platforms: ['Windows'], license: 'Free' },
    { id: 'ventoy', name: 'Ventoy', category: 'bootable', icon: <FaCompactDisc className="text-purple-600" />, description: 'Multi-boot USB solution.', website: 'https://www.ventoy.net', platforms: ['Windows', 'Linux'], license: 'Open Source' },
    { id: 'etcher', name: 'balenaEtcher', category: 'bootable', icon: <FaUsb className="text-yellow-600" />, description: 'Flasheur de carte SD/USB sûr.', website: 'https://www.balena.io/etcher', platforms: ['all'], license: 'Free' },
    { id: 'universalusb', name: 'Universal USB Installer', category: 'bootable', icon: <FaUsb />, description: 'Live Linux USB Creator.', website: 'https://www.pendrivelinux.com', platforms: ['Windows'], license: 'Free' },

    // --- Remote ---
    { id: 'anydesk', name: 'AnyDesk', category: 'remote', icon: <FaAppStore className="text-red-500" />, description: 'Bureau à distance rapide.', website: 'https://anydesk.com', platforms: ['all'], license: 'Commercial' },
    { id: 'teamviewer', name: 'TeamViewer', category: 'remote', icon: <FaExchangeAlt className="text-blue-500" />, description: 'Support à distance.', website: 'https://www.teamviewer.com', platforms: ['all'], license: 'Commercial' },
    { id: 'putty', name: 'PuTTY', category: 'remote', icon: <FaTerminal className="text-yellow-300 bg-black rounded p-0.5" />, description: 'Client SSH/Telnet.', website: 'https://www.putty.org', platforms: ['Windows'], license: 'Open Source' },
    { id: 'ninjaone', name: 'NinjaOne', category: 'remote', icon: <FaTools />, description: 'Gestion IT unifiée.', website: 'https://www.ninjaone.com', platforms: ['all'], license: 'Commercial' },
    { id: 'tightvnc', name: 'TightVNC', category: 'remote', icon: <VscRemote />, description: 'Logiciel de contrôle à distance.', website: 'https://www.tightvnc.com', platforms: ['Windows', 'Linux'], license: 'Open Source' },
    { id: 'remotedesktop', name: 'Remote Desktop Manager', category: 'remote', icon: <VscRemote className="text-orange-500" />, description: 'Centralisation des connexions.', website: 'https://devolutions.net', platforms: ['all'], license: 'Commercial' },

    // --- Network ---
    { id: 'wireshark', name: 'Wireshark', category: 'network', icon: <FaNetworkWired className="text-blue-600" />, description: 'Analyseur de paquets.', website: 'https://www.wireshark.org', platforms: ['all'], license: 'Open Source' },
    { id: 'nmap', name: 'Nmap', category: 'network', icon: <FaLinux className="text-blue-400" />, description: 'Scanner de sécurité réseau.', website: 'https://nmap.org', platforms: ['all'], license: 'Open Source' },
    { id: 'packettracer', name: 'Packet Tracer', category: 'network', icon: <FaNetworkWired className="text-blue-800" />, description: 'Simulation réseau Cisco.', website: 'https://www.netacad.com', platforms: ['all'], license: 'Proprietary' },
    { id: 'angryip', name: 'Angry IP Scanner', category: 'network', icon: <FaNetworkWired />, description: 'Scanner IP rapide.', website: 'https://angryip.org', platforms: ['all'], license: 'Open Source' },
    { id: 'prtg', name: 'PRTG Network Monitor', category: 'network', icon: <FaNetworkWired className="text-blue-500" />, description: 'Monitoring réseau.', website: 'https://www.paessler.com/prtg', platforms: ['Windows'], license: 'Commercial' },
    { id: 'solarwinds', name: 'SolarWinds Toolset', category: 'network', icon: <FaNetworkWired className="text-orange-500" />, description: 'Outils ingénierie réseau.', website: 'https://www.solarwinds.com', platforms: ['Windows'], license: 'Commercial' },

    // --- Storage ---
    { id: 'windirstat', name: 'WinDirStat', category: 'storage', icon: <FaHdd className="text-red-500" />, description: 'Stats utilisation disque.', website: 'https://windirstat.net', platforms: ['Windows'], license: 'Open Source' },
    { id: 'treesize', name: 'TreeSize', category: 'storage', icon: <FaHdd className="text-blue-500" />, description: 'Gestion espace disque.', website: 'https://www.jam-software.com', platforms: ['Windows'], license: 'Free/Commercial' },
    { id: 'crystaldiskinfo', name: 'CrystalDiskInfo', category: 'storage', icon: <FaHdd className="text-blue-300" />, description: 'Santé HDD/SSD.', website: 'https://crystalmark.info', platforms: ['Windows'], license: 'Free' },
    { id: 'spacesniffer', name: 'SpaceSniffer', category: 'storage', icon: <FaHdd className="text-orange-400" />, description: 'Visualisation espace disque.', website: 'http://www.uderzo.it', platforms: ['Windows'], license: 'Free' },

    // --- DevOps ---
    { id: 'docker', name: 'Docker', category: 'devops', icon: <FaDocker className="text-blue-500" />, description: 'Conteneurs et apps.', website: 'https://www.docker.com', platforms: ['all'], license: 'Free' },
    { id: 'vscode', name: 'VS Code', category: 'devops', icon: <FaCode className="text-blue-500" />, description: 'Éditeur de code.', website: 'https://code.visualstudio.com', platforms: ['all'], license: 'Free' },
    { id: 'git', name: 'Git', category: 'devops', icon: <FaCode className="text-orange-600" />, description: 'Contrôle de version.', website: 'https://git-scm.com', platforms: ['all'], license: 'Open Source' },
    { id: 'postman', name: 'Postman', category: 'devops', icon: <FaExchangeAlt className="text-orange-500" />, description: 'Plateforme API.', website: 'https://www.postman.com', platforms: ['all'], license: 'Free/Commercial' },
    { id: 'jenkins', name: 'Jenkins', category: 'devops', icon: <FaCogs className="text-red-600" />, description: 'Automatisation CI/CD.', website: 'https://www.jenkins.io', platforms: ['all'], license: 'Open Source' },
    { id: 'ansible', name: 'Ansible', category: 'devops', icon: <FaTerminal className="text-black" />, description: 'Automatisation IT.', website: 'https://www.ansible.com', platforms: ['Linux'], license: 'Open Source' },
    { id: 'terraform', name: 'Terraform', category: 'devops', icon: <FaCloud className="text-purple-600" />, description: 'Infrastructure as Code.', website: 'https://www.terraform.io', platforms: ['all'], license: 'Open Source' },

    // --- Databases ---
    { id: 'dbeaver', name: 'DBeaver', category: 'db', icon: <FaDatabase className="text-brown-500" />, description: 'Outil DB universel.', website: 'https://dbeaver.io', platforms: ['all'], license: 'Open Source' },
    { id: 'mysql', name: 'MySQL', category: 'db', icon: <FaDatabase className="text-blue-500" />, description: 'SGBD Relationnel.', website: 'https://www.mysql.com', platforms: ['all'], license: 'Open Source' },
    { id: 'mariadb', name: 'MariaDB', category: 'db', icon: <FaDatabase className="text-brown-400" />, description: 'SGBD Open Source.', website: 'https://mariadb.org', platforms: ['all'], license: 'Open Source' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'db', icon: <FaDatabase className="text-blue-400" />, description: 'SGBD Avancé.', website: 'https://www.postgresql.org', platforms: ['all'], license: 'Open Source' },
    { id: 'mongodb', name: 'MongoDB', category: 'db', icon: <FaDatabase className="text-green-500" />, description: 'Base NoSQL.', website: 'https://www.mongodb.com', platforms: ['all'], license: 'Open Source' },

    // --- Virtualization ---
    { id: 'virtualbox', name: 'VirtualBox', category: 'virtualization', icon: <FaDesktop className="text-blue-600" />, description: 'Virtualisation x86.', website: 'https://www.virtualbox.org', platforms: ['all'], license: 'Open Source' },
    { id: 'vmware', name: 'VMware Pro', category: 'virtualization', icon: <FaDesktop className="text-gray-600" />, description: 'Virtualisation Pro.', website: 'https://www.vmware.com', platforms: ['Windows', 'Linux'], license: 'Commercial' },
    { id: 'proxmox', name: 'Proxmox VE', category: 'virtualization', icon: <FaServer className="text-orange-500" />, description: 'Plateforme serveur.', website: 'https://www.proxmox.com', platforms: ['Linux'], license: 'Open Source' },
    { id: 'qemu', name: 'QEMU', category: 'virtualization', icon: <FaDesktop className="text-orange-400" />, description: 'Émulateur.', website: 'https://www.qemu.org', platforms: ['Linux'], license: 'Open Source' },
    { id: 'vagrant', name: 'Vagrant', category: 'virtualization', icon: <FaCode className="text-blue-500" />, description: 'Environnements virtuels.', website: 'https://www.vagrantup.com', platforms: ['all'], license: 'Open Source' },

    // --- Monitoring ---
    { id: 'grafana', name: 'Grafana', category: 'monitoring', icon: <FaLaptopMedical className="text-orange-500" />, description: 'Observabilité.', website: 'https://grafana.com', platforms: ['all'], license: 'Open Source' },
    { id: 'zabbix', name: 'Zabbix', category: 'monitoring', icon: <FaLaptopMedical className="text-red-600" />, description: 'Monitoring entreprise.', website: 'https://www.zabbix.com', platforms: ['Linux'], license: 'Open Source' },
    { id: 'nagios', name: 'Nagios', category: 'monitoring', icon: <FaLaptopMedical />, description: 'Surveillance infra.', website: 'https://www.nagios.org', platforms: ['Linux'], license: 'Open Source' },
    { id: 'datadog', name: 'Datadog', category: 'monitoring', icon: <FaLaptopMedical className="text-purple-600" />, description: 'Monitoring Cloud.', website: 'https://www.datadoghq.com', platforms: ['Web'], license: 'Commercial' },

    // --- OS ---
    { id: 'arch', name: 'Arch Linux', category: 'os', icon: <FaLinux className="text-blue-500" />, description: 'Rolling release.', website: 'https://archlinux.org', platforms: ['Linux'], license: 'Open Source' },
    { id: 'debian', name: 'Debian', category: 'os', icon: <FaLinux className="text-red-500" />, description: 'Stable & libre.', website: 'https://www.debian.org', platforms: ['Linux'], license: 'Open Source' },
    { id: 'ubuntu', name: 'Ubuntu', category: 'os', icon: <FaUbuntu className="text-orange-500" />, description: 'Linux pour tous.', website: 'https://ubuntu.com', platforms: ['Linux'], license: 'Open Source' },
    { id: 'windows11', name: 'Windows 11', category: 'os', icon: <FaWindows className="text-blue-500" />, description: 'OS Microsoft.', website: 'https://microsoft.com', platforms: ['Windows'], license: 'Commercial' },
    { id: 'kali', name: 'Kali Linux', category: 'os', icon: <FaTerminal className="text-blue-400" />, description: 'Pentesting.', website: 'https://www.kali.org', platforms: ['Linux'], license: 'Open Source' },

    // --- Security ---
    { id: 'burp', name: 'Burp Suite', category: 'security', icon: <FaBug className="text-orange-500" />, description: 'Sécurité Web.', website: 'https://portswigger.net', platforms: ['all'], license: 'Commercial', sioCompetency: 'Utilisé pour les tests d\'intrusion web dans le cadre du Bloc 3 (Cybersécurité).' },
    { id: 'metasploit', name: 'Metasploit', category: 'security', icon: <FaShieldAlt className="text-blue-600" />, description: 'Penetration testing.', website: 'https://www.metasploit.com', platforms: ['all'], license: 'Open Source', sioCompetency: 'Exploitation de vulnérabilités pour valider des failles critiques (Bloc 3).' },
    { id: 'nessus', name: 'Nessus', category: 'security', icon: <FaShieldAlt className="text-blue-500" />, description: 'Scanner vulnérabilités.', website: 'https://www.tenable.com', platforms: ['all'], license: 'Commercial', sioCompetency: 'Analyse d\'impact et cartographie des vulnérabilités infrastructure (Bloc 3).' },
    { id: 'owasp', name: 'OWASP ZAP', category: 'security', icon: <FaBug className="text-blue-500" />, description: 'Scanner Web.', website: 'https://www.zaproxy.org', platforms: ['all'], license: 'Open Source', sioCompetency: 'Audit automatisé de sécurité applicative (Bloc 3).' },

    // --- Inventory ---
    { id: 'glpi', name: 'GLPI', category: 'inventory', icon: <FaCogs />, description: 'Gestion parc IT.', website: 'https://glpi-project.org', platforms: ['Web'], license: 'Open Source' },
    { id: 'pdqdeploy', name: 'PDQ Deploy', category: 'inventory', icon: <FaTools />, description: 'Déploiement logiciel.', website: 'https://www.pdq.com', platforms: ['Windows'], license: 'Commercial' },

    // --- Docs ---
    { id: 'jira', name: 'Jira', category: 'docs', icon: <FaRegStickyNote className="text-blue-600" />, description: 'Gestion projets.', website: 'https://www.atlassian.com', platforms: ['Web'], license: 'Commercial' },
    { id: 'confluence', name: 'Confluence', category: 'docs', icon: <FaRegStickyNote className="text-blue-500" />, description: 'Wiki entreprise.', website: 'https://www.atlassian.com', platforms: ['Web'], license: 'Commercial' },
    { id: 'notion', name: 'Notion', category: 'docs', icon: <FaRegStickyNote className="text-black" />, description: 'Espace de travail.', website: 'https://www.notion.so', platforms: ['Web'], license: 'Freemium' },
    { id: 'obsidian', name: 'Obsidian', category: 'docs', icon: <FaRegStickyNote className="text-purple-500" />, description: 'Base de connaissances.', website: 'https://obsidian.md', platforms: ['all'], license: 'Free' },

    // --- Communication ---
    { id: 'slack', name: 'Slack', category: 'communication', icon: <FaSlack className="text-purple-500" />, description: 'Messagerie pro.', website: 'https://slack.com', platforms: ['all'], license: 'Commercial' },
    { id: 'teams', name: 'Microsoft Teams', category: 'communication', icon: <FaWindows className="text-blue-600" />, description: 'Collaboration.', website: 'https://teams.microsoft.com', platforms: ['all'], license: 'Commercial' },
    { id: 'discord', name: 'Discord', category: 'communication', icon: <FaDiscord className="text-blue-500" />, description: 'Chat & VoIP.', website: 'https://discord.com', platforms: ['all'], license: 'Free' },

    // --- Utils ---
    { id: 'powertoys', name: 'PowerToys', category: 'utils', icon: <FaWindows className="text-gray-500" />, description: 'Tweaks Windows.', website: 'https://github.com/microsoft/PowerToys', platforms: ['Windows'], license: 'Open Source' },
    { id: 'ohmyzsh', name: 'oh-my-zsh', category: 'utils', icon: <FaTerminal className="text-green-500" />, description: 'Framework ZSH.', website: 'https://ohmyz.sh', platforms: ['Linux', 'macOS'], license: 'Open Source' },
    { id: 'conemu', name: 'ConEmu', category: 'utils', icon: <FaTerminal />, description: 'Émulateur console.', website: 'https://conemu.github.io', platforms: ['Windows'], license: 'Open Source' },

    // --- Compression ---
    { id: '7zip', name: '7-Zip', category: 'compression', icon: <FaFileArchive className="text-green-600" />, description: 'Archiveur libre.', website: 'https://www.7-zip.org', platforms: ['Windows'], license: 'Open Source' },
    { id: 'winrar', name: 'WinRAR', category: 'compression', icon: <FaFileArchive className="text-purple-600" />, description: 'Archiveur.', website: 'https://www.rarlab.com', platforms: ['Windows'], license: 'Commercial' },

    // --- Transfer ---
    { id: 'filezilla', name: 'FileZilla', category: 'transfer', icon: <FaExchangeAlt className="text-red-600" />, description: 'Client FTP.', website: 'https://filezilla-project.org', platforms: ['all'], license: 'Open Source' },
    { id: 'winscp', name: 'WinSCP', category: 'transfer', icon: <FaExchangeAlt className="text-blue-500" />, description: 'SFTP/FTP Windows.', website: 'https://winscp.net', platforms: ['Windows'], license: 'Open Source' },

    // --- Editors ---
    { id: 'sublime', name: 'Sublime Text', category: 'editors', icon: <FaCode className="text-orange-500" />, description: 'Éditeur de texte.', website: 'https://www.sublimetext.com', platforms: ['all'], license: 'Commercial' },
    { id: 'pycharm', name: 'PyCharm', category: 'editors', icon: <FaCode className="text-green-500" />, description: 'Python IDE.', website: 'https://www.jetbrains.com/pycharm', platforms: ['all'], license: 'Proprietary' },
    { id: 'intellij', name: 'IntelliJ IDEA', category: 'editors', icon: <FaCode className="text-blue-600" />, description: 'Java IDE.', website: 'https://www.jetbrains.com/idea', platforms: ['all'], license: 'Proprietary' },
    { id: 'vim', name: 'Vim', category: 'editors', icon: <FaTerminal className="text-green-600" />, description: 'Éditeur modal.', website: 'https://www.vim.org', platforms: ['all'], license: 'Open Source' },

    // --- Cloud ---
    { id: 'aws', name: 'AWS CLI', category: 'cloud', icon: <FaCloud className="text-orange-500" />, description: 'Amazon Web Services.', website: 'https://aws.amazon.com', platforms: ['all'], license: 'Commercial' },
    { id: 'azure', name: 'Azure CLI', category: 'cloud', icon: <FaCloud className="text-blue-500" />, description: 'Microsoft Azure.', website: 'https://azure.microsoft.com', platforms: ['all'], license: 'Commercial' },
    { id: 'gcp', name: 'Google Cloud', category: 'cloud', icon: <FaCloud className="text-blue-400" />, description: 'Google Cloud Platform.', website: 'https://cloud.google.com', platforms: ['all'], license: 'Commercial' },

    // --- Web ---
    { id: 'chrome', name: 'Google Chrome', category: 'web', icon: <FaChrome className="text-blue-500" />, description: 'Navigateur Web.', website: 'https://www.google.com/chrome', platforms: ['all'], license: 'Free' },
    { id: 'firefox', name: 'Firefox Dev', category: 'web', icon: <FaFirefox className="text-orange-500" />, description: 'Navigateur Libre.', website: 'https://www.mozilla.org', platforms: ['all'], license: 'Open Source' },
    { id: 'brave', name: 'Brave', category: 'web', icon: <FaShieldAlt className="text-orange-600" />, description: 'Navigateur privé.', website: 'https://brave.com', platforms: ['all'], license: 'Open Source' },
    { id: 'tor', name: 'Tor Browser', category: 'web', icon: <FaShieldAlt className="text-purple-600" />, description: 'Confidentialité.', website: 'https://www.torproject.org', platforms: ['all'], license: 'Open Source' },
];
