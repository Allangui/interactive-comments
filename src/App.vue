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
      comments: datas.comments,
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
      console.log('reply in app',event)
      this.searchNewId()
      event.obj.id = this.newID
      for(let i =0;i<this.comments.length;i++){
        if(this.comments[i].id === event.replyingtoid){
          console.log('in if loop 1')
          return this.comments[i].replies.push(event.obj)
        }else{
          console.log('in else loop 1')
          for(let j =0;j<this.comments[i].replies.length;j++){
          if(this.comments[i].replies[j].id === event.replyingtoid){
            console.log('in if loop 2')
            return this.comments[i].replies.push(event.obj)
          }else{
            console.log('in else loop 2')
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
        console.log('el 1 = ',element.id,'newid = ',this.newID)
        element.replies.forEach(element2=>{
        if( element2.id >= this.newID){
          this.newID= element2.id +1
        }else{

        }
        console.log('el 2= ',element2.id,'newid = ',this.newID)
        })
      });
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
  mounted () {
    console.log(this.mq);
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


