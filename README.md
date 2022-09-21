<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ElisaGDev/P7_Groupomania">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Groupomania</h3>

  <p align="center">
    Projet 7 du parcours Développeur Web d'Openclassrooms - Groupomania
    <br />
    <a href="https://github.com/ElisaGDev/P7_Groupomania"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ElisaGDev/P7_Groupomania">View Demo</a>
    ·
    <a href="https://github.com/ElisaGDev/P7_Groupomania/issues">Report Bug</a>
    ·
    <a href="https://github.com/ElisaGDev/P7_Groupomania/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">A propos du projet</a>
      <ul>
        <li><a href="#développé-avec">Développé avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#Commencement">Commencer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- A propos du projet -->
## A propos du projet
[![Product Name Screen Shot][product-screenshot]](https://example.com)

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>



### Développé avec

* [![Nodejs][Nodejs.com]][Nodejs-url]
* [![Express][Express.com]][Express-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![React-Bootstrap][React-Bootstrap.com]][React-Bootstrap-url]
* [![Sass][Sass.com]][Sass-url]

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>



<!-- COMMENCEMENT -->
## Commencement

Pour installer le projet sur votre machine, suivez les instructions suivantes:

### Prérequis

* Node JS version

### Installation

1. Clonez ce repo
   ```sh
   git clone https://github.com/ElisaGDev/P7_Groupomania.git
   ```
2. Ouvrez un terminal à la racine du projet et entrez les commandes suivantes:
   ```sh
   cd Backend
   npm install
   npm start
   ```
3. Ouvrez un terminal à la racine du projet et entrez les commandes suivantes:
   ```sh
   cd client
   npm install
   npm start
   ```
4. Mettez vos informations de cluster dans /config/db.js Créez le fichier .env dans /config/ ajouter les donner suivante :
   ```sh
   PORT= votre port localhost pour votre Back-end(exemple 5000)
   PORT_FRONT = votre port localhost pour votre Front-end (exemple 3000)
   FRONT_END_URL=http://localhost:3000 votre URL Front-end
   DB_USER_PASS= votre identifiant et mot de passe mongoDB
   TOKEN_SECRET=990bf68e6adf1be5f1671bba3bec692056922454 votre clé secrète aléatoire
   ```
 5. Créez un fichier .env :
    ```sh
    REACT_APP_API_URL=http://localhost:5000/ l'url de Back-end
    ```
Le projet devrait se alncer sur l'adresse : http://localhost:3000

<p align="right">(<a href="#readme-top">retour en haut</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.dev/en/
[Express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/fr/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/

