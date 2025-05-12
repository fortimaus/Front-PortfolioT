<template>
    <div>
            <section class="section">
                <div class="container-fliud">
                    <img alt="Vue logo" class="rounded-circle" src="https://steamuserimages-a.akamaihd.net/ugc/1850441034546533898/E0288B8E3C65CF168B615971D2372B0C9B94099E/">
                    <h1>{{ this.login }}</h1>
                    <p>{{ this.about }}
                    </p>
                </div>
            </section>
            <section class="protfolio">
                <h1>Портфолио</h1>
                
                <div class="container">
                    <h2>Репозитории</h2>
                    <div class="row">
                        <div class="col-md-4" v-for="(repo, index) in repos" v-bind:key="index" >
                                <div class="card">
                                    <div class="card-head" @click.self="showRinfo(index)">
                                        <img alt="Vue logo"
                                          class="rounded-circle img-custome" 
                                            src="https://avatars.mds.yandex.net/i?id=a0c8645964d71bc6fc1219abcba241d4_l-5306514-images-thumbs&n=13">
                                        <h3>{{ repo.title }}</h3>
                                    </div>
                                    <hr>
                                    <div class="card-body">
                                        <p>
                                            {{ repo.description }}
                                        </p>
                              
                                    </div>
                                </div>
                                <br>
                        </div>
                        
                        
                    </div>
                </div>
                <div class="container">
                    <h2>Статьи</h2>
                    <div class="row">
                        <div class="col-md-4" v-for="(article, index) in articles" v-bind:key="index" >
                                <div class="card">
                                    <div class="card-head" @click.self="showAinfo(index)">
                                        <img alt="Vue logo"
                                          class="rounded-circle img-custome" 
                                            src="https://vladimir.ruc.su/upload/medialibrary/34d/jn2101ssism0gvf91k1z8x3wjybnzoak.jpg">
                                        <h3>{{ article.title }}</h3>
                                    </div>
                                    <hr>
                                    <div class="card-body">
                                        <p>
                                            {{ article.words }}
                                        </p>
                                    </div>
                                </div>
                                <br>
                        </div>
                        
                        
                    </div>
                </div>
    
                <div class="container">
                    <h2>Личные достижения</h2>
                    <div class="row">
                        <div class="col-md-4" v-for="(ach, index) in achievements" v-bind:key="index" >
                                <div class="card">
                                    <div class="card-head" @click.self="showAinfo(index)">
                                        <img alt="Vue logo"
                                          class="rounded-circle img-custome" 
                                            src="https://www.pngplay.com/wp-content/uploads/12/Award-Cup-Download-Free-PNG.png">
                                        <h3>{{ ach.title }}</h3>
                                    </div>
                                    <hr>
                                    <div class="card-body">
                                        <p>
                                            {{ ach.desc }}
                                        </p>
                                    </div>
                                </div>
                                <br>
                        </div>
                        
                        
                    </div>
                </div>
                
            </section>
        </div>
        <showUpdate ref="artUp" @close="updateArt"></showUpdate>
        <showUpdate ref="repoUp" @close="updateRepo"></showUpdate>
        <showUpdate ref="createAch" @close="createNew"></showUpdate>
        <achInfo ref="info"></achInfo>
        <userUpdate ref="userUpdate" @close="updUser"></userUpdate>
    </template>
    <script>
    import AchievementService from '../../services/AchievementService';
    import showUpdate from '../modals/showUpdate.vue'
    import achInfo from '../cards/achInfo.vue'
    import userUpdate from '../modals/userUpdate.vue';
    export default {
        name: "achs-list",
        components: {
        showUpdate,
        achInfo,
        userUpdate
    },
        data() {
          return {
            repos:[],
            testRepos: [
            {
              "title": "LinuxCore",
              "description": "Веб-приложение для хранения и работы с информацией о колоколах, хранящихся в храмах Ульяновской области",
              "link": "https://github.com/fortimaus/ZVON73",
              "language": null,
              "scope_for_decor": 5,
              "scope_for_code": 70,
              "scope_bonus": 0,
              "comments": "Добавить README \n\n\n"
            },
            {
              "title": "Naumnko_IVT-32",
              "description": "Десктопное приложение для автомастерской",
              "link": "https://git.is.ulstu.ru/VoldemarProger/Pibd-22_Morozov_V.S_AutomobilePlant",
              "language": "C#",
              "scope_for_decor": 3.98,
              "scope_for_code": 70,
              "scope_bonus": 0,
              "comments": "Добавить README \nДобавить краткое описание проекта\n\n"
            },
            ],
            articles: [],
            testArts: [
             {
               "title": "   Государственное управление как ключевое звено в социально-экономическом развитии ",
               "authors": "Авторы: Романов, В. Н.",
               "link": "http://venec.ulstu.ru/lib/disk/2016/16.pdf ",
               "desc": " Власть, бизнес, бизнес-образование: интеграция на пути модернизации : материалы II международной научно-практической конференции (7 апр.). - Ульяновск : УлГТУ, 2011. - С. 300-304. - Библиогр.: 2 назв. - Текст :. - электронный.",
               "words": "Ключевые слова: государственное управление, материалы конференций, научно-практические конференции, социально-экономическое развитие, экономический рост, электронные ресурсы",
               "scope": 100
             }
        ],
            achievements: [],
            ulstu: "Naumenko",
            gitHub: "fortimaus",
            elib: "Романов-2020-2023",
            about: 'Студент-программист, пишу ядра для Linux, хорошо разбрираюсь в Unity',
            login: 'umenko',
            currentArt : -1,
            currentRepo : -1
          };
        },
        created(){
            this.repos = this.testRepos
            this.articles = this.testArts
        },
        methods: {
            getAll(){
                AchievementService.getRepos(this.ulstu,this.gitHub)
                .then(response => {
                    this.repos = response.data;
                    console.log(response.data);
                }).catch(e => {
                console.log(e);
                this.repos = this.testRepos
              })
              AchievementService.getArticles(this.elib)
              .then(response => {
                    this.articles = response.data;
                    console.log(response.data);
                }).catch(e => {
                console.log(e);
                this.articles = this.testArts
              })
            },
            showRinfo(id){
                this.$refs.info.show = true;
                    this.$refs.info.title = this.repos[id].title
                    this.$refs.info.link =  this.repos[id].link
                    this.$refs.info.desc =  this.repos[id].description
                    this.$refs.info.extra =  ''
            },
            showAinfo(id){
                this.$refs.info.show = true;
                    this.$refs.info.title = this.articles[id].title
                    this.$refs.info.link =  this.articles[id].link
                    this.$refs.info.desc =  this.articles[id].desc
                    this.$refs.info.extra =  this.articles[id].words
                    this.$refs.info.repo = false
            },
            showRepo(id) {
                    console.log(id)
                    this.currentRepo = id
                    this.$refs.repoUp.show = true;
                    this.$refs.repoUp.title = this.repos[id].title
                    this.$refs.repoUp.link =  this.repos[id].link
                    this.$refs.repoUp.desc =  this.repos[id].description
                    this.$refs.repoUp.extra =  this.repos[id].language
                    this.$refs.repoUp.comments = this.repos[id].comments
                    this.$refs.repoUp.scope =  this.repos[id].scope_for_decor + this.repos[id].scope_for_code + this.repos[id].scope_bonus
                },
    
          updateRepo(){
                    this.$refs.repoUp.show = false;
                    this.repos[this.currentRepo].title = this.$refs.repoUp.title
                    this.repos[this.currentRepo].link = this.$refs.repoUp.link 
                    this.repos[this.currentRepo].desc = this.$refs.repoUp.description
                    this.currentRepo = -1
                    
    
          },
          showArt(id) {
                    console.log(id)
                    this.currentArt = id
                    this.$refs.artUp.show = true;
                    this.$refs.artUp.title = this.articles[id].title
                    this.$refs.artUp.link =  this.articles[id].link
                    this.$refs.artUp.desc =  this.articles[id].desc
                    this.$refs.artUp.extra =  this.articles[id].words
                },
    
          updateArt(){
                    this.$refs.artUp.show = false;
                    this.articles[this.currentArt].title = this.$refs.artUp.title
                    this.articles[this.currentArt].link = this.$refs.artUp.link 
                    this.articles[this.currentArt].desc = this.$refs.artUp.desc
                    this.articles[this.currentArt].extra = this.$refs.artUp.extra
                    this.currentArt = -1
                    
    
          },
          showCreate(){
            this.$refs.createAch.show = true;
          },
          createNew(){
                        this.$refs.createAch.show = false;
                        let newAch = {
                            title: this.$refs.createAch.title,
                            link: this.$refs.createAch.link,
                            extra: this.$refs.createAch.extra,
                            desc: this.$refs.createAch.desc,
                        }
                        this.achievements.push(newAch)
                        this.$refs.createAch.title = ''
                        this.$refs.createAch.link = ''
                        this.$refs.createAch.extra = ''
                        this.$refs.createAch.desc = ''
        
                       
        
              },
            deleteRepo(id){
                this.repos.splice(id,1)
            },
            deleteArt(id){
                this.articles.splice(id,1)
            },
            deleteAch(id){
                this.achievements.splice(id,1)
            },
            updUser(){
                this.$refs.userUpdate.show = false;
                    this.login = this.$refs.userUpdate.login
                    this.about = this.$refs.userUpdate.about 
                    this.ulstu = this.$refs.userUpdate.ulstu
                    this.gitHub = this.$refs.userUpdate.gitHub
                    this.elib = this.$refs.userUpdate.elib
            },
            showUser(){
                this.$refs.userUpdate.show = true;
            }
        },
    }
    </script>
    <style lang="css" scoped>
        .section{
            padding-top: 10%;
            padding-bottom: 10%;
        }
        .rounded-circle{
            height: 15%;
            width: 15%;
        }
        .protfolio{
            background-color: #34345238;
            padding-top: 8%;
            padding-bottom: 15%;
            /* padding:15% */
        }
        .img-custome{
            width: 140px;
            height: 140px;
            margin-top: 15px;
        }
    </style>