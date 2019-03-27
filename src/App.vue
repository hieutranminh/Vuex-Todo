<template>
  <div id="todo">
    <h3>Todos App</h3>
    <!--Notification ADD - EDIT - DELETE-->
    <notifications group="Notify" position="top right"/>
    <!--Input AddTodo-->
    <AddTodo></AddTodo>
    <ul class="item-todo">
      <!--Checkbox Select All & RemoveAll-->
      <selected-all></selected-all>
      <!--NOT todo all - active - done-->
      <li v-if="$store.state.filterCate === 'all' && $store.getters.GETTER_TODO_FILTER.length === 0" class="notTodo">Not todo all !</li>
      <li v-if="$store.state.filterCate === 'active' && $store.getters.GETTER_TODO_FILTER.length === 0" class="notTodo">Not todo active !</li>
      <li v-if="$store.state.filterCate === 'done' && $store.getters.GETTER_TODO_FILTER.length === 0" class="notTodo">Not todo done !</li>
      <!-- For ItemTodo -->
      <div class="scrollbar">
        <ItemTodo
          v-for="(todo) in $store.getters.GETTER_TODO_FILTER"
          v-bind:key="todo.id"
          :todoProps="todo"
        ></ItemTodo>
      </div>
      <!--Checkbox Select All & RemoveAll-->
      <selected-all></selected-all>
    </ul>
    <!-- Filter Category -->
    <FilterCategory></FilterCategory>
  </div>
</template>

<script>
import SelectedAll from './components/SelectedAll.vue'
import ItemTodo from './components/ItemTodo.vue'
import FilterCategory from './components/FilterCategory.vue'
import AddTodo from './components/AddTodo.vue'

// import $ from 'jquery'

export default {
  data () {
    return {
      numberNextPage: null
    }
  },
  components: {
    SelectedAll,
    ItemTodo,
    FilterCategory,
    AddTodo
  },
  mounted () {
    this.$store.dispatch('GET_DATA_TODO')
    this.scrollLoadMore()
  },
  methods: {
    scrollLoadMore () {
      /* JQUERY & JAVASCRIPT SCROLL
      JQUERY SCROLL------------------
      $('.scrollbar').scrollTop() === $('.scrollbar').prop('scrollHeight') - $('.scrollbar').height()
      JAVASCRIPT SCROLL--------------
      Math.ceil(divScrollBar.scrollTop) === divScrollBar.scrollHeight - divScrollBar.offsetHeight
      */
      let elementScrollBar = document.querySelector('.scrollbar')
      elementScrollBar.addEventListener('scroll', function () {
        if (Math.ceil(elementScrollBar.scrollTop) === elementScrollBar.scrollHeight - elementScrollBar.offsetHeight) {
          console.log('Dung JS duoc roi')
        }
      })
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  /*.my-style{*/
    /*background-color: #e8f9f0;*/
    /*border: 2px solid #d0f2e1;*/
  /*}*/
  /*.my-style .vue-notification {*/
  /*}*/
  /*.my-style .notification-title {*/
  /*}*/
  /*.my-style .notification-content {*/
  /*}*/
  .scrollbar {
    overflow-y: scroll;
    height: 200px;
  }
  .footer-todo {
    margin-top: 10px;
  }
  .item-todo .notTodo {
    text-align: center;
    background-color: rgba(10, 185, 255, 0.71);
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    border-radius: 30px;
    margin-top: 15px;
    text-shadow: 1px 1px 1px black;
  }
  .footer-todo p {
    display: inline;
    color: gray;
    font-size: 14px;
  }

  .footer-todo .status.active {
    background: deepskyblue;
    color: #ffffff;
  }

  .footer-todo .status {
    background: rgba(0, 191, 255, 0.2);
    padding: 3px;
    cursor: pointer;
    outline: none;
  }

  #todo .input-text {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  #todo .item-todo ul li {}

  body {
    background: #f5f5f5;
  }

  div#todo {
    width: 500px;
    margin: auto;
    background: white;
    border: 1px solid gainsboro;
    padding: 15px;
  }

  div#todo h3 {
    text-align: center;
    color: deepskyblue;
    font-weight: 400;
    text-transform: uppercase;
    border-bottom: 1px solid;
    padding-bottom: 12px;
  }
  .item-todo li {
    list-style: none;
    margin: 5px 0px;
    padding: 10px 5px;
    font-weight: 100;
    background-color: rgba(0, 191, 255, 0.11);
  }
  .item-todo li.done {
    text-decoration: line-through;
    color: rgba(132, 131, 131, 0.44);
    background-color: whitesmoke;
  }
  .item-todo li .delete {
    float: right;
    background: orange;
    color: black;
    padding: 2px 10px;
    cursor: pointer;
    transition: 0.2s;
    opacity: 0;
    font-size: 12px;
    font-weight: 500;
    border: 2px solid white;
  }
  .item-todo li .edit {
    float: right;
    background: greenyellow;
    color: black;
    padding: 2px 10px;
    cursor: pointer;
    transition: 0.2s;
    opacity: 0;
    font-size: 12px;
    font-weight: 500;
    border: 2px solid white;
  }
  .item-todo li .save {
    background: lightblue;
    color: black;
    padding: 2px;
    cursor: pointer;
  }

  .item-todo li:hover .delete ,.item-todo li:hover .edit {
    opacity: 1;
  }
  .notify.success {
    text-align: center;
    font-size: 14px;
    background-color: #5cb85c;
    color: white;
    padding: 4px;
    display: block;
  }
  .notify.danger {
    text-align: center;
    font-size: 14px;
    background-color: #d9534f;
    color: white;
    padding: 4px;
    display: block;
  }
  .selectAll{
    padding: 5px;
    margin-top: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 4px solid deepskyblue;
    font-size: 12px;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: bold;
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.65);
  }
  .rmselected{
    padding: 3px ;
    border: 1px solid black;
    cursor: pointer;
  }
  .clear{
    clear: both;
  }
</style>
