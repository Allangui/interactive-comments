<template>
    <main :class="isReply ? 'mainReply': null ">
        <div class="topCard">
            <img :src="userImage" alt="">
            <div class="name">{{ name }}</div>
            <span v-if="currentUser.username === name" class="you">you</span>
            <span class="date">{{ date }}</span>
        </div>
        
        <p class="commentary"><span v-if="isReply" class="replyingTo">@{{ replyingTo }} </span> {{ content }}</p>
        <div class="counter">
            <svg class="plus" :class="isPlusActive ? 'plusActive' : null" @click=" isPlusActive ? isPlusActive=false : isPlusActive=true,isMinusActive=false" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" /></svg>
            <span class="score">{{ score + (isPlusActive ? 1 : 0) + (isMinusActive ? -1 : 0)}}</span>
            <svg class="minus" :class="isMinusActive ? 'minusActive' : null" @click=" isMinusActive ? isMinusActive=false : isMinusActive=true,isPlusActive=false" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
        </div>
        <button v-if="currentUser.username !== name" @click="onReply ? onReply=false : onReply=true" type="button" class="reply"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg> Reply</button>
        <span v-else class="editAndDelete">
            <button class="delete" @click="$emit('delete',id)"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>Delete</button>
            <button class="edit"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>Edit</button>
        </span>
    </main>
    <AddComment v-if="onReply" :onReply="onReply" :currentUser="currentUser" :replyingTo="name" />
    <Comment v-for="replie in replies"
        
        :name="replie.user.username"
        :content="replie.content"
        :date="replie.createdAt"
        :userImage="replie.user.image.png"
        :score="replie.score"
        :replyingTo="replie.replyingTo"
        :isReply="true"
        :currentUser="currentUser"
        :id="replie.id"
        :key="replie.id"
        @delete="$emit('delete',$event)"
    />
</template>

<script>
import AddComment from "./addComment.vue"
    export default {
    emits: ["delete"],
    props: ["id", "name", "content", "date", "userImage", "score", "replies", "isReply", "currentUser", "replyingTo"],
    data() {
        return {
            isPlusActive: false,
            isMinusActive: false,
            onReply:false
        };
    },
    components: { AddComment }
}
</script>

<style lang="scss" scoped>

main{
height:auto;
width:calc(100% - 30px);
background-color: white;
margin-bottom:20px;
padding:15px;
display: grid;
grid-template-columns: repeat(6,1fr);
grid-template-rows: repeat(3,auto);
border-radius: 10px;
    .topCard{
        display:flex;
        column-gap: 10px;
        align-items: center;
        grid-column: span 6;
        grid-row: 1;
        img{
            width:40px;
        }
        .name{
            font-weight: 500;
        }
        .you{
            font-weight: 500;
            font-size: .8rem;
            color:white;
            background-color: hsl(238, 40%, 52%) ;
            padding:2px 6px;
            line-height: 1rem;
            border-radius:3px;
            letter-spacing: .5px;
        }
        .date{
            opacity: .7;
            font-size:.9rem;
        }
    }
    .commentary{
        grid-column: span 6;
        grid-row: 2;
        opacity: .7;
        .replyingTo{
            color:hsl(238, 40%, 52%);
            font-weight:700;
        }
    }
    .counter{
        grid-column: 1/2;
        grid-row: 3;
        display: flex;
        align-items: center;
        column-gap: 5px;
        justify-content: space-around;
        width:100px;
        border-radius: 10px;
        font-weight: 500;
        color:hsl(238, 40%, 52%);
        background-color: hsl(228, 33%, 97%);
        .score{

        }
        .plus , .minus{
            cursor: pointer;
            padding:13px;
            fill:#C5C6EF;
        }
        .plusActive, .minusActive{
            fill: hsl(238, 40%, 52%);
        }
    }
    .reply{
        grid-column: 6;
        grid-row: 3;
        display: flex;
        column-gap: 5px;
        color:hsl(238, 40%, 52%);
        font-weight:700;
        align-items:center;
        padding:5px;
        border:none;
        background-color: transparent;
        cursor: pointer;
        &:hover{
            opacity:.5;
        }
    }
    .editAndDelete{
        display:flex;
        grid-column: 4/6;
        grid-row: 3;
        column-gap: 5px;
        .delete, .edit{
            display: flex;
            align-items:center;
            column-gap: 5px;
            padding:5px;
            font-weight:700;
            border:none;
            background-color: transparent;
            cursor: pointer;
            &:hover{
                opacity:.5;
            }
        }
        .delete{
            color:hsl(358, 79%, 66%);
        }
        .edit{
            color:hsl(238, 40%, 52%);
        }
    }
}
.mainReply{
    width:calc(95% - 30px);
    margin-left:5%;
    position: relative;
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
</style>