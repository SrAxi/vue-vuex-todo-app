<template>
    <div class="container">
        <div class="row">
            <div class="col-12 py-5">
                <h1>{{ listName }}</h1>
            </div>
        </div>
        <div class="row mb-3">
            <create-todo @on-new-todo="addTodo($event)" />
        </div>
        <div class="row">
            <div class="col-12 col-sm-10 col-lg-6">
                <ul class="list-group">
                    <todo
                        v-for="(todo, index) in todos"
                        :key="index"
                        :description="todo.description"
                        :completed="todo.completed"
                        @on-toggle="toggleTodo(todo)"
                        @on-delete="deleteTodo(todo)"
                        @on-edit="editTodo(todo, $event)"
                    />
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Todo from './Todo.vue'
    import CreateTodo from './CreateTodo.vue'
    import { mapActions, mapState } from 'vuex'
    import { todos } from '@/store/selectors'
    import { A_ADD_TODO, A_DELETE_TODO, A_EDIT_TODO, A_UPDATE_TODOS } from '@/store/types'

    export default {
        components: { Todo, CreateTodo },
        props: {
            listName: String
        },
        computed: {
            ...mapState({
                todos,
            }),
        },
        mounted() {
            // Initialize to-do list with some data
            this.dispatchUpdateTodos([
                { description: 'Learn Vue', completed: false },
                { description: 'Install Vuex', completed: false },
                { description: 'Dispatch Actions', completed: false }
            ])
        },
        methods: {
            ...mapActions({
                dispatchUpdateTodos: A_UPDATE_TODOS,
                dispatchAddTodo: A_ADD_TODO,
                dispatchEditTodo: A_EDIT_TODO,
                dispatchDeleteTodo: A_DELETE_TODO,
            }),
            addTodo(newTodo) {
                this.dispatchAddTodo({ description: newTodo, completed: false })
            },
            toggleTodo(todo) {
                todo.completed = !todo.completed
                this.dispatchEditTodo(todo)
            },
            deleteTodo(deletedTodo) {
                this.dispatchDeleteTodo(deletedTodo)
            },
            editTodo(todo, newTodoDescription) {
                todo.description = newTodoDescription
                this.dispatchEditTodo(todo)
            },
        },
    }
</script>

<style scoped lang="scss"></style>
