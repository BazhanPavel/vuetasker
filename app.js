let app = new Vue({
  el: '#wrap',
  data: {
    todos: [],
  },
  methods: {
    addTask: function() {
      this.todos.push({ text: document.getElementById("inp").value });
    }
  },
  created: function() {
    //для передачи контекста axios
    let self = this;
    //если в localStorage нет нужных данных
    if (!localStorage.getItem('raw')) {
      //берем их при помощи get-запроса
      axios.get('https://kodaktor.ru/j/tasklist')
        .then(function(response) {
          response.data.list.forEach(function(it, i, arr) {
            self.todos.push({ text: it });
          });
        })
        .catch(function(error) {
          console.log('error is occurred');
        });
    } else {
      // в другом случае берем данные из localStorage
      JSON.parse(localStorage.getItem('raw')).forEach(function(it, i, arr) {
        self.todos.push({ text: it.text });
      });
    }
  },
  updated: function() {
    //для передачи контекста
    let self = this;
    let tempArr = [];
    console.log(localStorage.getItem('raw'));
    self.todos.forEach(function(it, i, arr) {
      tempArr.push(it);
    });
    localStorage.setItem('raw', JSON.stringify(tempArr));
  }
});
