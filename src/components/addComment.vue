<template>
    <form :class="{'formReply': onReply ,'formDek':mq.m}">
        <textarea minlength="3" maxlength="144" required="true" placeholder="Add a comment..."  v-model="content"></textarea>
        <img :src="currentUser.image.png" alt="">
        <button type="submit" class="btnSend" @click.prevent="sendAddComment()">send</button>
    </form>
</template>

<script>
    export default {
        inject:["mq"],
        props: ["currentUser","onReply","replyingTo","replyingToId"],
        emits: ["sendAddComment","sendAddReply"],
        data() {
            return {
                content: '',
                forReplyContent : '',
            }
        },
        mounted () {
            if(this.onReply){
                console.log('mounted')
                this.forReplyContent = '@' + this.replyingTo 
                this.content = this.forReplyContent 
            }else {
                this.content = ''
            }
        },
        methods: {
            sendAddComment() {
                if (this.content.length - this.forReplyContent.length > 2){
                    if(!this.onReply){
                        console.log('sendcomment')
                        this.$emit('sendAddComment',{
                            "id": null, // Trouver un moyen de faire passer l ID au nouveau commentaire
                            "content": this.content,
                            "createdAt": "1 second ago",
                            "score": 0,
                            "user": {
                                    "image": { 
                                    "png": this.currentUser.image.png,
                                    "webp": this.currentUser.image.png,
                                    },
                                "username": "juliusomo"
                            },
                            "replies": []
                        })
                        this.content=''
                }else{
                    this.content = this.content.replace(this.forReplyContent,'')
                    console.log('sendreply')
                    this.$emit('sendAddReply',{
                        "obj":{
                            "id": null,
                            "content":this.content,
                            "createdAt": "1 second ago",
                            "score": 0,
                            "replyingTo":this.replyingTo,
                            "user": {
                                    "image": { 
                                    "png": this.currentUser.image.png,
                                    "webp": this.currentUser.image.png,
                                    },
                                "username": "juliusomo"
                            },
                            "replies": []
                        },
                        "replyingtoid": this.replyingToId
                    })
                }
                }else{
                    alert('Minimum 3 caractères')
                }
                
            },
            getImageUrl(name){
                return new URL(`../assets/${name}.jpg`, import.meta.url).href
            }
        },
    }
</script>

<style lang="scss" scoped>
form{
    height:auto;
    width:calc(100% - 30px);
    background-color: white;
    border-radius: 10px;
    padding:15px;
    display: grid;
    grid-template-columns: repeat(2,auto) ;
    grid-template-rows: repeat(3,auto);
    row-gap: 10px;
    textarea{
        grid-column: span 2;
        grid-row: 1;
        height:60px;
        border-radius: 10px;
        padding:10px;
        border:1px solid hsl(223, 19%, 93%)  ;
        resize:none;
        outline: none;
        &:focus{
        border:1px solid hsl(211, 10%, 45%);
        }
    }
    
    img{
        width:40px;
        grid-column: 1;
        grid-row: 2;
    }
    .btnSend{
        text-transform: uppercase;
        grid-column: 2;
        grid-row: 2;
        justify-self: end;
        width:50%;
        padding:10px 15px;
        border-radius: 7px;
        background-color: hsl(238, 40%, 52%);
        font-weight: 500;
        color:white;
        letter-spacing: 0.6px;
        font-size: .9rem;
        border-width: 0;
        cursor: pointer;
        &:hover{
            opacity:.5;
        }
    }
}
.formReply{
    width:calc(95% - 30px);
    margin-left:5%;
    position: relative;
    margin-bottom: 20px;
    &:before{
        content:'';
        position:absolute;
        top:0px;
        left:-5%;
        width:3px;
        height:calc(100% + 20px);
        background-color: hsl(223, 19%, 93%);
        
    }
    
}
.formDek{
    grid-template-columns:  auto 1fr auto ;
    grid-template-rows: repeat(2,auto);
    column-gap: 15px;
    textarea{
        grid-column: 2;
        grid-row: span 2;
    }
    img{
        grid-column:1 ;
        grid-row: 1;
    }
    .btnSend{
        grid-column:3 ;
        grid-row:1 ;
        width:auto;
    }
}
</style>