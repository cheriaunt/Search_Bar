const REPO_PER_PAGE = 5
const URL = 'https://api.github.com/';

export class Search {
  constructor(view) {
      this.view = view;
      this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepos.bind(this), 500));
  }

  async searchRepos() {
      this.view.clearRepoSuggest()
      const searchValue = this.view.searchInput.value
      if (searchValue) {
          return await fetch(`${URL}search/repositories?q=${searchValue}&per_page=${REPO_PER_PAGE}`)
              .then(res => {
                  if (res.ok) {
                      res.json().then(res => {
                          res.items.forEach(repo => this.view.createRepoSuggest(repo))
                      })
                  } else {
                      console.log('ERROR nado obrabotat')
                  }
              })
      } else {
          this.view.clearRepoSuggest()
      }
  }

  debounce(func, wait, immediate) {
      let timeout;
      return function () {
          const context = this, args = arguments;
          const later = function () {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  }

}