<template>
<nav class="navbar px-4 navbar-expand-lg navbar-dark bg-dark text-center" >
        <router-link to="/" class="navbar-brand">
            <div class="logo-container text-center">
                <span class="logo-text">Portfolio<span class="logo-highlight">T</span></span>
            </div>
        </router-link>
        <div class="container-fluid">
            <div class="navbar-nav mr-auto ">
                <li class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/main')">Главная</a>
                </li>
                <li v-if="isAdmin || isModerator" class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/status')">Панель модератора</a>
                </li>
                <li v-if="isAdmin" class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/roles')">Панель админа</a>
                </li>
            </div>
          <div class="d-flex navbar-brand">
            <button type="button" class="btn btn-light" @click="exit()">Выйти</button>
        </div>
        </div>
      </nav>
<div>
    <div class="row m-3 gap-2">
        <button class="col btn btn-outline-primary" @click="showSettings()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
            Настройки
        </button>
        <button class="col btn btn-outline-primary" @click="showMessages()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-dots" viewBox="0 0 16 16">
                  <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            Сообщения
        </button>
        <button class="col btn btn-outline-primary" @click="showUserStatsModal()"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
              <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
            </svg>
            Статистика 
        </button>
        <button class="col btn btn-outline-primary" @click="showUserList()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
            </svg>
            Пользователи
        </button>
    </div>
        <section class="section">
            <AvatarWithStatus 
            :avatar-url="avatar"
            :username="login"
            :status="status"
            size="xl"
          />
            <div class="container-fliud">
                <h1>{{ this.login }}</h1>
                <h5>{{ this.about }}</h5>            
            </div>
            <div class="d-flex justify-content-center gap-3">
            </div>

        </section>
        <section class="protfolio d-grid gap-4">
            <h1>Портфолио</h1>
            <div class="d-grid mx-4 gap-4">

                <button type="button" class="btn p-2 btn-primary" @click="generateAll()">
                Собрать из всех источников</button>
                <button type="button" class="btn p-2 btn-success" @click="showAchievementModal">
                    Добавить личное достижение</button>
            </div>
            <div class="d-grid gap-4">
                <div v-if="this.repos.length > 0"  class="container repos py-4">
                <h2>Репозитории</h2>
                
                <div class="row gap-2 m-5">
                    <div class="btn-group col">
                      <button class="btn btn-info col" type="button" @click="generateRepos()">
                        Обновить все
                      </button>
                      <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                          <span class="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownRepos" >
                        <li v-for="option in this.repoServices" :key="option.id">
                          <a class=" dropdown-item px-5" @click="generateRepoService(option.id)">Обновить сервис {{option.title}}</a>
                        </li>
                      </ul>
                    </div>
                    <button class="btn btn-light col" type="button" @click="showCompareModal">Сравнить</button>
                </div>
                
                <div class="row">
                    <div class="col-md-3 " v-for="repo in repos" v-bind:key="repo.id" >
                            <BasicCard
                            :title="repo.title"
                            :desc="repo.description"
                            :preview="repo.preview"
                            @showInfo="showRepoInfo(repo)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showRepoUpdateModal(repo.id)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-outline-info" @click="showRatingModal(repo.id)">
                                        Подробности
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteRepo(repo.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                </div>
            </div>
            <div v-if="this.articles.length > 0"  class="container articles py-4">
                <h2>Статьи</h2>
                <div class="row gap-2 m-5">
                    <div class="btn-group col">
                      <button class="btn btn-info col" type="button" @click="generateArticles()">
                        Обновить все
                      </button>
                      <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                          <span class="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownRepos" >
                        <li v-for="option in this.articleServices" :key="option.id">
                          <a class=" dropdown-item px-5" @click="generateArticleService(option.id)">Обновить сервис {{option.title}}</a>
                        </li>
                      </ul>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-3" v-for="article in articles" v-bind:key="article.id" >
                            <BasicCard
                            :title="article.title"
                            :desc="article.words"
                            :preview="article.preview"
                            @showInfo="showArticleInfo(article)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showArticleUpdateModal(article.id)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteArticle(article.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                </div>
            </div>

            <div v-if="this.achievements.length > 0" class="container achs py-4">
                <h2>Личные достижения</h2>
                <div class="row">
                    <div class="col-md-3 " v-for="ach in achievements" v-bind:key="ach.id" >
                            <BasicCard
                            :title="ach.title"
                            :desc="ach.description"
                            :preview="ach.preview"
                            @showInfo="showAchievementInfo(ach)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showAchUpdateModal(ach.id)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteAch(ach.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                    
                </div>
            </div>
            
            </div>
            
        </section>
    </div>
    <AchievementModal 
      ref="achievementModal"
      @achievement-created="getAchievements"
    />
    <AchievementViewModal 
      ref="achievementViewModal"
      :achievementData="currentAchievement"
    />
    <UpdateRepoModal 
      ref="updateRepoModal"
      @repo-update="getRepos"
    />
    <UpdateArticleModal 
      ref="updateArticleModal"
      @artcile-update="getArticles"
    />
    <UpdateAchModal 
      ref="updateAchModal"
      @ach-update="getAchievements"
    />
    <RepoUpdateServiceModal
        ref="repoUpdateServiceModal"
        @repo-service="generateRepoService"
    />
    <RepositoryRatingModal 
      ref="ratingModal"
    />
    <UserStatsModal 
      ref="statsModal"
    />
    <MessagesModal 
      ref="messagesModal"
    />
    <SettingsModal 
        ref="settingsModal"
    />
    <UserRatingModal
        ref="userRatingModal"
        />
    <CompareUsersModal ref="compareModal" />
    <userUpdate ref="userUpdate" @close="updUser"></userUpdate>
    <user_list ref="listUs"></user_list>
    <spinner ref="spin"></spinner>
</template>
<script>
import AchievementService from '../../services/AchievementService';
import UserService from '../../services/UserService';
import RepoService from '@/services/RepoService';
import ArticleService from '@/services/ArticleService';
import LinkService from '@/services/LinkService';

import BasicCard from '../cards/BasicCard.vue'
import AchievementModal from '../modals/AchievementModal.vue'
import AchievementViewModal from '../modals/AchievementViewModal.vue'
import UpdateRepoModal from '../modals/UpdateRepoModal.vue';
import UpdateArticleModal from '../modals/UpdateArticleModal.vue';
import UpdateAchModal from '../modals/UpdateAchModal.vue';
import CompareUsersModal from '../modals/CompareUsersModal.vue'
import RepositoryRatingModal from '../modals/RepositoryRatingModal.vue'
import UserStatsModal from '../modals/UserStatsModal.vue'
import MessagesModal from '../modals/MessageModal.vue'
import SettingsModal from '../modals/SettingsModal.vue';
import AvatarWithStatus from '../elements/AvatarWithStatus.vue'
import UserRatingModal from '../modals/UserRatingModal.vue';

import spinner from '../spinner.vue';
export default {
    name: "achs-list",
    components: {
    BasicCard,
    AchievementModal,
    AchievementViewModal,
    UpdateRepoModal,
    UpdateArticleModal,
    UpdateAchModal,
    CompareUsersModal,
    RepositoryRatingModal,
    UserStatsModal,
    MessagesModal,
    SettingsModal,
    UserRatingModal,

    AvatarWithStatus,

    spinner
    },
    beforeCreate() {
        if (localStorage.getItem("token") == null) {
            this.$router.push("/login");
        }
    },
    async created(){
        await UserService.get(localStorage.getItem('user'))
        .then(response => {
            this.login = response.data.login;
            this.about = response.data.about;
            this.status = this.statuses[response.data.status]
            if(response.data.preview == null)
                this.avatar = "https://ds4-sosnovoborsk-r04.gosweb.gosuslugi.ru/netcat_files/21/10/blankdirectory_3.png"
            else
            {
                this.avatar = `data:image/png;base64,${response.data.preview}`;
            }       
        })
        .catch(error =>{
            console.log(error)
            alert("Ваш токен устарел")
            this.$router.push("/login");
        })
        let role = this.parseJwt();
        if(role == "Admin")
            this.isAdmin = true;
        if(role == "Moderator")
            this.isModerator = true
        await this.getInfo()
        await this.getRepoService()
        await this.getArticleService()
    },
    data() {
      return {
        statuses: ['unverified', 'verified', 'warning', 'error'],
        login: null,
        about: null,
        avatar: null,
        status:0,
        default_image_repo: "https://camo.githubusercontent.com/4e748a1a647da2caf4aa61d6b8f73ecd34af304ca94b4542d606b37dcaf72ccb/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6769742d69636f6e2e737667",
        default_image_article: "https://sun1-25.userapi.com/s/v1/ig2/-Cx7oKn0kXnxtusDrlNwcMK2jPQt0T2x7p5ysmpsyEfTPDJgK3YopmTiD5ntLlKBWx3kXOY-7K_3hNF3y8BWJ1wK.jpg?size=1067x1067&quality=95&crop=0,0,1067,1067&ava=1",
        default_image_ach: "https://vimk.ddu2.minskedu.gov.by/files/01268/obj/110/37623/img/unnamed_1.jpg",
        repos:[],
        articles: [],
        achievements: [],

        currentAchievement: {
            title: '',
            description: '',
            link: null,
            additionalInfo: null,
            images: []
        },
        repoServices:[],
        articleServices:[],
        isAdmin: false,
        isModerator: false,
      };
    },
    methods: {
        parseJwt () {
        var base64Url = localStorage.getItem('token').split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(jsonPayload)
        let role = jsonPayload.replace("http://schemas.microsoft.com/ws/2008/06/identity/claims/", "")
        let json = JSON.parse(role)
        console.log(json)
        return json.role;
        },
        exit(){
            localStorage.clear();
            this.$router.push('/login');
        },
        async generateAll(){
            this.$refs.spin.show = true
            await AchievementService.generate(localStorage.getItem('user'))
            .then(response => {
                console.log(response.data);
                this.getInfo()
            }).catch(e => {
                alert("Произошла ошибка: " + e.status)
                console.log(e)
          })
        },
        async getRepos(){
            await RepoService.getbyUser(localStorage.getItem('user'))
            .then(response => {
                this.repos = [];
                response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_repo
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    this.repos.push(element)
                })
            })
            .catch(e =>{
              console.log("Repos: " + e)
            })
        },
        async getRepoService(){
            await LinkService.getTypes(1)
                .then(response => {
                    console.log(response.data)
                    this.repoServices = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getArticleService(){
            await LinkService.getTypes(2)
                .then(response => {
                    console.log(response.data)
                    this.articleServices = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getArticles(){
            await ArticleService.getbyUser(localStorage.getItem('user'))
            .then(response => {
                this.articles = []
                response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_article
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    
                    this.articles.push(element)
                })
            })
            .catch(error => console.log("Articles: " + error))
        },
        async getAchievements(){
            await AchievementService.getbyUser(localStorage.getItem('user'))
                .then(response => {
                    this.achievements = []
                    response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_ach
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    
                    this.achievements.push(element)
                })
                })
                .catch(error => console.log("Ach: " + error))
        },
        async getInfo(){
            await this.getAchievements();
            await this.getRepos();
            await this.getArticles();
            this.$refs.spin.closeModal();
        },
        async generateRepos(){
            this.$refs.spin.show = true
            await RepoService.generate(localStorage.getItem('user'))
            .then(response => {
                console.log(response)
                this.getRepos();
                this.$refs.spin.closeModal()
            })
            .catch(error => {
                this.$refs.spin.closeModal()
                console.log(error)
                alert("Произошла ошибка")
            })
        },
        async generateArticles(){
            this.$refs.spin.show = true
            await ArticleService.generate(localStorage.getItem('user'))
            .then(response => {
                console.log(response)
                this.getArticles();
                this.$refs.spin.closeModal()
            })
            .catch(error => {
                this.$refs.spin.closeModal()
                console.log(error)
                alert("Произошла ошибка")
            })
        },
        async generateRepoService(id){
            this.$refs.spin.show = true
            await RepoService.generateService(localStorage.getItem('user'),id)
            .then(response => {
                console.log(response)
                this.getRepos();
                this.$refs.spin.closeModal()
            })
            .catch(error =>{
                this.$refs.spin.closeModal()
                console.log(error)
                alert("Произошла ошибка")
            })
        },
        async generateArticleService(id){
            this.$refs.spin.show = true
            await ArticleService.generateService(localStorage.getItem('user'),id)
            .then(response => {
                console.log(response)
                this.getArticles();
                this.$refs.spin.closeModal()
            })
            .catch(error =>{
                this.$refs.spin.closeModal()
                console.log(error)
                alert("Произошла ошибка")
            })
        },
        showAchievementModal() {
          this.$refs.achievementModal.show()
        },
        showRepoUpdateModal(id) {
          this.$refs.updateRepoModal.show(id)
        },
        showArticleUpdateModal(id) {
          this.$refs.updateArticleModal.show(id)
        },
        showAchUpdateModal(id) {
          this.$refs.updateAchModal.show(id)
        },
        showCompareModal() {
          this.$refs.compareModal.show()
        },
        showRatingModal(id) {
            this.$refs.ratingModal.show(id)
        },
        showUserStatsModal() {
            this.$refs.statsModal.show(localStorage.getItem('user'))
        },
        showMessages() {
            this.$refs.messagesModal.show(localStorage.getItem('user'))
        },
        showSettings() {
            this.$refs.settingsModal.show()
        },
        showUserList() {
            this.$refs.userRatingModal.show()
        },
        async deleteRepo(id){
            await RepoService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getRepos();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        async deleteArticle(id){
            await ArticleService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getArticles();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        async deleteAch(id){
            await AchievementService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getAchievements();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        refactorImages(images){
            let res = [];
            console.log(images)
            if(images && images.length > 0)
            {
                
                images.forEach(element =>{
                    console.log(element)
                    res.push(`data:image/png;base64,${element.image}`);
                })
                
            }
            return res
        },
        showRepoInfo(repo){
            let images = this.refactorImages(repo.images)
            let curAch = {
            title: repo.title,
            description: repo.description,
            link: repo.link ? repo.link : null,
            additionalInfo: repo.language && repo.language.length > 0 ? "Язык программирования" + repo.language : null,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        showArticleInfo(article){
            let images = this.refactorImages(article.images)
            let curAch = {
            title: article.title,
            description: article.description,
            link: article.link ? article.link : null,
            additionalInfo: article.words,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        showAchievementInfo(ach){
            let images = this.refactorImages(ach.images)
            console.log(images)
            let curAch = {
            title: ach.title,
            description: ach.description,
            link: ach.link ? ach.link : null,
            additionalInfo: null,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        
        
    },
}
</script>
<style lang="css" scoped>
    .logo-text {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
      }

    .logo-highlight {
        color: #42b983;
    }
    .section{
        padding-top: 10%;
        padding-bottom: 10%;
    }

    .protfolio{
        border-top: 1rem solid #d3d3d3;
        background-color: #b4b4bd17;
        padding-top: 8%;
        padding-bottom: 10%;
        /* padding:15% */
    }
    .img-custome{
        width: 140px;
        height: 140px;
        margin-top: 15px;
    }
    .container{
        box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
        border-width:100%;
        border-radius: 10px;
    }
    .repos {
        background-color: #c1ccff;
    }
    .articles {
        background-color: #d8ffd8;
    }
    .achs {
        background-color: #ffe1bb;
    }

</style>
