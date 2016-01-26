import Gist from './Gist';
import GistAddForm from './GistAddForm';

var GistBox = React.createClass({
  getInitialState: function() {
    return {
      gists: []
    };
  },

  addGist: function(username) {
    var url = `https://api.github.com/users/${username}/gists`;

    $.get(url, (result) => {
      if(result.length == 0) {
        alert('This username not exists. Please, enter a valid one.');
        return
      }

      var username = result[0].owner.login;
      var url = result[0].html_url;
      var gists = this.state.gists.concat({username, url});

      this.setState({ gists });
    }).fail(() => {
      alert('Please, enter a valid username.');
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

export default GistBox;
