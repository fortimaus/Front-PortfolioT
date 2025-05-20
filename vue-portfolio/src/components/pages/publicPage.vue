<template>
<div v-if="unexistUser">
    <div class="not-found-wrapper">
    <div class="illustration mb-4">
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#E9ECEF"/>
        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#E9ECEF"/>
        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#6C757D" stroke-width="2"/>
        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" stroke="#6C757D" stroke-width="2"/>
        <path d="M18 6L22 2M22 6L18 2" stroke="#DC3545" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <h2 class="text-center mb-3">Пользователь не найден</h2>
    <p class="text-center text-muted mb-4">
      Возможно, был введен неверный ID или пользователь был удален.
    </p>
    <div class="d-flex justify-content-center">
    </div>
  </div>
</div>
<div v-else>
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
        </section>
        <section class="protfolio d-grid gap-4">
            <h1>Портфолио</h1>
            <div class="d-grid gap-4">
                <div v-if="this.repos.length > 0"  class="container repos py-4">
                <h2>Репозитории</h2>                
                <div class="row">
                    <div class="col-md-3 " v-for="repo in repos" v-bind:key="repo.id" >
                            <BasicCard
                            :title="repo.title"
                            :desc="repo.description"
                            :preview="repo.preview"
                            @showInfo="showRepoInfo(repo)"
                            >
                            </BasicCard>
                            <br>
                    </div>
                </div>
            </div>
            <div v-if="this.articles.length > 0"  class="container articles py-4">
                <h2>Статьи</h2>             
                <div class="row">
                    <div class="col-md-3" v-for="article in articles" v-bind:key="article.id" >
                            <BasicCard
                            :title="article.title"
                            :desc="article.words"
                            :preview="article.preview"
                            @showInfo="showArticleInfo(article)"
                            >
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
                            </BasicCard>
                            <br>
                    </div>
                    
                    
                </div>
            </div>
            
            </div>
            
        </section>
    </div>
    <AchievementViewModal 
      ref="achievementViewModal"
      :achievementData="currentAchievement"
    />
    <spinner ref="spin"></spinner>
</template>
<script>
import AchievementService from '../../services/AchievementService';
import UserService from '../../services/UserService';
import RepoService from '@/services/RepoService';
import ArticleService from '@/services/ArticleService';

import BasicCard from '../cards/BasicCard.vue'
import AchievementViewModal from '../modals/AchievementViewModal.vue'
import spinner from '../spinner.vue';
import AvatarWithStatus from '../elements/AvatarWithStatus.vue'

export default {
    name: "publicPage",
    components: {
    BasicCard,
    AchievementViewModal,
    spinner,

    AvatarWithStatus,
    },
    async created(){
        let login = window.location.pathname.replace("/","")
        await UserService.getByLogin(login)
        .then(response => {
            if(!response.data.id)
                this.unexistUser = true
            this.userId = response.data.id
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
            this.unexistUser = true
            console.log(error)
        })
        await this.getInfo()
    },
    data() {
      return {
        statuses: ['unverified', 'verified', 'warning', 'error'],
        userId: -1,
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
        unexistUser: false, 
        currentAchievement: {
            title: '',
            description: '',
            link: null,
            additionalInfo: null,
            images: []
        },
        
      };
    },
    methods: {
        exit(){
            localStorage.clear();
            this.$router.push('/login');
        },
        async generateAll(){
            this.$refs.spin.show = true
            await AchievementService.generate(this.userId)
            .then(response => {
                console.log(response.data);
                this.getInfo()
            }).catch(e => {
                alert("Произошла ошибка: " + e.status)
                console.log(e)
          })
        },
        async getRepos(){
            await RepoService.getbyUser(this.userId)
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
        async getArticles(){
            await ArticleService.getbyUser(this.userId)
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
            await AchievementService.getbyUser(this.userId)
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
.not-found-wrapper {
  padding: 3rem 1rem;
  text-align: center;
}

.illustration {
  opacity: 0.7;
}

.btn-link {
  color: #0d6efd;
  transition: all 0.2s ease;
}

.btn-link:hover {
  color: #0a58ca;
  transform: translateY(-1px);
}
</style>
