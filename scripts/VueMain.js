//accept-Task doeant work, throws an error!(caps T)
Vue.component('accept-task', {
  props : [],
  template : '<div class="newTask">\
              <input type="text" placeholder="Add a new task! and STOP Procrastinating" v-model="value">\
              <button v-on:click="$emit(\'addtask\', value)">&#10010;</button>\
              </div>',
  data : function () {
    return {
      value : '',
    }
  }
})

Vue.component('added-tasks', {
  props : ['taskcontent', 'taskid', 'editing', 'tasknotes'],
  template : '<div class="container">\
              <input type="text" v-bind:value="taskcontent" v-bind:disabled="editing==1" v-on:input="$emit(\'editing\',[taskid, $event.target.value])">\
              <button v-on:click="$emit(\'edit\')" title="EDIT" v-if="editing==1">&#9998;</button>\
              <button v-on:click="$emit(\'edit\')" title="SAVE" v-else>&#9996;</button>\
              <button title="Manage Notes" v-on:click="isactive = !isactive">&#128221;</button>\
              <button v-on:click="$emit(\'taskcomplete\', taskid)">&#10004;</button>\
              <button v-on:click="$emit(\'deletetask\', taskid)">&#10006;</button>\
              <textarea placeholder="Your notes here..." v-show="isactive" v-bind:value="tasknotes" v-on:input="$emit(\'editnotes\',[taskid, $event.target.value])"></textarea>\
              </div>',
  data : function () {
    return {
      isactive : false
    }
  }
})

Vue.component('completed-tasks', {
  props : ['taskcontent', 'taskid', 'editing', 'tasknotes'],
  template : '<div class="container">\
              <input type="text" v-bind:value="taskcontent" v-bind:disabled="editing==1" v-on:input="$emit(\'editing\',[taskid, $event.target.value])">\
              <button v-on:click="$emit(\'edit\')" title="EDIT" v-if="editing==1">&#9998;</button>\
              <button v-on:click="$emit(\'edit\')" title="SAVE" v-else>&#9996;</button>\
              <button title="Manage Notes" v-on:click="isactive = !isactive">&#128221;</button>\
              <button v-on:click="$emit(\'backtodo\', taskid)">&#8624;</button>\
              <button v-on:click="$emit(\'deletetask\', taskid)">&#10006;</button>\
              <textarea placeholder="Your notes here..." v-show="isactive" v-bind:value="tasknotes" v-on:input="$emit(\'editnotes\',[taskid, $event.target.value])"></textarea>\
              </div>',
  data : function () {
    return {
     isactive : false
    }
  }
})
//todo mvc
var root = new Vue({
  el : '#rootInstance',

  data : {
    name : 'ToDo App',
    incompleteTasks : [],
    completedTasks : [],
    key : 0,
    iseditingenabled : 1
  },

  methods : {
    addTaskMethod : function (value) {
      this.incompleteTasks.push({"taskname":value, "tasknotes":'', "key":this.key++, "completed":false})
    },

    moveToCompletedTasks : function (taskid) {
      for( let task of this.incompleteTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === taskid) {
            this.incompleteTasks.splice(this.incompleteTasks.indexOf(task), 1)
            this.completedTasks.push(task)
            console.log(task.taskname, 'task in to be moved')
            break
          }
        }
      }
    },

    moveToIncompleteTasks : function (taskid) {
      for( let task of this.completedTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === taskid) {
            this.completedTasks.splice(this.completedTasks.indexOf(task), 1)
            this.incompleteTasks.push(task)
            break
          }
        }
      }
    },

    removeIncompleteTask : function (taskid) {
      for( let task of this.incompleteTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === taskid) {
            this.incompleteTasks.splice(this.incompleteTasks.indexOf(task), 1)
            break
          }
        }
      }
    },

    removeCompletedTask : function (taskid) {
      for( let task of this.completedTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === taskid) {
            this.completedTasks.splice(this.completedTasks.indexOf(task), 1)
            break
          }
        }
      }
    },

    editTask : function () {
      if(this.iseditingenabled === 1) {
        this.iseditingenabled = 0
      }
      else {
        this.iseditingenabled = 1
      }
    },

    editIttodo : function (thetask) {
      for( let task of this.incompleteTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === thetask[0]) {
            task.taskname = thetask[1]
            break
          }
        }
      }
    },

    editItcompleted : function (thetask) {
      for( let task of this.completedTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === thetask[0]) {
            task.taskname = thetask[1]
            break
          }
        }
      }
    },

    editnotestodo : function (thetask) {
      for( let task of this.incompleteTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === thetask[0]) {
            task.tasknotes = thetask[1]
            break
          }
        }
      }
    },

    editnotescompleted : function (thetask) {
      for( let task of this.completedTasks ) {
        if( task.hasOwnProperty('key')) {
          if( task.key === thetask[0]) {
            task.tasknotes = thetask[1]
            break
          }
        }
      }
    }
    // Try to have a two way binding for value and edit once more
  }
})
