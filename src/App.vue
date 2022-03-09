<template>
  <Comment v-for="comment in comments"
  
  :name="comment.user.username"
  :content="comment.content"
  :date="comment.createdAt"
  :userImage="comment.user.image.png"
  :score="comment.score"
  :replies="comment.replies"
  :id="comment.id"
  :key="comment.id"
  :currentUser="currentUser"
  @delete="isOpenPopupDelete=true , currentIdDeleted= $event"
  />
  <AddComment :currentUser="currentUser" @sendAddComment="addComment($event)"/>
  <OpenPopupDelete v-if="isOpenPopupDelete" @closePopup="deleteComment($event)"/>
</template>

<script>
import comment from "./components/comment.vue"
import addComment from "./components/addComment.vue"
import openPopupDelete from "./components/openPopupDelete.vue"
import datas from "../data.json"

export default{
  components:{
    Comment : comment,
    AddComment : addComment,
    OpenPopupDelete : openPopupDelete,
  },
  data() {
    return {
      comments: datas.comments,
      currentUser: datas.currentUser,
      isOpenPopupDelete:false,
      currentIdDeleted:null,
    }
  },
  methods: {
    addComment(obj){
      this.comments.push(obj)
    },
    deleteComment(answer) {
      this.isOpenPopupDelete=false
      if(answer===true){
        for(let i=0;i<this.comments.length ;i++){
          if (this.currentIdDeleted===this.comments[i].id) {
            console.log('result 1 : ', this.comments[i].id,'i=',i)
            this.comments.splice(i,1)
            this.currentIdDeleted = null
            return
          } else {
            console.log('result else 1 : ', this.comments[i].id,'i=',i)
            null
          }
          for(let j=0; j< this.comments[i].replies.length;j++){
            if(this.currentIdDeleted===this.comments[i].replies[j].id){
              console.log('result 2 ', this.comments[i].replies[j].id ,'i/j=',i,j)
              this.comments[i].replies.splice(j,1)
              this.currentIdDeleted = null
              return
            }else{
              console.log('result else 2 ', this.comments[i].replies[j].id,'i/j=',i,j)
                null
            }
          }
        }
        //amyrobson maxblagun ramsesmiron juliusomo
        this.currentIdDeleted = null
      }else{
        this.currentIdDeleted = null
      }
      
    }
  },

}
</script>

<style>
#app {
  max-width: 350px;
  margin:50px auto;
  font-size:16px;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
  
}
</style>


