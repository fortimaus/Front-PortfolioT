<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="container">
            <table style="margin-top: -0.1px;">
                
                <tbody>
                 <tr v-for="user in users" :key="user.login" @click="PublicAction">
                   <td class="tdImg"><img alt="Vue logo" class="rounded-circle" v-bind:src="user.href"></td>
                   <td><h1>{{user.login}}</h1></td>
                   <td><h2>{{user.scope}}</h2></td>
                 </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalUpdate",
        data: function () {
            return {
                show: false,
                users:[
                    {
                        login: "umenko",
                        scope: 70,
                        href: "https://steamuserimages-a.akamaihd.net/ugc/1850441034546533898/E0288B8E3C65CF168B615971D2372B0C9B94099E/"
                    },
                    {
                        login: "user1",
                        scope: 50,
                        href:  "https://sun6-20.userapi.com/s/v1/ig2/PUoNVnd2mWhasGL3cax3hV6VRqckhzsG13M7zi0aHO9VqGVNRBQ3aOmauRrsSRut0snIZQIp70cW5KoWm3n5azC0.jpg?size=2155x2155&quality=96&crop=6,2,2155,2155&ava=1"
                    },
                    
                    {
                        login: "user3",
                        scope: 65,
                        href:  "https://sun6-20.userapi.com/s/v1/ig2/PUoNVnd2mWhasGL3cax3hV6VRqckhzsG13M7zi0aHO9VqGVNRBQ3aOmauRrsSRut0snIZQIp70cW5KoWm3n5azC0.jpg?size=2155x2155&quality=96&crop=6,2,2155,2155&ava=1"
                    }
                ]
                
            }
        },
        methods: {
            closeModal() {
                this.show = false
            },
            PublicAction(){
                this.$router.push({ name: 'public' })
    }
        }
    }
</script>
 
<style scoped >
    table{
        width: 80%;
    }
    .tgImg
    {
        display: flex;
        justify-content: left;
    }
    tr {
        width: 80%;
        margin-bottom: 10px;
        border-radius: 12px;
        border-spacing: 0 10px;
        border: 3px solid rgb(211, 211, 211);
    }
    .modal-shadow {
        position:fixed;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        padding: 50px ;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .container {
        position: absolute;
        min-width: 100px;
        min-height: 40%;
        height: fit-content;
        top: 50%;
        left: 50%;
        padding: 1%;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -55%);
        background-color: #fff;
        border-radius: 12px;
        border: 12px solid rgb(141, 253, 255);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
 
    }
    .modal-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
    .modal-title {
        color: #0971c7;
    }

    .modal-content {
        margin-bottom: 20px
        }
    .rounded-circle{
        height: 100px;
        width: 100px;
    }
    .protfolio{
        background-color: #34345238;
        padding-top: 8%;
        padding-bottom: 15%;
        /* padding:15% */
    }

</style>