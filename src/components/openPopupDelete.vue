<template>
    <main>
        <div class="card">
            <span>Delete comment</span>
            <p>Are you sure you want to delete this comment? This will be remove the comment and can't be undone</p>
            <button type="button" class="no" @click="$emit('closePopup',false)">no, cancel</button>
            <button type="button" class="yes" @click="$emit('closePopup',true)">yes, delete</button>
        </div>
    </main>
</template>

<script>
    export default {
        emits:['closePopup']
    }
</script>

<style lang="scss" scoped>
main{
    z-index:1000;
    background:rgba(0,0,0,.7);
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    .card{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        background: white;
        padding:25px;
        margin:0 auto;
        max-width:calc(350px - 50px);
        border-radius: 10px;
        span{
            font-weight: 500;
            font-size: 1.3rem;
            opacity: .8;
        }
        p{
            font-weight: 400;
            line-height: 1.5rem;
            opacity: .7;
            letter-spacing: .5px;
            margin:20px 0;
        }
        .no,.yes{
            font-weight: 700;
            font-size: 1.1rem;
            letter-spacing: .6px;
            text-transform: uppercase;
            padding: 15px 13px;
            border-radius: 10px;
            color:white;
            border: none;
            cursor: pointer;
        }
        .no{
            float: left;
            background-color:hsl(211, 10%, 45%) ;
        }
        .yes{
            float: right;
            background-color:hsl(358, 79%, 66%) ;
        }
    }
}
</style>