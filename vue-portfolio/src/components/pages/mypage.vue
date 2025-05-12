<template>

    <div>
            <section class="section">
                <div class="container-fliud">
                    <img alt="Vue logo" class="rounded-circle" 
                        src="https://yt3.googleusercontent.com/ytc/AOPolaQeEafuIo0HVYJyVTOCREXTnM6L497UXCBhi5kL=s900-c-k-c0x00ffffff-no-rj">
                    <h1>{{ this.login }}</h1>
                    <h2>{{ this.about }}</h2>
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
        <user_list ref="listUs"></user_list>
    </template>
    <script>
    import AchievementService from '../../services/AchievementService';
    import showUpdate from '../modals/showUpdate.vue'
    import achInfo from '../cards/achInfo.vue'
    import userUpdate from '../modals/userUpdate.vue';
    import user_list from '../modals/user_list.vue';
    export default {
        name: "achs-list",
        components: {
        showUpdate,
        achInfo,
        userUpdate,
        user_list
    },
        data() {
          return {
            repos:[],
            testRepos: [
            {
                title: "ZVON73",
                description: "Веб-приложение для хранения и работы с информацией о колоколах, хранящихся в храмах Ульяновской области",
                link: "https://github.com/fortimaus/ZVON73",
                language: null,
                scope_for_decor: 5,
                scope_for_code: 70,
                scope_bonus: 0,
                comments: "Добавить README \n\n\n"
            },
            {
                title: "Pibd-22_Morozov_V.S_AirplaneWithRadar_Base",
                description: "Лабораторные работы по предмету ООП",
                link: "https://git.is.ulstu.ru/VoldemarProger/Pibd-22_Morozov_V.S_AirplaneWithRadar_Base",
                language: "C#",
                scope_for_decor: 12.98,
                scope_for_code: 70,
                scope_bonus: 10.89,
                comments: "Добавить README \n\n\n"
            },
            {
                title: "Pibd-22_Morozov_V.S_AirplaneWithRadar_Hard",
                description: "Лабораторные работы по ООП. Тема: самолет с радаром.",
                link: "https://git.is.ulstu.ru/VoldemarProger/Pibd-22_Morozov_V.S_AirplaneWithRadar_Hard",
                language: "Java",
                scope_for_decor: 21.25,
                scope_for_code: 58.31,
                scope_bonus: 0,
                comments: "Добавить README \n\n\nПроблемы с надежностью"
            },
            {
                title: "Pibd-22_Morozov_V.S_AutomobilePlant",
                description: "Десктопное приложение для автомастерской",
                link: "https://git.is.ulstu.ru/VoldemarProger/Pibd-22_Morozov_V.S_AutomobilePlant",
                language: "C#",
                scope_for_decor: 3.98,
                scope_for_code: 70,
                scope_bonus: 0,
                comments: "Добавить README \nДобавить краткое описание проекта\n\n"
            },
            {
                title: "Pibd-22_Morozov_V.S._IP",
                description: "Лабораторные работы по предмету ИП. Тема: сайт для блоггеров ",
                link: "https://git.is.ulstu.ru/VoldemarProger/Pibd-22_Morozov_V.S._IP",
                language: "Java",
                scope_for_decor: 10.06,
                scope_for_code: 70,
                scope_bonus: 0,
                comments: "Добавить README \n\n\n"
            },
            {
                title: "PutBit",
                description: "Курсовой проект по предмету КПО. Тема: Сайт для абитуриентов ",
                link: "https://git.is.ulstu.ru/VoldemarProger/PutBit",
                language: "Java",
                scope_for_decor: 25.33,
                scope_for_code: 40.81,
                scope_bonus: 0,
                comments: "Проблемы с безопасностью\nПроблемы с переиспользованием\n"
            }
            ],
            articles: [],
            testArts: [
                {
                    title: "   Факторы, влияющие на формирование корпоративной культуры ",
                    authors: "Авторы: Романова, О. В.",
                    link: "http://lib.ulstu.ru/venec/disk/2016/216.pdf",
                    desc: " Управление развитием социально-экономических систем : сборник научных трудов. - Ульяновск : УлГТУ, 2016. - С. 75-80. - Текст :. - электронный.",
                    words: "Ключевые слова: корпоративная культура, методы изучения, сборники научных трудов, функционирование организации, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Технология переработки макулатуры ",
                    authors: "Авторы: Романов, С. Н., Леушкин, П. Н., Ваганова, Е. С.",
                    link: "http://venec.ulstu.ru/lib/disk/2021/84.pdf",
                    desc: " Актуальные проблемы техносферной безопасности : сборник научных трудов III международной научно-практической конференции студентов, аспирантов, молодых ученых, преподавателей (3 июня). - Ульяновск : УлГТУ, 2021. - С. 119-120. - Библиогр: 3 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: гидроразбиватели, макулатура, международные научно-практические конференции, переработка макулатуры, сборники научных трудов, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Согласованность и эффективность в управлении с социальными системами ",
                    authors: "Авторы: Романова, Н. А.",
                    link: "http://venec.ulstu.ru/lib/disk/2011/Lazarev3.pdf",
                    desc: " Труды Ульяновского научного центра &quot;Ноосферные знания и технологии&quot;. - Ульяновск : УлГТУ, 2011. - Т. 14, вып. 1. - С. 193-197. - Текст :. - электронный.",
                    words: "Ключевые слова: социально-ориентированная экономика, социальные системы, труды научного центра, управление социальными системами, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Системы защиты воздуха на современных предприятиях ",
                    authors: "Авторы: Романов, С. Н., Леушкин, П. Н., Ваганова, Е. С.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/83.pdf",
                    desc: " Актуальные проблемы техносферной безопасности : сборник тезисов научных трудов IV Международной научно-практической конференции студентов, аспирантов, молодых ученых, преподавателей, приуроченной к 45-летнему юбилею кафедры &quot;Промышленная экология и техносферная безопасность&quot; (20-25 мая). - Ульяновск : УлГТУ, 2022. - С. 122-125. - Библиогр: 3 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: адсорбция, воздушные фильтры, загрязнение воздуха, международные научно-практические конференции, методы очистки, предприятия, сборники тезисов научных трудов, системы вентиляции, системы защиты воздуха, тезисы научных трудов, фотокаталитическая очистка воздуха, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Силикон - материал 21 века ",
                    authors: "Авторы: Романов, С. Н., Леушкин, П. Н., Ваганова, Е. С.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/66.pdf",
                    desc: " Технологии материалов : сборник научных трудов III Международной научно-практической конференции студентов, аспирантов, молодых ученых, преподавателей (25 нояб. 2021 г.). - Ульяновск : УлГТУ, 2022. - С. 14-15. - Библиогр.: 3 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: научно-практические конференции, полимеры, сборники научных трудов, силиконы, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Разработка веб-приложения приема заявок нотариальной конторы ",
                    authors: "Авторы: Романов, А. А.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/60.pdf",
                    desc: " Вузовская наука в современных условиях : сборник материалов 56-й научно-технической конференции (24-29 янв.). - Ульяновск : УлГТУ, 2022. - Ч. 2. - С. 73-75. - Библиогр.: 5 назв. - Текст : электронный.",
                    words: "Ключевые слова: веб-приложения, диаграмма сущностей, заявки, комплекс программных средств, материалы конференций, научно-технические конференции, нотариальные конторы, прием заявок, сборники материалов конференций, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Разработка веб-приложения для приема заявок нотариальной конторы ",
                    authors: "Авторы: Романов, А. А.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/60.pdf",
                    desc: " Вузовская наука в современных условиях : сборник материалов 56-й научно-технической конференции (24-29 янв.). - Ульяновск : УлГТУ, 2022. - Ч. 2. - С. 46-49. - Библиогр.: 4 назв. - Текст : электронный.",
                    words: "Ключевые слова: веб-приложения, заявки, материалы конференций, научно-технические конференции, нотариальные конторы, прием заявок, сборники материалов конференций, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Подход к контекстному анализу временных рядов ",
                    authors: "Авторы: Романов, А. А., Филиппов, А. А.",
                    link: "http://apu.npomars.com/images/pdf/63_6.pdf",
                    desc: " Автоматизация процессов управления. - 2021. - № 1 (63). - С. 46-55. - Библиогр.: 21 назв.",
                    words: "Ключевые слова: анализ временных рядов, временные ряды, контекст, контекстный анализ, онтология, проблемная область",
                    scope: 100
                },
                {
                    title: "   Повышение эффективности процесса обеспечения безотказности бортового радиоэлектронного оборудования с использованием информационных технологий  ",
                    authors: "Авторы: Романов, Ю. В., Шишкин, В. В.",
                    link: "http://www.ssc.smr.ru/media/journals/izvestia/2009/2009_3_520_525.pdf",
                    desc: " Известия Самарского научного центра Российской академии наук. - 2009. - Т. 11, № 3 (2). - С. 520-525. - Библиогр.: 6 назв.",
                    words: "Ключевые слова: безотказность оборудования, бортовое оборудование, жизненные циклы, информационные технологии, обеспечение безотказности оборудования",
                    scope: 100
                },
                {
                    title: "   Повторное использование стекла ",
                    authors: "Авторы: Романов, С. Н., Айзатуллин, Т. И., Ваганова, Е. С.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/80.pdf",
                    desc: " Экология и циклическая экономика : сборник научных трудов Международной научно-практической конференции студентов, аспирантов, молодых ученых, преподавателей, приуроченной к VIII Ежегодному молодежному фестивалю в области устойчивого развития ВУЗЭКОФЕСТ (3-5 марта). - Ульяновск : УлГТУ, 2022. - С. 78-81. - Библиогр.: 3 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: международные научно-практические конференции, отходы стекла, переработка стекла, сборники научных трудов, стекло, утилизация стекла, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Оценка производственной деятельности предприятия металлических профилей на воздушную среду ",
                    authors: "Авторы: Романова, В. А., Гусарова, В. С.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/83.pdf",
                    desc: " Актуальные проблемы техносферной безопасности : сборник тезисов научных трудов IV Международной научно-практической конференции студентов, аспирантов, молодых ученых, преподавателей, приуроченной к 45-летнему юбилею кафедры &quot;Промышленная экология и техносферная безопасность&quot; (20-25 мая). - Ульяновск : УлГТУ, 2022. - С. 126-129. - Библиогр: 1 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: атмосферный воздух, выбросы загрязняющих веществ, загрязнение воздуха, международные научно-практические конференции, металлические профили, металлопрофильные предприятия, производство металлических профилей, сборники тезисов научных трудов, тезисы научных трудов, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Корпоративный альтруизм как версия социализации экономики ",
                    authors: "Авторы: Романов, В. Н.",
                    link: "http://venec.ulstu.ru/lib/disk/2011/Lazarev3.pdf",
                    desc: " Труды Ульяновского научного центра &quot;Ноосферные знания и технологии&quot;. - Ульяновск : УлГТУ, 2011. - Т. 14, вып. 1. - С. 186-193. - Текст :. - электронный.",
                    words: "Ключевые слова: корпоративный альтруизм, социализация экономики, труды научного центра, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Исследование методов анализа индикаторов репозиториев программных проектов ",
                    authors: "Авторы: Романов, А. А., Бармина, А. В.",
                    link: "http://lib.ulstu.ru/venec/disk/2022/60.pdf",
                    desc: " Вузовская наука в современных условиях : сборник материалов 56-й научно-технической конференции (24-29 янв.). - Ульяновск : УлГТУ, 2022. - Ч. 2. - С. 100-103. - Библиогр.: 7 назв. - Текст : электронный.",
                    words: "Ключевые слова: материалы конференций, научно-технические конференции, программные проекты, репозитории, сборники материалов конференций, электронные ресурсы",
                    scope: 100
                },
                {
                    title: "   Исследование влияния импульсной лазерной обработки на параметры структуры и механические свойства многослойных покрытий режущего инструмента ",
                    authors: "Авторы: Романов, А. А.",
                    link: "Ссылка отсутствует",
                    desc: " Физические основы высокоскоростной обработки и технологическое обеспечение компьютерных технологий в машиностроении : материалы Международной молодежной научной школы-семинара (12-15 мая). - Ульяновск : УлГТУ, 2011. - С. 161-165. - Книга находится на кафедре. - Библиогр.: 4 назв.",
                    words: "Ключевые слова: износостойкие покрытия, лазерная обработка, механические свойства, многослойные покрытия, научные школы-семинары, режущие инструменты",
                    scope: 100
                },
                {
                    title: "   Доверительный маркетинг в сфере электронной коммерции ",
                    authors: "Авторы: Романов, А. А.",
                    link: "http://venec.ulstu.ru/lib/disk/2021/47.pdf",
                    desc: " Вузовская наука в современных условиях : сборник материалов 55-й научно-технической конференции (25-30 янв.). - Ульяновск : УлГТУ, 2021. - Ч. 3. - С. 179-181. - Библиогр.: 3 назв.",
                    words: "Ключевые слова: доверительный маркетинг, маркетинг, материалы конференций, научно-технические конференции, сборники материалов конференций, электронная коммерция",
                    scope: 100
                },
                {
                    title: "   Государственное управление как ключевое звено в социально-экономическом развитии ",
                    authors: "Авторы: Романов, В. Н.",
                    link: "http://venec.ulstu.ru/lib/disk/2016/16.pdf ",
                    desc: " Власть, бизнес, бизнес-образование: интеграция на пути модернизации : материалы II международной научно-практической конференции (7 апр.). - Ульяновск : УлГТУ, 2011. - С. 300-304. - Библиогр.: 2 назв. - Текст :. - электронный.",
                    words: "Ключевые слова: государственное управление, материалы конференций, научно-практические конференции, социально-экономическое развитие, экономический рост, электронные ресурсы",
                    scope: 100
                }
            ],
            achievements: [],
            ulstu: "VoldemarProger",
            gitHub: "fortimaus",
            elib: "Романов-2020-2023",
            about: 'Студент-программист, знаком с C#, Java, Python',
            login: 'Voldemar',
            scope: 88.5,
            currentArt : -1,
            currentRepo : -1,
            midR: 0,
            midA: 0,
            test:[{test:'test'}]
          };
        },
        computed:{
            styleObj(){
                return {
                    'border': '25px ' + 'outset ' + 'rgb('+ (125 * this.scope / 100) + ',' + (255 * (this.scope) / 100) + ',' + 0 + ')'
                }
            }
        },
        created(){
            this.repos = this.testRepos
            this.articles = this.testArts
        },
        methods: {
            async formGetAll(){
                await this.getAll()
                if(this.midA == 0)
                    this.midA  = this.articles.reduce((a,b) => a.scope + b.scope)/this.articles.length
                if(this.midR == 0)
                    this.midR  = this.repos.reduce((a,b) => (a.scope_for_decor+a.scope_for_code+a.scope_bonus)+(b.scope_for_decor+b.scope_for_code+b.scope_bonus))/this.repos.length
                this.scope = (this.midR + this.midA) / 2
                
            },
            async getAll(){
                await AchievementService.getRepos(this.ulstu,this.gitHub)
                .then(response => {
                    this.repos = response.data;
                    console.log(response.data);
                }).catch(e => {
                    console.log(e)
                    this.repos = this.testRepos
                    this.midR = 77,5
              })
               await AchievementService.getArticles(this.elib)
              .then(response => {
                    this.articles = response.data;                
                    console.log(response.data);
                }).catch(e => {
                    console.log(e)
                    this.articles = this.testArts
                    this.midA = 100
    
              })
    
            },
            showRinfo(id){
                this.$refs.info.show = true;
                    this.$refs.info.title = this.repos[id].title
                    this.$refs.info.link =  this.repos[id].link
                    this.$refs.info.desc =  this.repos[id].description
                    this.$refs.info.extra =  this.repos[id].language
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
            },
            showList(){
                this.$refs.listUs.show = true;
                
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
            height: 20%;
            width: 20%;
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
    