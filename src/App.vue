<template>
  <Comment v-for="comment in comments"
  :name="comment.user.username"
  :content="comment.content"
  :createdAt="comment.createdAt"
  :userImage="comment.user.image.png"
  :score="comment.score"
  :replies="comment.replies"
  :id="comment.id"
  :key="comment.id"
  :currentUser="currentUser"
  @delete="isOpenPopupDelete=true , currentIdDeleted= $event"
  @sendAddReply="addReply($event)"
  @updateContent="comment.content=$event"
  />
  <AddComment :currentUser="currentUser" @sendAddComment="addComment($event)" />
  <OpenPopupDelete v-if="isOpenPopupDelete" @closePopup="deleteComment($event)"/>
</template>

<script>
import comment from "./components/comment.vue"
import addComment from "./components/addComment.vue"
import openPopupDelete from "./components/openPopupDelete.vue"
import datas from "../data.json"

export default{
  inject:["mq"],
  components:{
    Comment : comment,
    AddComment : addComment,
    OpenPopupDelete : openPopupDelete,
  },
  data() {
    return {
      datas : datas,
      localDatasComments:null,
      comments: null,
      localDatasCurrentUser:null,
      currentUser: datas.currentUser,
      isOpenPopupDelete:false,
      currentIdDeleted:null,
      newID:null,
    }
  },
  methods: {
    addComment(obj){
      this.searchNewId()
      obj.id = this.newID
      this.comments.push(obj)
    },
    addReply(event){
      this.searchNewId()
      event.obj.id = this.newID
      for(let i =0;i<this.comments.length;i++){
        if(this.comments[i].id === event.replyingtoid){
          return this.comments[i].replies.push(event.obj)
        }else{
          for(let j =0;j<this.comments[i].replies.length;j++){
          if(this.comments[i].replies[j].id === event.replyingtoid){
            return this.comments[i].replies.push(event.obj)
          }else{
            null
          }
          }
        }

      }
    },
    searchNewId(){
      this.comments.forEach(element => {
        if(element.id >= this.newID){
          this.newID= element.id +1
        }else{
          null
        }
        element.replies.forEach(element2=>{
        if( element2.id >= this.newID){
          this.newID= element2.id +1
        }else{
          null
        }
        })
      });
    },
    deleteComment(answer) {
      this.isOpenPopupDelete=false
      if(answer===true){
        for(let i=0;i<this.comments.length ;i++){
          if (this.currentIdDeleted===this.comments[i].id) {
            this.comments.splice(i,1)
            this.currentIdDeleted = null
            return
          } else {
            null
          }
          for(let j=0; j< this.comments[i].replies.length;j++){
            if(this.currentIdDeleted===this.comments[i].replies[j].id){
              this.comments[i].replies.splice(j,1)
              this.currentIdDeleted = null
              return
            }else{
                null
            }
          }
        }
        //amyrobson maxblagun ramsesmiron juliusomo
        this.currentIdDeleted = null
      }else{
        this.currentIdDeleted = null
      }
    },
  },
  watch: {
        comments:{
          handler(newValue){
            console.log('newval',newValue)
            localStorage.setItem('comments',JSON.stringify(newValue))
          },
          deep:true
        }
      },
  mounted () {
    if(localStorage.length===0){
      console.log('before',this.datas.comments);
    localStorage.setItem('comments',JSON.stringify(this.datas.comments))
    localStorage.setItem('currentUser',JSON.stringify(this.datas.currentUser))

    }
    // console.log('middle',localStorage.comments);
    this.localDatasComments= localStorage.getItem('comments')
    this.comments= JSON.parse(this.localDatasComments)
    this.localDatasCurrentUser= localStorage.getItem('currentUser')
    this.currentUser= JSON.parse(this.localDatasCurrentUser)
    console.log('after comments',this.comments);
    console.log('after currentuser',this.currentUser);
  },
}
</script>

<style>
#app {
  max-width: 650px;
  width: 90vw;
  margin:50px auto;
  font-size:16px;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
  
}
</style>


