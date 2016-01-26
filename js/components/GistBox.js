var GistBox = React.createClass({
  getInitialState: function() {
    return {
      gists: []
    };
  },

  addGist: function(username) {
    var self = this
    var url = `https://api.github.com/users/${username}/gists`;

    $.get(url, function(result){
      var username = result[0].owner.login;
      var url = result[0].html_url;
      var gists = self.state.gists.concat({username, url});

      self.setState({ gists });
    });
  },

  render: function() {
    var newGist = function(gist) {
      return <Gist username={ gist.username } url={ gist.url } />
    }

    return (
      <div>
        <h1>GistBox</h1>

        <GistAddForm onAdd={this.addGist} />

        { this.state.gists.map(newGist) }
      </div>
    )
  }
});

React.render(<GistBox />, document.querySelector('#app'));
