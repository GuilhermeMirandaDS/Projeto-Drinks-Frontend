<template>
    <footer>
        <div class="col-md-2">
            <router-link to="/">
                <img class="logo-page" src="../assets/logos/logo.ico" alt="Drinks">
            </router-link>
        </div>

        <div class="col-md-3 logos">
            <img src="/public/assets/icons/vuejs.png" alt="Vue.js">
            <img src="/public/assets/icons/typescript.png" alt="Typescript">
        </div>

        <div class="col-md-3">
            <a href="https://www.thecocktaildb.com/api.php" class="logo-api">
                <img src="../assets/logos/logo-api.png" alt="The Cocktail DB">
            </a>
            <div class="footer-content">
                <span>This project are using a free API data named "The Cocktail DB"</span>
                <span>Developed by <a href="https://github.com/GuilhermeMirandaDS/Projeto-Drinks-Frontend">Guilherme Miranda</a></span>
            </div>
        </div>
    </footer>
</template>