<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/connect">Connect Jira</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
    width: calc(100% - 2em);
    max-width: 1024px;
    box-sizing: border-box;
    margin: 3em auto;
  }

  .showDetail .sidebar,
  .showDetail .main {
    transform: translateX(-100px) scale(0.8);
    transform-origin: top left;
  }

  .showDetail .sidebar {
    transform-origin: top right;
  }

  #nav {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
    margin-left: 1em;
    box-sizing: border-box;
    max-width: 100%;
}

#nav a {
    display: block;
    background-color: #fff;
    padding: .5em;
    color: #000;
    font-weight: bold;
    text-transform: uppercase;
    transition: background .25s, box-shadow .05s;
    border: solid #000 2px;
    box-shadow: 1px 1px 0px #000;
    border-radius: 4px;
    margin-right: 1em;
    font-size: 12px;

    &:hover,
    &.router-link-exact-active {
      text-decoration: none;
      box-shadow: 3px 3px 0px #000;
    }
  }
  h1 {
    font-weight: bold;
    text-transform: uppercase;
  }
  .main {
    flex: 1;
    transition: .25s;
  }
  .sidebar {
    width: calc(30% - 3em);
    margin-right: 2em;
    margin-bottom: 0;
    transition: .25s;
    .panel-body:first-child {
      margin-bottom: 20px;
    }
  }
  .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
  }
  .list-group-item-text {
    margin: 0;
  }
  .user-details {
    border-right: 1px solid #ddd;
    padding-right: 20px;
    margin: 0;
  }
  .time-block {
    padding: 0 10px 10px;
    border-right: 1px solid #ddd;
    width: 200px;
  }
  .comment-section {
    padding: 20px;
    flex: 1;

    input {
      padding-left: .25em;
    }
  }
  .entry-options {
    align-self: flex-start;
  }
  .entries,
  .current-entry {
    background-color: #ffef85;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .entries {
    background-color: #85e9ff;
  }
  .delete-button {
    width: 30px;
    height: 30px;
    padding: .25em;
    font-size: 12px;
    line-height: 1;
    border-radius: 3px;
    border: solid 2px #000;
    background-color: rgb(255, 133, 133);

    path {
      fill: #fff;
    }
  }

  /* bootstrap overrides */
  .panel-default {
    border-color: #333;
    border-radius: 0;
    border-width: 4px;
  }
  .panel-default > .panel-heading {
    border: none;
  }
  .form-control {
    color: #000;
    border: 2px solid #000;
  }
</style>
